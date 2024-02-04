export interface ISearchInput {
  barcode: string;
  start_date: string;
  end_date: string;
  brandName: string;
  brandCode: string;
  minQuantity: string;
  maxQuantity: string;
}

export interface IProductSearchInput extends ISearchInput {
  koreaName: string;
  englishName: string;
}
