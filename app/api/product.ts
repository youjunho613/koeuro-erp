import { TablesUpdate } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";
import { toastMessage } from "@/utils/toast/toastMessage";

export const getProduct = async () => {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    toastMessage(error.message, "error");
    return null;
  }

  return data;
};

export const getFilteredProduct = async (brandCode: string) => {
  const { data, error } = await supabase.from("products").select("*").eq("brandCode", brandCode);

  if (error) {
    toastMessage(error.message, "error");
    return null;
  }

  return data;
};

export const getCurrentProduct = async (barcode: number) => {
  const { data, error } = await supabase.from("products").select("*").eq("barcode", barcode).limit(1).single();

  if (error) {
    toastMessage(error.message, "error");
    return null;
  }

  return data;
};

export const modifyProduct = async (barcode: number, data: TablesUpdate<"products">) => {
  const { error } = await supabase.from("products").update(data).eq("barcode", barcode);

  if (error !== null) {
    toastMessage(error.message, "error");
  }

  toastMessage("상품이 수정되었습니다", "success");
};

export const updateQuantity = async ({ barcode, quantity }: { barcode: number; quantity: number }) => {
  const { error } = await supabase.from("products").update({ quantity }).eq("barcode", barcode);

  if (error) {
    toastMessage(error.message, "error");
    return;
  }
};

export const deleteProduct = async (barcode: number) => {
  const { error } = await supabase.from("products").delete().eq("barcode", barcode);

  if (error) {
    toastMessage(error.message, "error");
    return;
  }
};
