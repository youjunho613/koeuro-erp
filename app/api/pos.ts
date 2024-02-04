import { TablesInsert } from "@/types/supabase";
import { supabase } from "@/utils/supabase/client";
import { toastMessage } from "@/utils/toast/toastMessage";

export const getPos = async () => {
  const { data, error } = await supabase.from("pos").select("*");

  if (error) {
    toastMessage(error.message, "error");
    return null;
  }

  return data;
};

export const insertPos = async (pos: TablesInsert<"pos">) => {
  const { error } = await supabase.from("pos").insert(pos);

  if (error) {
    toastMessage(error.message, "error");
  }

  toastMessage("결제 완료", "success");
};

// TODO test 필요
export const getLastPayment = async () => {
  const { data, error } = await supabase.from("pos").select("*").order("id", { ascending: false }).limit(1).single();

  if (error) {
    toastMessage(error.message, "error");
    return null;
  }

  return data;
};

export const cancelPos = async (id: number, isCancel: boolean) => {
  const { error } = await supabase.from("pos").update({ isCancel }).eq("id", id);

  if (error) {
    toastMessage(error.message, "error");
    return;
  }

  isCancel ? toastMessage("취소 되었습니다.", "success") : toastMessage("재승인 되었습니다.", "success");
};

export const deletePos = async (id: number) => {
  const { error } = await supabase.from("pos").delete().eq("id", id).select("*");

  if (error) {
    toastMessage(error.message, "error");
    return;
  }

  toastMessage("삭제 되었습니다.", "success");
};
