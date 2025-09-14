import { pristest } from "@/actions/pristest";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, UserRound } from "lucide-react";
import { AccordionList } from "../../_components/accordion-list";
import { DialogCreateButton } from "../../_components/create-button";

export default async function Page({
  params,
}: {
  params: Promise<{ id?: string[] }>;
}) {
  const workspaces = await pristest();
  const { id } = await params;
  const path = id?.join("/");

  if (workspaces.length === 0) {
    return <h1>hi</h1>;
  }

  const titleName = workspaces.find((workspace) => workspace.id === id?.at(0));

  return (
    <main className=" max-w-screen-xl mx-auto px-4 mt-10">
      <div className="flex gap-6">
        <div className="w-64">
          <div className="flex items-center justify-between ml-4 mb-2 text-xs font-medium">
            <h3>Workspaces</h3>

            <DialogCreateButton />
          </div>
          <div>
            <Accordion
              type="multiple"
              className="w-full space-y-2"
              defaultValue={[
                "cmfh9inhh0000uer8roi5zqre",
                "cmfh9itws0001uer8klisz61w",
              ]}
            >
              {workspaces.map((workspace) => (
                <AccordionList
                  key={workspace.id}
                  keyItem={workspace.id}
                  workspaceId={workspace.id}
                  title={workspace.name}
                  path={path}
                />
              ))}
            </Accordion>
          </div>
        </div>
        <div className="flex-1">
          <div className="py-3 border-b">
            <p className="font-semibold text-xl">{titleName?.name}</p>
            <div className="flex items-center gap-1 text-neutral-600">
              <CreditCard size={12} />
              <span className="text-xs">Free</span>
            </div>
          </div>
          <div className="px-4">
            <div className="flex items-center gap-2 my-4 font-semibold text-neutral-700 text-lg">
              <UserRound />
              Your workspaces
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
