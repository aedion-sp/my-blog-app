"use client";

import { slug } from "github-slugger";
import Link from "next/link";
import { badgeVariants } from "./ui/badge";
import { useSearchParams } from "next/navigation";

interface TagProps {
  tag: string;
  current?: boolean;
}

export function Tag({ tag, current }: TagProps) {
  const searchParams = useSearchParams();
  const currentLang = searchParams.get("lang") || "en";

  const tagUrl = `/tags/${slug(tag)}?lang=${currentLang}`;
  
  return (
    <Link
      className={badgeVariants({
        variant: current ? "default" : "secondary",
        className: "no-underline rounded-md",
      })}
      href={tagUrl}
    >
      {tag}
    </Link>
  );
}