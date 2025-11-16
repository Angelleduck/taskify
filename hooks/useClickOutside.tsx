import { type RefObject, useEffect } from "react";

export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: () => void
) {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
}
