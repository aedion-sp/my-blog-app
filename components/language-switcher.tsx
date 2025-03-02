"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLang = searchParams.get("lang") || "en";
  
  const createQueryString = (lang: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", lang);
    return params.toString();
  };

  return (
    <div className="flex gap-2">
      <Link 
        href={`${pathname}?${createQueryString("en")}`}
        className={cn(
          buttonVariants({ variant: currentLang === "en" ? "default" : "outline", size: "sm" })
        )}
      >
        English
      </Link>
      <Link 
        href={`${pathname}?${createQueryString("my")}`}
        className={cn(
          buttonVariants({ variant: currentLang === "my" ? "default" : "outline", size: "sm" })
        )}
      >
        မြန်မာ
      </Link>
    </div>
  );
}