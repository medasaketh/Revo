import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
  const content = readFileSync(envPath, "utf8");
  const env = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return env;
}

const env = loadEnv();
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, anonKey);

const { error: selectError } = await supabase
  .from("wardrobe_items")
  .select("id")
  .limit(1);

if (selectError) {
  console.error("SELECT failed:", selectError.message);
  if (selectError.message.includes("does not exist")) {
    console.error("\n→ Run supabase/migrations/004_wardrobe_items.sql in Supabase SQL Editor.");
  }
  process.exit(1);
}

console.log("✓ wardrobe_items table exists and is readable (RLS may return 0 rows without login).");

const { error: insertError } = await supabase.from("wardrobe_items").insert({
  user_id: "00000000-0000-0000-0000-000000000000",
  name: "test",
  category: "tops",
});

if (insertError) {
  if (insertError.message.includes("row-level security")) {
    console.log("✓ RLS is active (anonymous insert correctly blocked).");
  } else {
    console.error("INSERT test failed:", insertError.message);
    process.exit(1);
  }
} else {
  console.warn("⚠ Anonymous insert succeeded — check RLS policies.");
}

console.log("\nTable setup looks OK. Test save while signed in at /wardrobe or POST /api/wardrobe with session cookie.");
