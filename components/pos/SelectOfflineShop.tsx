import { Tables } from "@/types/supabase";

interface IProps {
  shopList: Tables<"shop">[];
  currentShop: Tables<"shop"> | null;
  onSelectShop: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export default function SelectOfflineShop({ shopList, currentShop, onSelectShop }: IProps) {
  return (
    <select
      name="shop"
      id="shop"
      onChange={(e) => {
        onSelectShop(e);
      }}
    >
      <option value="" disabled={currentShop !== null}>
        매장 선택
      </option>
      {shopList.map((shop) => (
        <option key={shop.id} value={shop.id}>
          {shop.name}
        </option>
      ))}
    </select>
  );
}
