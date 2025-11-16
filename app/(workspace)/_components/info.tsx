import { CreditCard } from "lucide-react";

interface InfoProps {
  title: string;
  isPro?: boolean;
}
export function Info({ title, isPro }: InfoProps) {
  return (
    <div className="py-3 border-b">
      <p className="font-semibold text-xl">{title}</p>
      <div className="flex items-center gap-1 text-neutral-600">
        <CreditCard size={12} />
        <span className="text-xs">{isPro ? "Pro" : "Free"}</span>
      </div>
    </div>
  );
}
