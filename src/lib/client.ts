import { treaty } from "@elysiajs/eden";
import { type App } from "../app/api/[[...slugs]]/route";

// .api to enter /api prefix
// export const client = treaty<App>("localhost:3000").api;
export const client = treaty<App>("chatterbox-v1.vercel.app").api;
