interface Props {
  innerText: string;
}

export default function SubTitle({ innerText }: Props) {
  return (
    <h2 className="w-full h-16 text-3xl font-bold text-white flex-center bg-gradient-to-br from-slate-300 to-slate-600">
      {innerText}
    </h2>
  );
}
