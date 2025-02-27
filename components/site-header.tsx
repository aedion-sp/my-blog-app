import { siteConfig } from "@/config/site";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <Link
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-10 p-0 hidden sm:inline-flex"
                )}
              >
                <Icons.instagram className="w-8 h-8" />
                <span className="sr-only">Instagram</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-10 p-0 hidden sm:inline-flex"
                )}
              >
                <Icons.linkedin className="w-8 h-8" />
                <span className="sr-only">LinkedIn</span>
              </div>
            </Link>
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
