"use client";
import { SITELINKS } from "@/constants";
import routes from "@/routes";
import NavLink from "./NavLink";

const LINKS = SITELINKS.concat([
  {
    link: routes.ABOUT,
    text: "about",
  },
]);

const DEFAULT_NAV_STYLES =
  "px-6 capitalize py-4 font-medium hover:bg-[rgba(0,0,0,0.2)]";

const SideBar: React.FC = ({}) => {
  // const isOpen = useSideBarStore((state) => state.isOpen);
  // const toggle = useSideBarStore((state) => state.toggle);
  // const username = useAuthStore((state) => state.user?.username);
  // const ref = useHideOnClickedOutside(() => toggle(false), ["mob__bar"]);

  const isOpen = false;

  return (
    <aside>
      <nav
        // ref={ref}
        className={`fixed -left-[220px] top-[70px] z-[300] flex h-[calc(100svh-70px)] w-[220px] ${
          isOpen && "!left-0"
        } flex-col bg-primaryColor py-6 lg:hidden`}
        style={{
          transition: "left 0.2s",
        }}
      >
        {LINKS.map(({ text, link }) => (
          <NavLink
            to={
              // username && link === routes.MYRECIPE
              //   ? link.replace(":u", username)
              //   : link
              link
            }
            key={link + text}
            className={{
              isActive: `${DEFAULT_NAV_STYLES} bg-black font-bold text-white`,
              default: `${DEFAULT_NAV_STYLES}`,
            }}
          >
            {text}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
