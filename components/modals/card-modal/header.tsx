import { updateTitle } from "@/actions/card/common";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Layout } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FocusEvent } from "react";
import { toast } from "sonner";

interface HeaderProps {
  cardId: string;
  cardTitle: string;
  listTitle: string;
}

export function Header({ cardTitle, cardId, listTitle }: HeaderProps) {
  const router = useRouter();
  const handleUpdateTitle = async (
    e: FocusEvent<HTMLInputElement, Element>
  ) => {
    const newTitle = e.currentTarget.value;
    if (newTitle === cardTitle) {
      return;
    } else if (newTitle.length < 3 || newTitle.length > 14) {
      toast.error("title too short or long");
    } else {
      const res = await updateTitle({ newTitle, cardId });
      if (res?.error) {
        toast.error(res.error);
      } else {
        router.refresh();
      }
    }
  };
  return (
    <div className="flex gap-1">
      <Layout className="h-5 w-5 mt-1 text-neutral-700" />
      <div className="flex flex-col w-[80%]">
        <Input
          onBlur={handleUpdateTitle}
          defaultValue={cardTitle}
          className="h-7 shadow-none px-1 text-lg font-semibold text-neutral-700 border-white focus:border-input"
        />
        <p className="text-sm text-muted-foreground ml-1">
          In the list {listTitle}
        </p>
      </div>
    </div>
  );
}

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex gap-1">
      <Layout className="h-5 w-5 mt-1 text-neutral-700" />
      <div className="flex flex-col w-[80%]">
        <Skeleton className="h-7 px-1" />
        <p className="text-sm text-muted-foreground ml-1">In the list cards</p>
      </div>
    </div>
  );
};
