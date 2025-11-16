"use client";

import { Button } from "@/components/ui/button";
import { useProdModal } from "@/hooks/useProModal";

export function PageClient({ isPro }: { isPro?: boolean }) {
  const { onOpen } = useProdModal();
  return (
    <>
      {isPro ? (
        <p>You already have an active plan !</p>
      ) : (
        <Button onClick={onOpen}>upgrade</Button>
      )}
    </>
  );
}
