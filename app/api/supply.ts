import { TablesInsert } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";
import { toastMessage } from "@/utils/toast/toastMessage";

export const getSupply = async () => {
  const { data, error } = await supabase
    .from("receiving")
    .select("*,products (koreaName, englishName, brandName, brandCode)")
    .order("receiving_date", { ascending: false });

  if (error) {
    toastMessage(error.message, "error");
    return null;
  }

  return data;
};

export const insertReceiving = async (receiving: TablesInsert<"receiving">) => {
  const { error } = await supabase.from("receiving").insert(receiving);

  if (error) {
    toastMessage(error.message, "error");
    return;
  }
};

export const deleteSupply = async (id: Pick<TablesInsert<"receiving">, "id">) => {
  const { error } = await supabase.from("receiving").delete().eq("id", id).select("*");

  if (error) {
    toastMessage(error.message, "error");
    return;
  }
  toastMessage("삭제 되었습니다.", "success");
};
