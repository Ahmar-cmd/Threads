import AccountProfile from '@/components/forms/AccountProfile'
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';

async function page () {
  const user = await currentUser();
  if(!user) return null;
  
  const userInfo = await fetchUser(user.id);
    
    const userData = {
      id: user.id,
      objectId: userInfo?._id,
      username: userInfo ? userInfo?.username : user.username,
      name: userInfo ? userInfo?.name : user.firstName ?? "",
      bio: userInfo ? userInfo?.bio : "",
      image: userInfo ? userInfo?.image : user.imageUrl,
    };
 
  return (
    <main  className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-8'>
     <h1 className='head-text'>Onboarding</h1>
     <p className='mt-1 text-base-regular text-light-2'>
      To use Threads, complete your profile now.
      </p>

     <section className='mt-5 bg-dark-2 p-10'>
      <AccountProfile user={userData} btnTitle="continue"/>
     </section>
    </main>
  )
}

export default page