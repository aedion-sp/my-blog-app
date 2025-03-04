"use client";

import { cn } from "@/lib/utils";
import { TocEntry } from "@stefanprobst/rehype-extract-toc";
import Link from "next/link";

export const ToC = ({
  toc,
  active = false,
}: {
  toc: TocEntry;
  active?: boolean;
}) => {
  return (
    <li className="group">
      <Link href={`#${toc.id}`}>
        <span className="relative">
          <span
            className={cn(
              "text-foreground/60 transition-colors duration-300 hover:text-foreground",
              active && "text-foreground"
            )}
          >
            {toc.value}
          </span>
        </span>
      </Link>
      {toc.children ? (
        <ul className="list-none flex flex-col ml-2 mt-2 space-y-2">
          {toc.children.map((item) => (
            <Link href={`#${item.id}`} key={item.id}>
              <span className="relative">
                <span
                  className={cn(
                    "text-foreground/60 transition-colors duration-300 hover:text-foreground",
                    active && "text-foreground"
                  )}
                >
                  {item.value}
                </span>
              </span>
            </Link>
          ))}
        </ul>
      ) : null}
    </li>
  );
};
