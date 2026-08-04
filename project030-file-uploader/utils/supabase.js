import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs";

process.loadEnvFile();

const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_API_KEY,
);

export default supabase;
