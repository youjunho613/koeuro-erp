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

export const updateQuantity = async ({ barcode, quantity }: { barcode: number; quantity: number }) => {
  const { error } = await supabase.from("products").update({ quantity }).eq("barcode", barcode);

  if (error) {
    toastMessage(error.message, "error");
    return;
  }
};
