import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UserButton } from "./user-button";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between py-[10px] px-3 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <Logo />
        <Button>
          <Plus />
          Create
        </Button>
      </div>
      <UserButton />
    </header>
  );
}
