import SupplySearchForm from "@/components/form/SupplySearchForm";
import SortSelect from "@/components/select/SortSelect";
import SupplyTable from "@/components/table/SupplyTable";
import { Chip } from "@nextui-org/react";

export default async function Page() {
  const sortContent = [
    { key: "latest", label: "최신순", value: "latest" },
    { key: "oldest", label: "오래된순", value: "oldest" },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <Chip
        variant="shadow"
        classNames={{
          base: "my-5 h-16 py-2 bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
          content: "w-52 drop-shadow shadow-black text-white text-center text-3xl select-none",
        }}
      >
        입고 관리
      </Chip>
      <SupplySearchForm />
      <div className="flex flex-col mx-auto my-10 w-9/10">
        <SortSelect items={sortContent} label="정렬 방식" color="danger" />
        <SupplyTable />
      </div>
    </div>
  );
}
