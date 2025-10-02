import Link from "next/link";

interface BoadBoxProps {
  href: string;
  imageSrc: string;
  name: string;
}
export default function BoardBox({ href, imageSrc, name }: BoadBoxProps) {
  return (
    <Link
      href={href}
      className="bg-neutral-100 rounded-md overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition"></div>
      <img className="w-full h-full object-cover" src={imageSrc} alt="board" />
      <h3 className="text-white font-semibold absolute top-2 left-2">{name}</h3>
    </Link>
  );
}
