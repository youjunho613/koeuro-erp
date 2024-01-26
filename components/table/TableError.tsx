import { useEffect, useState } from "react";

/**
 * 추후 isLoading 구현 예정
 * @returns
 */
export default function TableError() {
  const [isTimeOver, setIsTimeOver] = useState(false);
  
  const timeOver = () => {
    setTimeout(() => {
      setIsTimeOver(true);
    }, 10 * 1000);
  };

  useEffect(() => {
    timeOver();
  }, []);

  return (
    <div className="table-error">{isTimeOver ? <p>데이터가 없습니다.</p> : <p>데이터를 불러오는 중입니다.</p>}</div>
  );
}
