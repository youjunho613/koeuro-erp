"use client";

import AddReleaseForm from "@/components/form/AddReleaseForm";
import SubTitle from "@/components/typography/SubTitle";

export default function Page() {
  return (
    <div className="w-full flex-col-center">
      <SubTitle innerText="출고 등록" />
      <AddReleaseForm />
    </div>
  );
}
