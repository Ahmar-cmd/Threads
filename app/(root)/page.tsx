import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;
  
  const result = await fetchPosts(1,20);

  return (
    <>
     <section className="mt-3 flex flex-col gap-10">
       {result.posts.length === 0 ? (
        <p className='no-result'>No threads found</p>
       ) : (
        <>
         {result.posts.map((post) => (
          <ThreadCard
            key={post._id}
            id={post._id}
            currentUserId={user.id}
            parentId={post.parentId}
            content={post.text}
            author={post.author}
            community={post.community}
            createdAt={post.createdAt}
            comments={post.children}
           />
         ))}
        </>
       )}
     </section>
    </>
  );
}