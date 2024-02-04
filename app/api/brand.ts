import { TablesInsert, TablesUpdate } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";
import { toastMessage } from "@/utils/toast/toastMessage";

export const getBrand = async () => {
  const { data, error } = await supabase.from("brand").select("*");

  if (error) {
    toastMessage(error.message, "error");
    return null;
  }
  return data;
};

export const getBrandByCode = async (brandCode: string) => {
  if (brandCode === "") return null;

  const { data, error } = await supabase.from("brand").select("*").eq("brandCode", brandCode).limit(1).single();

  if (error) {
    toastMessage(error.message, "error");
    return null;
  }
  return data;
};

export const insertBrand = async (brand: TablesInsert<"brand">) => {
  const { error } = await supabase.from("brand").insert(brand);

  if (error) {
    toastMessage(error.message, "error");
  }
  toastMessage("브랜드 등록 성공", "success");
};

export const updateBrand = async (brand: TablesUpdate<"brand">) => {
  if (brand.id === undefined) {
    toastMessage("브랜드 데이터 ID값이 없습니다.", "error");
    return;
  }
  const { error } = await supabase.from("brand").update(brand).eq("id", brand.id);

  if (error) {
    toastMessage(error.message, "error");
  }
  toastMessage("브랜드 수정 성공", "success");
};

export const deleteBrand = async (brandCode: string) => {
  const { error } = await supabase.from("brand").delete().eq("brandCode", brandCode);

  if (error) {
    toastMessage(error.message, "error");
  }
  toastMessage("브랜드 삭제 성공", "success");
};
