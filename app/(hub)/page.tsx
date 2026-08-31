import Link from "next/link";
import { LinkIcon } from "@/components/icons";

export default function SocialCategoryPage() {
  return (
    <div className="content">
      <div className="page-head">
        <h1>Social</h1>
        <p>Features in this category.</p>
      </div>

      <Link href="/social/linkhub" className="link-card" style={{ maxWidth: 320 }}>
        <div className="lc-icon">
          <LinkIcon size={17} />
        </div>
        <b>LinkHub Pro</b>
        <span className="note">
          Channel, TikTok, business, and advertising links — all in one place.
        </span>
      </Link>
    </div>
  );
}
