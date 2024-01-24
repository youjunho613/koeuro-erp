import { TTab } from "@/app/product-management/page";

interface IProps {
  currentTab: TTab;
  onChangeTab: (target: TTab) => void;
}

export default function ProductManagementTab({ currentTab, onChangeTab }: IProps) {
  const managementTabs: { key: TTab; label: string }[] = [
    { key: "filtering", label: "조건검색" },
    { key: "addProduct", label: "상품등록" },
    { key: "modifyProduct", label: "상품수정" },
    { key: "addBrand", label: "브랜드 등록" },
    { key: "modifyBrand", label: "브랜드 수정" },
    { key: "deleteBrand", label: "브랜드 삭제" },
  ];

  return (
    <>
      {managementTabs.map((tab) => (
        <button
          key={tab.key}
          className={`flex items-center justify-center px-4 py-2 bg-white border hover:bg-rose-300 ${
            currentTab === tab.key ? "bg-cyan-300 border-cyan-500" : "bg-white"
          }`}
          onClick={() => {
            onChangeTab(tab.key);
          }}
        >
          {tab.label}
        </button>
      ))}
    </>
  );
}
