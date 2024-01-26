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

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <div className="flex flex-col items-center flex-1 w-full gap-20">
      <SocialNav />
      <div className="flex items-center justify-around w-full">
        <div className="gap-10 p-10 border flex-col-center rounded-xl border-slate-300">
          <p className="text-2xl">매출 통계</p>
          <div className="gap-10 flex-center">
            <div className="flex flex-col items-center justify-end">
              <p>일일 매출</p>
              <p>{`${year}-${month}-${day}`}</p>
              <p>{}원</p>
            </div>
            <div className="flex flex-col items-center justify-end">
              <p>7일 매출</p>
              <p>
                {`${year}-${month}-${day}`} ~ {`${year}-${month}-${day}`}
              </p>
              <p>{}원</p>
            </div>
            <div className="flex flex-col items-center justify-end">
              <p>1개월 매출</p>
              <p>
                {`${year}-${month}-${day}`} ~ {`${year}-${month}-${day}`}
              </p>
              <p>{}원</p>
            </div>
          </div>
          <span className="text-sm text-slate-500">카페24, 네이버 스마트 스토어 매출 가져올 수 있는지 확인 필요</span>
        </div>
        <div className="gap-10 p-10 border flex-col-center rounded-xl border-slate-300">
          <p className="text-2xl">배송 현황</p>
          <div className="gap-10 flex-center">
            <div className="flex flex-col items-center justify-end">
              <p>미배송</p>
              <p>건</p>
            </div>
            <div className="flex flex-col items-center justify-end">
              <p>배송 완료</p>
              <p>건</p>
            </div>
          </div>
          <span className="text-sm text-slate-500">
            카페24, 네이버 스마트 스토어 배송정보 가져올 수 있는지 확인 필요
          </span>
        </div>
      </div>

      <Footer />
    </div>
  );
}
