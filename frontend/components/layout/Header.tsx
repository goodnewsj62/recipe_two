import { SITELINKS } from "@/constants";
import HamburgerToggle from "./HamburgerToggle";
import Logo from "./Logo";
import NavLink from "./NavLink";

const DEFAULT_NAV_STYLES =
  "capitalize font-medium text-md hover:text-errorColor";

const Header: React.FC = ({}) => {
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
        <HamburgerToggle />
      </div>
    </header>
  );
};

export default Header;
