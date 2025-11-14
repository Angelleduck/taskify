"use client";

import { ButtonPayment } from "@/components/payement";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProdModal } from "@/hooks/useProModal";

export default function ProModal() {
  const { isOpen, onClose } = useProdModal();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 rounded-lg overflow-hidden">
        <DialogTitle className="hidden">Are you absolutely sure?</DialogTitle>
        <div className="flex flex-col">
          <div>
            <img src="/hero.svg" alt="hero" />
          </div>
          <div className="mx-auto w-[292px] my-6 space-y-4">
            <h2 className="font-semibold text-xl">
              Upgrade to Taskify Pro Today!
            </h2>
            <p className="text-xs font-semibold text-neutral-700">
              Explore the best of Taskify.
            </p>

            <ul className="text-sm list-disc text-neutral-700">
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>

            <ButtonPayment />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
