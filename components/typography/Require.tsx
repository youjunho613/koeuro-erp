interface IProps {
  innerText: string;
  gap?: number;
}

export default function Require({ innerText, gap = 0 }: IProps) {
  return (
    <p className={`flex-center gap-${gap}`}>
      {innerText}
      <span className="text-sm text-red-500 align-middle">(필수)</span>
    </p>
  );
}
