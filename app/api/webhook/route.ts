import { prisma } from "@/lib/prisma";
import { Environment, EventName } from "@paddle/paddle-node-sdk";
import { Paddle } from "@paddle/paddle-node-sdk";
import { NextResponse } from "next/server";

const paddle = new Paddle(process.env.PADDLE_SECRET_TOKEN!, {
  environment: Environment.sandbox,
});

export async function POST(req: Request) {
  const signature = (req.headers.get("paddle-signature") as string) || "";
  // req.body should be of type `buffer`, convert to string before passing it to `unmarshal`.
  // If express returned a JSON, remove any other middleware that might have processed raw request to object
  const rawRequestBody = (await req.text()) || "";
  // Replace `WEBHOOK_SECRET_KEY` with the secret key in notifications from vendor dashboard
  const secretKey = process.env.WEBHOOK_SECRET_KEY || "";

  try {
    if (signature && rawRequestBody) {
      // The `unmarshal` function will validate the integrity of the webhook and return an entity
      const eventData = await paddle.webhooks.unmarshal(
        rawRequestBody,
        secretKey,
        signature
      );

      // database operation, and provision the user with stuff purchased
      switch (eventData.eventType) {
        case EventName.SubscriptionActivated: {
          const userId = eventData.data.customData?.userId;

          if (!userId) {
            console.error("No userId found in webhook data");
            return NextResponse.json(
              { error: "Missing userId" },
              { status: 400 }
            );
          }
          await prisma.subscription.create({
            data: {
              userId: userId,
              subscription_end: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
            },
          });
          console.log(`Subscription ${eventData.data.id} was activated`);
          break;
        }
        default:
          console.log(eventData.eventType);
      }
    }
  } catch (error) {
    console.log(error);
    // Handle signature mismatch or other runtime errors
  }

  // Return a response to acknowledge
  return NextResponse.json({ ok: true });
}
