import Link from "next/link";

export default function SocialNav() {
  const socialNav = [
    { name: "사업부", link: "https://koeuro.com" },
    { name: "자사몰", link: "https://koeuro.shop" },
    { name: "인스타그램", link: "https://www.instagram.com/koeuro.shop" },
    { name: "유튜브", link: "https://www.youtube.com/@koeuro" },
    { name: "페이스북", link: "https://www.facebook.com/koeurofacebook" },
    { name: "카카오톡 채널", link: "http://pf.kakao.com/_xayfxoxj" },
  ];

  return (
    <div className="p-5 my-10 bg-white rounded-lg">
      <ul className="flex gap-10 p-5 rounded-lg bg-default-200">
        {socialNav.map((item) => (
          <li key={item.name}>
            <Link href={item.link} className="font-semibold hover:underline">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
