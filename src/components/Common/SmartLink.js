import React from "react";
import Link from "next/link";
import { useNavigationConfig } from "@/context/NavigationConfigContext";

/**
 * SmartLink Component
 * Automatically determines whether to render a Next.js client-side Link (_self)
 * or an external tab anchor (_blank) based on the admin navigation configuration.
 *
 * Defaults to _self if the URL has no specific configuration.
 */
export default function SmartLink({
  href,
  children,
  className = "",
  target: explicitTarget,
  rel,
  onClick,
  ...props
}) {
  const { getLinkTarget } = useNavigationConfig();
  const effectiveTarget = explicitTarget || getLinkTarget(href);

  if (effectiveTarget === "_blank") {
    return (
      <a
        href={href}
        target="_blank"
        rel={rel || "noopener noreferrer"}
        className={className}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href || "#"} className={className} onClick={onClick} {...props}>
      {children}
    </Link>
  );
}
