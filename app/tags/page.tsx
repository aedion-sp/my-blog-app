import { posts } from "#site/content";
import { Tag } from "@/components/tag";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllTags, sortTagsByAlphabet } from "@/lib/utils";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tags",
  description: "Topic I've written about",
};

export default async function TagsPage() {
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByAlphabet(tags);

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[350px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      }
    >
      <div className="container max-w-4xl p-6 lg:p-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:flew-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block font-black text-4xl lg:text-5xl">
              Tags
            </h1>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex flex-wrap gap-2">
          {sortedTags?.map((tag) => (
            <Tag tag={tag} key={tag} />
          ))}
        </div>
      </div>
    </Suspense>
  );
}
