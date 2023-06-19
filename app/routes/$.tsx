import { Link } from '@remix-run/react';

const splatRoute = () => {
  return (
    <div className='container h-full mx-auto p-4'>
      <p className='font-semibold text-lg text-red-500 mb-4'>Page not found</p>
      <Link
        to='/'
        className='text-white bg-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
      >
        Go home
      </Link>
    </div>
  );
};
export default splatRoute;
