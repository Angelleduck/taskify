"use client";

import { Suspense } from "react";
import ClientPage from "./client-page";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  return (
    <Suspense fallback={<>...</>}>
      <ClientPage searchParams={searchParams} />
    </Suspense>
  );
}
