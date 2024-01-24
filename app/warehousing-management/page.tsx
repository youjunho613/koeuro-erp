"use client";

import AddReceiving from "@/components/form/AddReceiving";
import SubTitle from "@/components/typography/SubTitle";

export default function Page() {
  return (
    <div className="w-full flex-col-center">
      <SubTitle innerText="입고 등록" />
      <AddReceiving />
      <table></table>
    </div>
  );
}
