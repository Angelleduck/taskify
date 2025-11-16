import { getUser } from "@/actions/getUser";
import { prisma } from "./prisma";
import { MAX_FREE_BOARD } from "@/constants/board-count";

export const increaseCountBoard = async () => {
  try {
    const session = await getUser();
    if (!session) {
      return;
    }

    const data = await prisma.limit.findUnique({
      where: {
        userId: session.user.id,
      },
    });
    if (data) {
      await prisma.limit.update({
        where: {
          userId: session.user.id,
        },
        data: {
          count: data.count + 1,
        },
      });
    } else {
      await prisma.limit.create({
        data: {
          userId: session.user.id,
          count: 1,
        },
      });
    }
  } catch {}
};

export const decreaseCountBoard = async () => {
  try {
    const session = await getUser();
    if (!session) {
      return;
    }

    const data = await prisma.limit.findUnique({
      where: {
        userId: session.user.id,
      },
    });
    if (data) {
      await prisma.limit.update({
        where: {
          userId: session.user.id,
        },
        data: {
          count: data.count > 0 ? data.count - 1 : 0,
        },
      });
    } else {
      await prisma.limit.create({
        data: {
          userId: session.user.id,
          count: 0,
        },
      });
    }
  } catch {}
};
export const canCreateBoard = async () => {
  try {
    const session = await getUser();
    if (!session) {
      return false;
    }
    const data = await prisma.limit.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!data || data.count < MAX_FREE_BOARD) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

export const getCountBoard = async () => {
  const session = await getUser();
  if (!session) {
    return;
  }

  const data = await prisma.limit.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (data) {
    return MAX_FREE_BOARD - data.count;
  } else {
    return MAX_FREE_BOARD - 0;
  }
};
