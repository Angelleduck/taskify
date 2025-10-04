import { Sidebar } from "../../_components/sidebard/sidebar";
import { workspaces } from "@/actions/workspace/get-workspaces";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await workspaces();

  if (data.length === 0) {
    return <h1>hi</h1>;
  }

  return (
    <main className="max-w-screen-xl mx-auto px-4 mt-10">
      <div className="flex gap-6">
        <Sidebar className="hidden md:block" workspaces={data} />
        <div className="flex-1">{children}</div>
      </div>
    </main>
  );
}
