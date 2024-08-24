import AccountProfile from '@/components/forms/AccountProfile'
import { currentUser } from '@clerk/nextjs/server';


async function page () {
  const user = await currentUser();
  if(!user) return null;
  // if(user) console.log(user);
  
  const userInfo = {
    _id: "abc",
  };
  const userData = {
    id: user?.id ?? "defaultId",
    objectId: userInfo?._id,
    username: user?.username ?? "",
    name: user?.firstName ?? "",
    bio: "",
    image: user?.imageUrl ?? ""
  }
 

  // const userData = {
  //   id: user?.id,
  //   objectId: userInfo?._id,
  //   username: userInfo? userInfo?.username : user?.username,
  //   name: userInfo? userInfo?.name : user?.firstName ?? "",
  //   bio: userInfo ? userInfo?.bio : "",
  //   image: userInfo ? userInfo?.image : user?.imageUrl,
  // };

  return (
    <main  className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
     <h1 className='head-text'>Onboarding</h1>
     <p className='mt-3 text-base-regular text-light-2'>
        Complete your profile now, to use Threds.
      </p>

     <section className='mt-9 bg-dark-2 p-10'>
      <AccountProfile user={userData} btnTitle="continue"/>
     </section>
    </main>
  )
}

export default page