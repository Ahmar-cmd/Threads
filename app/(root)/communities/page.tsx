import CommunityCard from "@/components/cards/CommunityCard";
import Searchbar from "@/components/shared/Searchbar";
import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async ({
  searchParams
}:{
  searchParams : {[key: string]: string | undefined} 
}) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchCommunities({
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 20,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Communities</h1>
      
      <Searchbar routeType="communities"/>

      <div className="className='mt-14 flex flex-col gap-9'">
        {result.communities.length === 0 ? (
          <p className="no-result">No Result</p>
        ) : (
          <>
            {result.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default page;