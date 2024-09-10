import { sansitaSwashed } from "@/app/layout";
import Link from "next/link";

type LogoProps = {};
const Logo: React.FC<LogoProps> = ({}) => {
  return (
    <Link href="/">
      <h2
        className={`${sansitaSwashed.className} text-2xl font-bold md:text-4xl`}
      >
        BudsFormula
      </h2>
    </Link>
  );
};

export default Logo;
