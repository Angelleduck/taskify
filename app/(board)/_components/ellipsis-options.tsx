import { copyList } from "@/actions/list/copy-list";
import { deleteList } from "@/actions/list/delete-list";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

interface EllipsisPopoverProps {
  id: string;
  handleEdit: () => void;
}
export function EllipsisOptions({ id, handleEdit }: EllipsisPopoverProps) {
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);

  function handleAddCard() {
    setTimeout(() => {
      handleEdit();
    }, 0);
  }
  async function handleDelete() {
    closeRef.current?.click();
    const res = await deleteList(id);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.success);
      router.refresh();
    }
  }
  async function handleCopy(id: string) {
    const res = await copyList(id);
    if (res.error) {
      toast.error(res.error);
    } else {
      router.refresh();
      toast.success(res.success);
    }
    closeRef.current?.click();
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button">
          <Ellipsis className="cursor-pointer" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 py-3 px-0">
        <div>
          <p className="text-sm font-medium text-center text-neutral-600">
            List actions
          </p>

          <PopoverClose asChild>
            <Button
              ref={closeRef}
              variant="ghost"
              className="w-8 h-8 absolute right-2 top-2 text-neutral-600"
            >
              <X size={16} />
            </Button>
          </PopoverClose>
        </div>
        <div>
          <Button
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            onClick={handleAddCard}
          >
            Add card...
          </Button>
          <Button
            onClick={() => handleCopy(id)}
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy list...
          </Button>
          <hr />
          <Button
            onClick={handleDelete}
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete this list...
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
