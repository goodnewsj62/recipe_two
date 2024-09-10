"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

type NavLinkProps = {
  className: string | { isActive: string; default: string };
  to: string;
} & PropsWithChildren;
const NavLink: React.FC<NavLinkProps> = ({ children, className, to }) => {
  const path = usePathname();

  return (
    <Link
      href={to}
      className={
        typeof className === "string"
          ? className
          : path === to
          ? className.isActive
          : className.default
      }
    >
      {children}
    </Link>
  );
};

export default NavLink;
