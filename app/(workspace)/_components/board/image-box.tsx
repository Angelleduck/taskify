import { Check } from "lucide-react";

interface ImageBoxProps {
  selectedImage?: Record<string, any>;
  handleSelectedImage: (image: Record<string, any>) => void;
  image: Record<string, any>;
}

export function ImageBox(props: ImageBoxProps) {
  const { selectedImage, handleSelectedImage, image } = props;
  return (
    <div
      role="button"
      onClick={() => {
        handleSelectedImage(image);
      }}
      className="rounded-sm overflow-hidden relative group hover:opacity-75 transition bg-muted"
    >
      <img
        className="w-full h-full object-cover"
        src={image.urls.thumb}
        alt={image.atl_description}
      />

      {image.id === selectedImage?.id && (
        <div className="flex items-center justify-center absolute inset-0 h-full bg-black/30">
          <Check size={18} className="text-white" />
        </div>
      )}
      <a
        target="_blank"
        href={image.user.links.html}
        className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
      >
        {image.user.first_name}
      </a>
    </div>
  );
}
