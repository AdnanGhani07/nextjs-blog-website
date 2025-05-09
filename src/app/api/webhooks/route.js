import { clerkClient } from "@clerk/clerk-sdk-node";
// import { Webhook } from "@clerk/clerk-sdk-node"; 
import { deleteUser } from "@/lib/actions/user";
import { createOrUpdateUser } from "@/lib/actions/user";
import { verifyWebhookSignature } from '@clerk/express';

export default async function handler(req, res) {
  const signature = req.headers['clerk-signature'];
  const body = JSON.parse(JSON.stringify(req.body)); // Ensure the body is in the correct format

  try {
    // Verifying the webhook signature
    const isValid = verifyWebhookSignature({
      body,
      signature,
      secret: process.env.CLERK_WEBHOOK_SECRET,
    });

    if (!isValid) {
      return res.status(400).send('Invalid signature');
    }

    // Process the event
    const event = body;
    const { id, type } = event.data;
    console.log(
      `Received webhook with ID ${id} and event type of ${type}`
    );
    console.log("Webhook payload:", event.data);

    if (type === "user.created" || type === "user.updated") {
      const emailList = event?.data?.email_addresses?.map(e => e.email_address);
      const { id, first_name, last_name, username, image_url } =
        event?.data;

      try {
        const user = await createOrUpdateUser(
          id,
          first_name,
          last_name,
          image_url,
          emailList,
          username
        );

        if (user && type === "user.created") {
          try {
            await clerkClient.users.updateUserMetadata(id, {
              publicMetadata: {
                userMongoId: user._id,
                isAdmin: user.isAdmin,
              },
            });
          } catch (error) {
            console.log("Error updating user metadata", error);
          }
        }
      } catch (error) {
        console.log("Error creating or updating user", error);
        return res.status(400).send('Error creating or updating user');
      }
    }

    if(type === "user.deleted"){
      const {id} = event?.data;
      try{
        await deleteUser(id);
      }catch(error){
        console.log("Error deleting user", error);
        return res.status(400).send('Error deleting user');
      }
    }

    return res.status(200).send('Webhook received');
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return res.status(400).send('Error verifying webhook');
  }
}
