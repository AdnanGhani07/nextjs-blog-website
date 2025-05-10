// import { clerkClient } from "@clerk/clerk-sdk-node";
// import { Webhook } from "@clerk/clerk-sdk-node"; 
// import { deleteUser } from "@/lib/actions/user";
// import { createOrUpdateUser } from "@/lib/actions/user";
// import { verifyWebhookSignature } from '@clerk/express';

// export default async function handler(req, res) {
//   const signature = req.headers['clerk-signature'];
//   const body = JSON.parse(JSON.stringify(req.body)); // Ensure the body is in the correct format

//   try {
//     // Verifying the webhook signature
//     const isValid = verifyWebhookSignature({
//       body,
//       signature,
//       secret: process.env.CLERK_WEBHOOK_SECRET,
//     });

//     if (!isValid) {
//       return res.status(400).send('Invalid signature');
//     }

//     // Process the event
//     const event = body;
//     const plainEvent = JSON.parse(JSON.stringify(event));
//     const { id, type } = plainEvent.data;
//     console.log(
//       `Received webhook with ID ${id} and event type of ${type}`
//     );
//     console.log("Webhook payload:", plainEvent.data);

//     if (type === "user.created" || type === "user.updated") {
//       const emailList = plainEvent?.data?.email_addresses?.map(e => e.email_address);
//       const { id, first_name, last_name, username, image_url } =
//         plainEvent?.data;

//       try {
//         const user = await createOrUpdateUser(
//           id,
//           first_name,
//           last_name,
//           image_url,
//           emailList,
//           username
//         );

//         if (user && type === "user.created") {
//           try {
//             const userData = {
//               userMongoId: user._id,
//               isAdmin: user.isAdmin,
//             };
            
//             // Ensure it's a plain object
//             const plainUserData = JSON.parse(JSON.stringify(userData));
              
//             await clerkClient.users.updateUserMetadata(id, {
//               publicMetadata: plainUserData,
//             });
//           } catch (error) {
//             console.log("Error updating user metadata", error);
//           }
//         }
//       } catch (error) {
//         console.log("Error creating or updating user", error);
//         return res.status(400).send('Error creating or updating user');
//       }
//     }

//     if(type === "user.deleted"){
//       const {id} = plainEvent?.data;
//       try{
//         await deleteUser(id);
//       }catch(error){
//         console.log("Error deleting user", error);
//         return res.status(400).send('Error deleting user');
//       }
//     }

//     return res.status(200).send('Webhook received');
//   } catch (err) {
//     console.error("Error verifying webhook:", err);
//     return res.status(400).send('Error verifying webhook');
//   }
// }

import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { createOrUpdateUser, deleteUser } from '@/lib/actions/user';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(req) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    );
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt?.data;
  const eventType = evt?.type;
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log('Webhook body:', body);

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const emailList = evt?.data?.email_addresses?.map(e => e.email_address);
    const { id, first_name, last_name, image_url, username } =
      evt?.data;
    try {
      const user = await createOrUpdateUser(
        id,
        first_name,
        last_name,
        image_url,
        emailList,
        username
      );
      if (user && eventType === 'user.created') {
        console.log('Attempting to update Clerk public metadata...');
        try {
          const metadataPayload = {
            userMongoId: user._id.toString?.() ?? String(user._id),
            isAdmin: user.isAdmin,
          };
      
          console.log('Sending metadata to Clerk:', metadataPayload);
      
          const result = await clerkClient.users.updateUserMetadata(id, {
            publicMetadata: metadataPayload,
          });
      
          console.log('Clerk update response:', result);
        } catch (error) {
          console.error('Failed to update Clerk metadata:', error);
          return new Response('Metadata update failed', { status: 500 });
        }
      }
    } catch (error) {
      console.log('Error creating or updating user:', error);
      return new Response('Error occured', {
        status: 400,
      });
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt?.data;
    try {
      await deleteUser(id);
    } catch (error) {
      console.log('Error deleting user:', error);
      return new Response('Error occured', {
        status: 400,
      });
    }
  }

  return new Response('', { status: 200 });
}
