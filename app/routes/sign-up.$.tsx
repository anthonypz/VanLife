import { SignUp } from '@clerk/remix';

export default function SignUpPage() {
  return (
    <div className='flex justify-center items-center py-8 px-6'>
      <SignUp
        routing={'path'}
        path={'/sign-up'}
      />
    </div>
  );
}
