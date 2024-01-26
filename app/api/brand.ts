import { TablesInsert } from "@/types/supabase";
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

export const insertBrand = async (brand: TablesInsert<"brand">) => {
  const { error } = await supabase.from("brand").insert(brand);

  if (error) {
    toastMessage(error.message, "error");
  }
  toastMessage("브랜드 등록 성공", "success");
};
