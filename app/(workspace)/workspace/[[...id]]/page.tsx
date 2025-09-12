import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Activity,
  CreditCard,
  Layout,
  Plus,
  Settings,
  UserRound,
} from "lucide-react";

export default async function Page() {
  return (
    <main className=" max-w-screen-xl mx-auto px-4 mt-10">
      <div className="flex gap-6">
        <div className="w-64">
          <div className="flex items-center justify-between ml-4 text-xs font-medium">
            <h3>Workspaces</h3>
            <Button className="p-2" variant="ghost">
              <Plus />
            </Button>
          </div>
          <div>
            <Accordion
              type="single"
              collapsible
              className="w-full space-y-2"
              defaultValue="item-1"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="bg-sky-500/10 text-sky-700 rounded-md p-[10px]">
                  Foo Inc
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 text-balance pt-2">
                  <div className="flex items-center gap-2 bg-neutral-200 rounded-md p-2 pl-10">
                    <Layout size={16} />
                    Board
                  </div>
                  <div className="flex items-center gap-2 bg-neutral-200 rounded-md p-2 pl-10">
                    <Activity size={16} />
                    Activity
                  </div>
                  <div className="flex items-center gap-2 bg-neutral-200 rounded-md p-2 pl-10">
                    <Settings size={16} />
                    Settings
                  </div>
                  <div className="flex items-center gap-2 bg-neutral-200 rounded-md p-2 pl-10">
                    <CreditCard size={16} />
                    Billing
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="bg-sky-500/10 text-sky-700 rounded-md p-[10px]">
                  Foo Inc
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 text-balance pt-2">
                  <div className="flex items-center gap-2 bg-neutral-200 rounded-md p-2 pl-10">
                    <Layout size={16} />
                    Board
                  </div>
                  <div className="flex items-center gap-2 bg-neutral-200 rounded-md p-2 pl-10">
                    <Activity size={16} />
                    Activity
                  </div>
                  <div className="flex items-center gap-2 bg-neutral-200 rounded-md p-2 pl-10">
                    <Settings size={16} />
                    Settings
                  </div>
                  <div className="flex items-center gap-2 bg-neutral-200 rounded-md p-2 pl-10">
                    <CreditCard size={16} />
                    Billing
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="bg-sky-500/10 text-sky-700 rounded-md p-[10px]">
                  Foo Inc
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 text-balance pt-2">
                  <div className="flex items-center gap-2 bg-neutral-200 rounded-md p-2 pl-10">
                    <Layout size={16} />
                    Board
                  </div>
                  <div className="flex items-center gap-2 bg-neutral-200 rounded-md p-2 pl-10">
                    <Activity size={16} />
                    Activity
                  </div>
                  <div className="flex items-center gap-2 bg-neutral-200 rounded-md p-2 pl-10">
                    <Settings size={16} />
                    Settings
                  </div>
                  <div className="flex items-center gap-2 bg-neutral-200 rounded-md p-2 pl-10">
                    <CreditCard size={16} />
                    Billing
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="flex-1">
          <div className="py-3 border-b">
            <p className="font-semibold text-xl">Foo inc</p>
            <div className="flex items-center gap-1 text-neutral-600">
              <CreditCard size={12} />
              <span className="text-xs">Free</span>
            </div>
          </div>
          <div className="px-4">
            <div className="flex items-center gap-2 my-4 font-semibold text-neutral-700 text-lg">
              <UserRound />
              Your boards
            </div>
            <div>
              <div className="w-24 h-24 bg-neutral-300 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
