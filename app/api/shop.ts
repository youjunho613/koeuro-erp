import { TablesInsert } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";
import { toastMessage } from "@/utils/toast/toastMessage";

export const getShop = async () => {
  const { data, error } = await supabase.from("shop").select("*");

  if (error) {
    toastMessage(error.message, "error");
    return null;
  }

  return data;
};

export const currentShop = async (id: number) => {
  const { data, error } = await supabase.from("shop").select("*,pos (*)").eq("id", id).limit(1).single();

  if (error) {
    toastMessage(error.message, "error");
    return null;
  }

  return data;
};

export const getShopAndOrder = async () => {
  const { data, error } = await supabase.from("shop").select("*,pos (*)").order("id", { ascending: false });

  if (error) {
    toastMessage(error.message, "error");
    return null;
  }

  return data;
};

export const insertShop = async (shop: TablesInsert<"shop">) => {
  const { error } = await supabase.from("shop").insert(shop);

  if (error) {
    toastMessage(error.message, "error");
  }

  toastMessage("매장이 추가되었습니다.", "success");
};
