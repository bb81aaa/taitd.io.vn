import PostPreview from "@/components/posts/PostPreview";
import { allPosts, Post } from "contentlayer/generated";

const PostsPage = () => {
  return (
    <div className="container mb-4">
      <div className="prose-headings:font-heading prose mx-auto max-w-5xl dark:prose-invert prose-headings:font-bold prose-headings:leading-tight hover:prose-a:text-accent-foreground prose-a:prose-headings:no-underline">
        <h1 className="mt-0">Latest Posts</h1>
        <hr className="my-4" />
        <div className="grid grid-flow-row gap-2">
          {allPosts.map((post) => (
            <PostPreview post={post} key={post._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
