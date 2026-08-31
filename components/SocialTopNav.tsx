"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EyeIcon, PlusIcon } from "./icons";

export default function SocialTopNav() {
  const pathname = usePathname();

  return (
    <div className="topnav">
      <Link href="/social/linkhub/view" className={`tab ${pathname === "/social/linkhub/view" ? "active" : ""}`}>
        <EyeIcon size={15} /> View links
      </Link>
      <Link href="/social/linkhub/add" className={`tab ${pathname === "/social/linkhub/add" ? "active" : ""}`}>
        <PlusIcon size={15} /> Add link
      </Link>
    </div>
  );
}
