import { insertBrand } from "@/app/api/brand";
import type { TablesInsert } from "@/types/supabase";
import { useForm } from "react-hook-form";

export default function AddBrand() {
  const { register, handleSubmit } = useForm<TablesInsert<"brand">>();

  const addBrandHandler = handleSubmit(async (data) => {
    insertBrand(data);
  });

  return (
    <form onSubmit={addBrandHandler} className="form">
      <label className="label" htmlFor="brandName">
        이름
        <input type="text" id="brandName" {...register("brandName")} />
      </label>
      <label className="label" htmlFor="brandCode">
        브랜드 코드
        <input type="text" id="brandCode" {...register("brandCode")} />
      </label>
      <button type="submit" className="success-button small-button">
        등록
      </button>
    </form>
  );
}
