"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";
import { PropsWithChildren } from "react";

type NavLinkProps = {
  href: string;
};

const NavLink: React.FC<NavLinkProps & PropsWithChildren> = ({
  href,
  children,
}) => {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={
        path.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : classes.link
      }
    >
      {children}
    </Link>
  );
};

export default NavLink;
