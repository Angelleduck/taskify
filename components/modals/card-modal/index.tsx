"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Description } from "./description";
import { Activity } from "./activity";
import { Header } from "./header";
import { Action } from "./action";
import { useCardModal } from "@/hooks/useCardModal";
import useSWR from "swr";
import { useEffect } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CardModal() {
  const { isOpen, onClose, id } = useCardModal();

  const { data: cardData, mutate: mutateCard } = useSWR(
    id ? `/api/cards/${id}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  const { data: logsData, mutate: mutateLogs } = useSWR(
    id ? `/api/logs/${id}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  // Revalidate whenever the dialog opens
  useEffect(() => {
    if (isOpen && id) {
      mutateCard();
    }
  }, [isOpen, id, mutateCard]);

  const revalidateOnSubmit = () => {
    mutateCard();
    mutateLogs();
  };

  if (!id) return;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="hidden">Modal</DialogTitle>
      <DialogContent className="sm:max-w-3xl">
        <div className="grid md:grid-cols-4 grid-cols-3 auto-rows-auto gap-4">
          <div className="col-span-full mb-4">
            {cardData ? (
              <Header
                cardTitle={cardData.name}
                cardId={id}
                listTitle={cardData.list?.name}
              />
            ) : (
              <Header.Skeleton />
            )}
          </div>
          <div className="col-start-1 col-end-4">
            {cardData ? (
              <Description
                text={cardData.description}
                cardId={id}
                mutate={revalidateOnSubmit}
              />
            ) : (
              <Description.Skeleton />
            )}
          </div>
          <div className="col-start-1 col-end-4">
            {logsData ? <Activity logs={logsData} /> : <Activity.Skeleton />}
          </div>
          <div className="col-start-4 col-end-5 row-start-2 row-end-3 space-y-2 mt-2">
            {cardData ? (
              <Action cardId={id} onClose={onClose} />
            ) : (
              <Action.Skeleton />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
