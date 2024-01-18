interface Props {
  innerText: string;
}

export default function SubTitle({ innerText }: Props) {
  return (
    <h2 className="flex items-center justify-center w-full h-16 text-3xl text-white bg-gradient-to-br from-indigo-500 to-pink-500 shadow-pink-500/30">
      {innerText}
    </h2>
  );
}
