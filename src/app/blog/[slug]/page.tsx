import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { FinalCta } from "@/components/sections/final-cta";
import { blogPosts, getBlogPost } from "@/data/blog-posts";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image }],
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={formatDate(post.date)}
        title={post.title}
        description={post.excerpt}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Post" },
        ]}
        image={post.image}
      />

      <article className="bg-bg py-20 lg:py-24">
        <div className="container max-w-3xl">
          <div className="prose-content text-text-secondary text-lg leading-relaxed space-y-6">
            {post.body && post.body.length > 0 ? (
              post.body.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <div className="bg-warm-1 border border-warm-2 rounded-2xl p-8 text-center">
                <h3 className="font-serif text-xl text-text">Article body coming soon.</h3>
                <p className="mt-3 text-sm text-text-secondary">
                  We're migrating articles in stages. The full text of this post will be available
                  shortly. In the meantime, here's the original summary:
                </p>
                <p className="mt-5 italic text-text">"{post.excerpt}"</p>
              </div>
            )}
          </div>

          <div className="mt-12 pt-8 border-t border-warm-2">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent hover:text-accent-dark transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to blog
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-warm-1 py-20 lg:py-24">
          <div className="container">
            <h2 className="font-serif text-2xl lg:text-3xl text-text mb-10">Related reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-animate>
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-warm-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-premium"
                >
                  <div className="img-zoom relative aspect-[3/2]">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-lg text-text leading-tight group-hover:text-accent transition-colors duration-300">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCta />
    </>
  );
}
