import { createApi } from "unsplash-js";

// on your node server
const unsplash = createApi({
  accessKey: process.env.ACCESS_KEY as string,
});

export { unsplash };
