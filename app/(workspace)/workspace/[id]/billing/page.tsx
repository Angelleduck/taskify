"use client";

import { Button } from "@/components/ui/button";
import { useProdModal } from "@/hooks/useProModal";

export default function Page() {
  const { onOpen } = useProdModal();
  return <Button onClick={onOpen}>upgrade</Button>;
}
