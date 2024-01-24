import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Footer from "@/components/footer/Footer";
import SocialNav from "@/components/nav/SocialNav";

export default async function Index() {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex flex-col items-center flex-1 w-full gap-20">
      <SocialNav />

      <Footer />
    </div>
  );
}
