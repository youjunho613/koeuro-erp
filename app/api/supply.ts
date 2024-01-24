import { supabase } from "@/utils/supabase/client";
import { toastMessage } from "@/utils/toast/toastMessage";

export const getSupply = async () => {
  // const { data, error } = await supabase.from("receiving").select("*").order("receiving_date", { ascending: false });
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

export const insertReceiving = async (receiving: { barcode: number; quantity: number; receiving_date: string }) => {
  const { error } = await supabase.from("receiving").insert(receiving);

  if (error) {
    toastMessage(error.message, "error");
    return;
  }
};

export const deleteSupply = async (id: number) => {
  const { error } = await supabase.from("receiving").delete().eq("id", id).select("*");

  if (error) {
    toastMessage(error.message, "error");
    return;
  }
  toastMessage("삭제 되었습니다.", "success");
};
