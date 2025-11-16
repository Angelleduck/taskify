"use server";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { cache } from "react";

const getUser = cache(async () => {
  const session = auth.api.getSession({
    headers: await headers(),
  });

  return session;
});

export { getUser };
