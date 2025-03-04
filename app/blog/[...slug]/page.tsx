import { posts } from "#site/content";
import { MDXContent, MDXToC } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { Languages } from "lucide-react";
import { Tag } from "@/components/tag";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ToC } from "@/components/toc";

interface PostPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = (await params)?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

async function getTranslationFromParams(params: PostPageProps["params"]) {
  const orgSlug = (await params)?.slug;
  const curLang = orgSlug?.shift();
  const newLang = curLang === "en" ? "my" : "en";

  const slug = newLang + "/" + orgSlug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);
  if (!post || !post.published) {
    return notFound();
  }

  const translatedPost = await getTranslationFromParams(params);

  const tableOfContents = MDXToC({ code: post.body });  

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
      <div>
        <ul className="hidden sticky top-36 xl:flex xl:ml-12 xl:max-w-48 2xl:ml-28 2xl:max-w-56 list-none flex-col space-y-2">
          {tableOfContents?.map((toc) => (
            <ToC key={toc.id} toc={toc} />
          ))}
        </ul>
        <article className="container py-6 px-2 prose dark:prose-invert max-w-3xl mx-auto">
          <h1 className="mb-2">{post.title}</h1>
          <div className="flex gap-2 mb-2">
            {post.tags?.map((tag) => (
              <Tag tag={tag} key={tag} />
            ))}
          </div>
          {post.description ? (
            <p className="text-xl mt-0 text-muted-foreground">
              {post.description}
            </p>
          ) : null}
          {translatedPost ? (
            translatedPost.language === "my" ? (
              <Alert className="bg-green-100 dark:bg-green-950 ">
                <Languages className="h-4 w-4" />
                <AlertDescription>
                  ဒီဘလော့ကို{" "}
                  <Link href={"/" + translatedPost.slug}>မြန်မာ</Link> လိုလည်း
                  ဖတ်လို့ရပါတယ်။
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="bg-green-100 dark:bg-green-950 ">
                <Languages className="h-4 w-4" />
                <AlertDescription>
                  This blog is also available in{" "}
                  <Link href={"/" + translatedPost.slug}>English</Link>.
                </AlertDescription>
              </Alert>
            )
          ) : null}
          <hr className="my-4" />

          <MDXContent code={post.body} />
        </article>
      </div>
    </Suspense>
  );
}
