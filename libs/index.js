import { fileURLToPath } from "url";

export const publicPath = fileURLToPath(new URL("../static/", import.meta.url));