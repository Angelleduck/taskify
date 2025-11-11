import CardModal from "@/components/modals/card-modal";
import Navbar from "../_components/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CardModal />
      <div className="relative">
        <Navbar className="absolute top-0 w-full" />
        {children}
      </div>
    </>
  );
}
