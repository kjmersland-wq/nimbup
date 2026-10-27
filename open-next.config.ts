import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default {
  ...defineCloudflareConfig(),
  // OpenNext runs `npm run build` by default. `build` now runs OpenNext
  // itself, so point it at the plain Next.js build to avoid a loop.
  buildCommand: "npm run build:next",
};
