"use client";

import AddShop from "@/components/form/AddShop";
import SubTitle from "@/components/typography/SubTitle";

export default function Page() {
  return (
    <div className="w-full flex-col-center">
      <SubTitle innerText="매장 관리" />
      <AddShop />
    </div>
  );
}
