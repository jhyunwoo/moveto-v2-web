import SignOutButton from '@/components/sign-out-button';
import { auth } from '@/auth';

export default async function ProfilePage() {
  const session = await auth();
  return (
    <div className={'text-white flex flex-col items-center justify-center min-h-screen'}>
      <div className={'text-2xl font-bold'}>Profile Page</div>
      <div>
        <div>{session?.user?.name}</div>
        <div>{session?.user?.email}</div>
      </div>
      <SignOutButton />
    </div>
  );
}
