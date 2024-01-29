import { TablesInsert } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";
import { toastMessage } from "@/utils/toast/toastMessage";

export const getRelease = async () => {
  const { data, error } = await supabase
    .from("releasing")
    .select("*,products (koreaName, englishName, brandName, brandCode)")
    .order("releasing_date", { ascending: false });

  if (error) {
    toastMessage(error.message, "error");
    return null;
  }

  return data;
};

export const getFilteredRelease = async (barcode: number) => {
  const { data, error } = await supabase.from("releasing").select("*").eq("barcode", barcode);

  if (error) {
    toastMessage(error.message, "error");
    return null;
  }

  return data;
};

export const insertReleasing = async (releasing: TablesInsert<"releasing">) => {
  const { error } = await supabase.from("releasing").insert(releasing);

  if (error) {
    toastMessage(error.message, "error");
    return;
  }
};

export const deleteRelease = async (id: Pick<TablesInsert<"releasing">, "id">) => {
  const { error } = await supabase.from("releasing").delete().eq("id", id).select("*");

  if (error) {
    toastMessage(error.message, "error");
    return;
  }
  toastMessage("삭제 되었습니다.", "success");
};
