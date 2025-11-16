"use server";

import { unsplash } from "@/lib/unsplash";

export async function getImages() {
  try {
    const { response: data } = await unsplash.photos.getRandom({
      collectionIds: ["317099"],
      count: 9,
    });

    return data;
  } catch {
    throw new Error("Something went wrong");
  }
}
