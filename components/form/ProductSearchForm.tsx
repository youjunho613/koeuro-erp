import { getProduct } from "@/app/api/product";
import { Tables } from "@/types/supabase";
import { useForm } from "react-hook-form";

interface IProps {
  setProductList: React.Dispatch<React.SetStateAction<Tables<"products">[] | null>>;
}

interface ISearchInput {
  koreaName: string;
  englishName: string;
  barcode: string;
  start_date: string;
  end_date: string;
  brandName: string;
  brandCode: string;
  minQuantity: string;
  maxQuantity: string;
}

export default function ProductSearchForm({ setProductList }: IProps) {
  const { register, handleSubmit, reset } = useForm<ISearchInput>();

  const resetProduct = async () => {
    const productList = await getProduct();
    setProductList(productList);
    reset();
  };

  const searchProduct = handleSubmit(async (data: ISearchInput) => {
    const productList = await getProduct();
    if (productList === null) return;

    const filteredBarcode =
      data.barcode !== "" ? productList.filter((product) => String(product.barcode) === data.barcode) : productList;

    const filteredKoreaName =
      data.koreaName !== ""
        ? filteredBarcode.filter((product) => product.koreaName !== null && product.koreaName.includes(data.koreaName))
        : filteredBarcode;

    const filteredEnglishName =
      data.englishName !== ""
        ? filteredKoreaName.filter(
            (product) => product.englishName !== null && product.englishName.includes(data.englishName),
          )
        : filteredKoreaName;

    const filteredBrandName =
      data.brandName !== ""
        ? filteredEnglishName.filter((product) => product.brandName.includes(data.brandName))
        : filteredEnglishName;

    const filteredBrandCode =
      data.brandCode !== ""
        ? filteredBrandName.filter((product) => product.brandCode.includes(data.brandCode))
        : filteredBrandName;

    const filteredMinQuantity =
      data.minQuantity !== ""
        ? filteredBrandCode.filter((product) => product.quantity >= Number(data.minQuantity))
        : filteredBrandCode;

    const filteredMaxQuantity =
      data.maxQuantity !== ""
        ? filteredMinQuantity.filter((product) => product.quantity <= Number(data.maxQuantity))
        : filteredMinQuantity;

    setProductList(filteredMaxQuantity);
  });

  return (
    <form onSubmit={searchProduct} className="form">
      <div className="flex flex-wrap items-center justify-around gap-5">
        <label htmlFor="koreaName" className="label">
          제품명
          <input type="text" id="koreaName" {...register("koreaName")} />
        </label>
        <label htmlFor="englishName" className="label">
          영문명
          <input type="text" id="englishName" {...register("englishName")} />
        </label>
        <label htmlFor="brandName" className="label">
          브랜드
          <input type="text" id="brandName" {...register("brandName")} />
        </label>
        <label htmlFor="brandCode" className="label">
          브랜드 코드
          <input type="text" id="brandCode" {...register("brandCode")} />
        </label>
        <label htmlFor="barcode" className="label">
          바코드
          <input type="text" id="barcode" {...register("barcode")} />
        </label>
        <label htmlFor="" className="label">
          입고수량
          <input type="number" id="" {...register("minQuantity")} />
          ~
          <input type="text" id="" {...register("maxQuantity")} />
        </label>
      </div>
      <div className="flex items-center justify-around">
        <button type="submit" className="success-button small-button">
          조회
        </button>
        <button onClick={resetProduct} type="button" className="delete-button small-button">
          검색 초기화
        </button>
      </div>
    </form>
  );
}
