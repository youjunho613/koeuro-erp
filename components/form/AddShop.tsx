import { TablesInsert } from "@/types/supabase";
import Require from "../typography/Require";
import { useForm } from "react-hook-form";
import { insertShop } from "@/app/api/shop";

export default function AddShop() {
  const { register, handleSubmit } = useForm<TablesInsert<"shop">>();

  const addShop = handleSubmit(async (data) => {
    await insertShop(data);
  });
  return (
    <form onSubmit={addShop} className="form">
      <label htmlFor="name" className="label">
        <Require innerText="이름" />
        <input type="text" id="name" {...register("name")} />
      </label>
      <label htmlFor="address" className="label">
        주소
        <input type="address" id="address" {...register("address")} />
      </label>
      <label htmlFor="category" className="label">
        분류
        <input type="text" id="category" {...register("category")} />
      </label>
      <label htmlFor="start_date" className="label">
        입점일
        <input type="date" id="start_date" {...register("start_date")} />
        폐점일
        <input type="date" id="end_date" {...register("end_date")} />
      </label>
      <button type="submit" className="success-button small-button">
        등록
      </button>
    </form>
  );
}
