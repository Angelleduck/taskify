import { copyCard } from "@/actions/card/copy-card";
import { deleteCard } from "@/actions/card/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ActionProps {
  cardId: string;
  onClose: () => void;
}

export function Action({ cardId, onClose }: ActionProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await deleteCard(cardId);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.success);
      router.refresh();
      onClose();
    }
  };
  const handleCopy = async () => {
    const res = await copyCard(cardId);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.success);
      router.refresh();
      onClose();
    }
  };
  return (
    <>
      <p className="text-xs font-semibold">Actions</p>
      <Button
        onClick={handleCopy}
        className="bg-neutral-200 hover:bg-neutral-300 text-black h-8 px-2 w-full justify-start font-medium"
      >
        <Copy className="h-4 w-4" />
        Copy
      </Button>
      <Button
        onClick={handleDelete}
        variant="destructive"
        className="h-8 px-2 w-full justify-start font-medium"
      >
        <Trash className="h-4 w-4" />
        Delete
      </Button>
    </>
  );
}

Action.Skeleton = function ActionSkeleton() {
  return <Skeleton className="h-[107px] w-[167px]" />;
};
