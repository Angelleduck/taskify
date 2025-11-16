import { LogsBasedOnWorkspace } from "@/actions/log";
import { workspaces } from "@/actions/workspace/get-workspaces";
import { Info } from "@/app/(workspace)/_components/info";
import LogActivity from "@/components/log-activity";
import { checkSubscription } from "@/lib/subscription";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;
  const _workspaces = await workspaces();
  const workspace = _workspaces.find((workspace) => workspace.id === id);
  if (!workspace) redirect("/");

  const logs = await LogsBasedOnWorkspace(workspace.id);
  const isPro = await checkSubscription();

  return (
    <>
      <Info isPro={isPro} title={workspace.name} />
      <div className="mt-2 px-4 space-y-3">
        {logs.map((el, idx) => (
          <LogActivity key={idx} el={el} />
        ))}
      </div>
    </>
  );
}
