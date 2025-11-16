// app/page.js
import { checkSubscription } from "@/lib/subscription";
import { PageClient } from "./client";

export default async function Page() {
  const isPro = await checkSubscription(); // server-side call
  return <PageClient isPro={isPro} />;
}
