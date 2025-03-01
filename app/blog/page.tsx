import { posts } from "#site/content";
import { LanguageSwitcher } from "@/components/language-switcher";
import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { sortPosts } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IdeaBits Blog",
}

const POSTS_PER_PAGE = 5;

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    lang?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number((await searchParams)?.page) || 1
  const language = (await searchParams)?.lang || "en";
  const sortedPosts = sortPosts(posts.filter((post) => post.published && post.language === language));
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  return (
    <div className="container max-w-4xl p-6 lg:py-10 mx-auto">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">Blog</h1>
          <p className="text-xl text-muted-foreground">
            My rumblings on all things web dev.
          </p>
        </div>
        <LanguageSwitcher />
      </div>
      <hr className="mt-8" />
      {displayPosts?.length > 0 ? (
        <ul className="flex flex-col">
          {displayPosts.map((post) => {
            const { slug, title, description, date } = post;
            return (
              <li key={slug}>
                <PostItem
                  slug={slug}
                  title={title}
                  description={description}
                  date={date}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Nothing to see here yet</p>
      )}
      <QueryPagination totalPages={totalPages} className="justify-end mt-4" />
    </div>
  );
}
