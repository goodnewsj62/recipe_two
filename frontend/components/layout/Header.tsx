import { SITELINKS } from "@/constants";
import { IoMenuSharp } from "react-icons/io5";
import Logo from "./Logo";
import NavLink from "./NavLink";

const DEFAULT_NAV_STYLES =
  "capitalize font-medium text-md hover:text-errorColor";

const Header: React.FC = ({}) => {
  // const username = useAuthStore((state) => state.user?.username);
  // const toggleBar = useSideBarStore((state) => state.toggle);
  // username && link === routes.MYRECIPE
  // ? link.replace(":u", username)
  // : link
  return (
    <header className="fixed left-0 top-0 z-[300] flex h-[70px] w-full items-center bg-white px-4 lg:container md:px-8 lg:relative lg:mx-auto">
      <div className="mb-2 lg:mb-0">
        <Logo />
      </div>

      <nav className="ml-auto hidden items-center gap-8 lg:flex">
        {SITELINKS.map(({ text, link }) => (
          <NavLink
            to={link}
            key={text}
            className={{
              isActive: `${DEFAULT_NAV_STYLES} font-bold text-errorColor [box-shadow:0px_2px_0px_0px_var(--color-error-main)]`,
              default: `${DEFAULT_NAV_STYLES}`,
            }}
          >
            {text}
          </NavLink>
        ))}
      </nav>

      <div className="ml-auto lg:hidden">
        <button
          id="mob__bar"
          className="[appearance:none]"
          // onClick={() => toggleBar()}
        >
          <IoMenuSharp size={"30"} />
        </button>
      </div>
    </header>
  );
};

export default Header;
