"use client";

import { useState } from "react";
import { Input, Button } from "@nextui-org/react";

export default function SupplySearchForm() {
  const [isShowForm, setIsShowForm] = useState(false);

  const onChangeFormShow = () => {
    setIsShowForm(!isShowForm);
  };

  return (
    <>
      {!isShowForm && (
        <form action="" className="relative flex flex-wrap gap-5 p-5 mx-auto my-10 border w-9/10">
          <div className="flex items-center justify-center w-1/4 gap-1">
            <Input
              type="date"
              color="primary"
              label="입고일자"
              labelPlacement="outside-left"
              classNames={{ label: "text-xs" }}
            />
            ~
            <Input type="date" color="primary" labelPlacement="outside-left" />
          </div>
          <Input
            type="text"
            color="primary"
            label="브랜드"
            labelPlacement="outside-left"
            className="flex items-center justify-center w-1/4"
          />
          <Input
            type="text"
            color="primary"
            label="브랜드 코드"
            labelPlacement="outside-left"
            className="flex items-center justify-center w-1/4"
          />
          <Input
            type="text"
            color="primary"
            label="담당자"
            labelPlacement="outside-left"
            className="flex items-center justify-center w-1/4"
          />
          <Input
            type="text"
            color="primary"
            label="담당자 사번"
            labelPlacement="outside-left"
            className="flex items-center justify-center w-1/4"
          />
          <Input
            type="text"
            color="primary"
            label="제품 바코드"
            labelPlacement="outside-left"
            className="flex items-center justify-center w-1/4"
          />
          <Input
            type="text"
            color="primary"
            label="입고 수량"
            labelPlacement="outside-left"
            className="flex items-center justify-center w-1/4"
          />
          <div className="flex items-center justify-center w-1/4 gap-1">
            <Input
              type="number"
              color="primary"
              label="입고가"
              labelPlacement="outside-left"
              classNames={{ base: "w-auto", input: "w-20" }}
            />
            ~
            <Input
              type="number"
              color="primary"
              labelPlacement="outside-left"
              classNames={{ base: "w-auto", input: "w-20" }}
            />
          </div>

          <div className="flex items-center justify-center w-1/4 gap-1">
            <Input
              type="number"
              color="primary"
              label="판매가"
              labelPlacement="outside-left"
              classNames={{ base: "w-auto", input: "w-20" }}
            />
            ~
            <Input
              type="number"
              color="primary"
              labelPlacement="outside-left"
              classNames={{ base: "w-auto", input: "w-20" }}
            />
          </div>

          <Button color="primary" size="lg">
            조회
          </Button>
          <Button color="danger" variant="ghost" size="lg" type="reset">
            입력 초기화
          </Button>
          <button className="absolute bottom-0 right-0 m-2" type="button" onClick={onChangeFormShow}>
            최소화
          </button>
        </form>
      )}

      {isShowForm && (
        <button className="flex justify-center p-5 mx-auto my-10 border w-9/10" onClick={onChangeFormShow}>
          검색 조건 열기
        </button>
      )}
    </>
  );
}
