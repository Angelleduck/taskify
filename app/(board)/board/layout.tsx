import Navbar from "@/app/(workspace)/_components/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <Navbar className="absolute top-0 w-full" />
      {children}
    </div>
  );
}
