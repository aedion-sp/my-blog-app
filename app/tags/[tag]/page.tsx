import { posts } from "#site/content";
import { LanguageSwitcher } from "@/components/language-switcher";
import { PostItem } from "@/components/post-item";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllTags, getPostsByTagSlug, sortTagsByAlphabet } from "@/lib/utils";
import { slug } from "github-slugger";
import { Suspense } from "react";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
  searchParams: Promise<{
    lang?: string;
  }>;
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  return {
    title: tag,
    description: `Posts on the topics of ${tag}`,
  };
}

export const generateStaticParams = () => {
  const tags = getAllTags(posts);
  const paths = [...tags].map((tag) => ({ tag: slug(tag) }));
  return paths;
};

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { tag } = await params;
  const title = tag.split("-").join(" ");
  const language = (await searchParams)?.lang || "en";

  let displayPosts = getPostsByTagSlug(posts, tag);
  displayPosts = displayPosts.filter(
    (post) => post.published && post.language === language
  );
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByAlphabet(tags);

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen bg-background">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[350px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      }
    >
      <div className="container max-w-4xl p-6 lg:py-10 mx-auto">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block font-black text-4xl lg:text-5xl capitalize">
              {title}
            </h1>
          </div>
          <LanguageSwitcher />
        </div>
        <div className="grid grid-cols-12 gap-3 mt-8">
          <div className="col-span-12 col-start-1 sm:col-span-8">
            <hr />
            {displayPosts?.length > 0 ? (
              <ul className="flex flex-col">
                {displayPosts.map((post) => {
                  const { slug, title, description, date, tags } = post;
                  return (
                    <li key={slug}>
                      <PostItem
                        slug={slug}
                        title={title}
                        description={description}
                        date={date}
                        tags={tags}
                      />
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>Nothing to see here yet</p>
            )}
          </div>
          <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {sortedTags?.map((t) => (
                <Tag
                  tag={t}
                  key={t}
                  current={slug(t) === tag}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Suspense>
  );
}
