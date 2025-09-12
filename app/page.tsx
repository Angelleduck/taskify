import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import { Inter, Poppins } from "next/font/google";
import localFont from "next/font/local";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const customFont = localFont({
  src: "../public/fonts/font.woff2",
});
export default function Home() {
  return (
    <div className={`h-screen flex flex-col ${inter.className} bg-slate-100`}>
      <header className="flex items-center justify-between py-[10px] px-3 bg-white shadow-sm">
        <Logo />
        <nav className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/register">Get Taskify for free</Link>
          </Button>
        </nav>
      </header>
      <main className="pt-24 flex-1">
        <div
          className={`flex flex-col justify-center items-center ${customFont.className}`}
        >
          <div
            className={`flex items-center gap-2 bg-amber-100 p-4 text-amber-700 rounded-full w-max shadow-sm mb-4`}
          >
            <Medal />
            <span>No. 1 TASK MANAGEMENT</span>
          </div>
          <div className="text-6xl text-neutral-800 mb-6">
            Taskify helps team move
          </div>
          <div className="text-6xl text-white px-4 py-3 rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 mb-4">
            work forward.
          </div>
          <p
            className={`text-neutral-400 text-xl max-w-[55ch] text-center mb-6 ${poppins.className}`}
          >
            Collaborate, manage projects, and reach new productivity peaks. From
            high rises to the home offices, the way your team works is unique —
            accomplish it all with Taskify.
          </p>
          <Button
            size="lg"
            className={`py-[22px] font-semibold ${inter.className}`}
            asChild
          >
            <Link href="/auth/register">Get Taskify for free</Link>
          </Button>
        </div>
      </main>
      <footer className="flex items-center justify-between p-4 border-t">
        <Logo />
        <div>
          <Button variant="ghost">Privacy Policy</Button>
          <Button variant="ghost">Terms of Service</Button>
        </div>
      </footer>
    </div>
  );
}
