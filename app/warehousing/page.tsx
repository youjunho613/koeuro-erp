import SupplySearchForm from "@/components/form/SupplySearchForm";
import SortSelect from "@/components/select/SortSelect";
import SupplyTable from "@/components/table/SupplyTable";
import SubTitle from "@/components/typography/SubTitle";

export default async function Page() {
  const sortContent = [
    { key: "latest", label: "최신순", value: "latest" },
    { key: "oldest", label: "오래된순", value: "oldest" },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <SubTitle innerText="입고 조회" />
      <SupplySearchForm />
      <div className="flex flex-col mx-auto my-10 w-9/10">
        <SortSelect items={sortContent} label="정렬 방식" color="danger" />
        <SupplyTable />
      </div>
    </div>
  );
}
