import { Sidebar } from "../../_components/sidebar";
import { workspaces } from "@/actions/get-workspaces";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id?: string[] }>;
}) {
  const data = await workspaces();

  if (data.length === 0) {
    return <h1>hi</h1>;
  }

  return (
    <>
      <main className=" max-w-screen-xl mx-auto px-4 mt-10">
        <div className="flex gap-6">
          <Sidebar workspaces={data} />
          <div className="flex-1">{children}</div>
        </div>
      </main>
    </>
  );
}
