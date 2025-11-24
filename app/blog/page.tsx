import { BlogPosts } from "../components/posts";

export default function Page() {
  return (
    <section className="space-y-8">
      <h1 className="text-2xl font-semibold tracking-tighter">
        Blog
      </h1>

      <BlogPosts />
    </section>
  );
}
