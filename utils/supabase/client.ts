// import { createBrowserClient } from "@supabase/ssr";
// export const createClient = () =>
//   createBrowserClient(SUAPBASE_URL!, SUPABASE_ANON_KEY!);

import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

export const SUAPBASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
export const SUPABASE_ANON_KEY = process.env
  .NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(SUAPBASE_URL, SUPABASE_ANON_KEY);
