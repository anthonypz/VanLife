import type { V2_MetaFunction } from '@remix-run/react';
import { Link } from 'react-router-dom';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Van Life' }];
};

export default function Index() {
  return (
    <section className="bg-center bg-[url('https://res.cloudinary.com/dyt5tdxun/image/upload/f_auto,q_auto/v1681872321/home-hero_qnsylh.png')] bg-cover bg-no-repeat bg-gray-500 text-[#fff7ed] bg-blend-multiply">
      <div className='px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56'>
        <h1 className='mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl'>
          You got the travel plans, we got the travel vans.
        </h1>
        <p className='mb-8 text-lg font-normal lg:text-xl sm:px-16 lg:px-48'>
          Add adventure to your life by joining the #vanlife movement. Rent the
          perfect van to make your perfect road trip.
        </p>
        <div className='flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4'>
          <Link
            to='vans'
            className='inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-[#f3761b] hover:bg-[#f3761b]/80 focus:ring-4 focus:ring-[#f3761b]/40 dark:focus:ring-[#f3761b]/40'
          >
            Find your vans
            <svg
              aria-hidden='true'
              className='ml-2 -mr-1 w-4 h-4'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                clipRule='evenodd'
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
