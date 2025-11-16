import { getUser } from "@/actions/getUser";
import { prisma } from "./prisma";

export const checkSubscription = async () => {
  try {
    const today = new Date(Date.now());
    const session = await getUser();
    if (!session) {
      return;
    }

    const subscription = await prisma.subscription.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (subscription && subscription.subscription_end >= today) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};
