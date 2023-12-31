import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET_KEY = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET_KEY) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET_KEY);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;
  const sanitizedId = payload.data.id.replace(/-/g, "_");
  if (eventType === "user.created") {
    await db.user.create({
      data: {
        externalUserId: sanitizedId,
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      },
    });
  }
  if (eventType === "user.updated") {
    const currentUser = await db.user.findUnique({
      where: {
        externalUserId: sanitizedId,
      },
    });
    if (!currentUser) {
      return new Response("User not found.", { status: 400 });
    }
    await db.user.update({
      where: { externalUserId: sanitizedId },
      data: {
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      },
    });
  }
  if (eventType === "user.deleted") {
    await db.user.delete({
      where: {
        externalUserId: sanitizedId,
      },
    });
  }
  return new Response("", { status: 200 });
}
