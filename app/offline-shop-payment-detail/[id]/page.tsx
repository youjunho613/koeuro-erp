"use client";

import { currentShop } from "@/app/api/shop";
import OfflineShopReport from "@/components/dashborad/OfflineShopReport";
import OfflineShopTable from "@/components/table/OfflineShopTable";
import SubTitle from "@/components/typography/SubTitle";
import type { Tables } from "@/types/supabase";
import React from "react";

interface IProps {
  params: {
    id: string;
  };
}

export default function Page({ params: { id: shopId } }: IProps) {
  const [shop, setShop] = React.useState<(Tables<"shop"> & { pos: Tables<"pos">[] }) | null>(null);
  const [isDetailVisible, setIsDetailVisible] = React.useState(false);

  const refetchShop = async () => {
    const shopData = await currentShop(Number(shopId));
    setShop(shopData);
  };

  React.useEffect(() => {
    const fetchShop = async () => {
      const shopData = await currentShop(Number(shopId));
      setShop(shopData);
    };
    fetchShop();
  }, [setShop]);

  const onChangeDetailVisible = () => {
    setIsDetailVisible(!isDetailVisible);
  };

  if (shop === null) return <div>loading...</div>;

  return (
    <div className="w-full flex-col-center">
      <SubTitle innerText={`${shop.name} 매출`} />
      <OfflineShopReport shop={shop} />

      <button className="mt-10 mb-5 small-button success-button" type="button" onClick={onChangeDetailVisible}>
        {isDetailVisible ? "간략히 보기" : "자세히 보기"}
      </button>
      <OfflineShopTable
        refetchShop={refetchShop}
        isDetailVisible={isDetailVisible}
        shopPos={shop.pos}
        setShop={setShop}
      />
    </div>
  );
}
