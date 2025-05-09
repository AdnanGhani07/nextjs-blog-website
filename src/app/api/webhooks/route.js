import { clerkClient } from "@clerk/clerk-sdk-node";
// import { Webhook } from "@clerk/clerk-sdk-node"; 
import { deleteUser } from "@/lib/actions/user";
import { createOrUpdateUser } from "@/lib/actions/user";
import { verifyWebhookSignature } from "@clerk/clerk-sdk-node"; // Correct method to verify webhook

export async function POST(req) {
  const signature = req.headers.get("clerk-signature");
  const body = await req.text();

  try {
    // Verify webhook signature
    const isValid = verifyWebhookSignature({
      body,
      signature,
      secret: process.env.CLERK_WEBHOOK_SECRET, // Ensure the secret is correct
    });

    if (!isValid) {
      return new Response("Invalid signature", { status: 400 });
    }

    // Parse the JSON body
    const event = JSON.parse(body);

    // Handle the event (for example, user created or updated)
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
        return new Response("Error occured", { status: 400 });
      }
    }

    if(type === "user.deleted"){
      const {id} = event?.data;
      try{
        await deleteUser(id);
      }catch(error){
        console.log("Error deleting user", error);
        return new Response("Error occured", { status: 400 });
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
