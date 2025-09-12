import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

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
      <nav className="flex gap-2">
        <Button variant="outline" asChild>
          <Link href="/auth/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/auth/register">Get Taskify for free</Link>
        </Button>
      </nav>
    </header>
  );
}
