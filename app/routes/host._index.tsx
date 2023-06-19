import React from 'react';
import { Link, Await, useLoaderData } from '@remix-run/react';
import { defer } from '@remix-run/node';
import type { LoaderArgs } from '@remix-run/node';
import type { Van } from '~/models/van.server';
import { getHostVans } from '~/models/van.server';
import { Rating } from 'flowbite-react';
import { getUsername, requireAuth } from '~/utils.server';

export async function loader(args: LoaderArgs) {
  const userId = await requireAuth(args);
  const username = await getUsername(userId);
  return defer({ vans: getHostVans(userId), username });
}

type VanElements = Omit<Van, 'createdAt' | 'updatedAt'>;

export default function Dashboard() {
  const loaderData = useLoaderData<typeof loader>();

  function renderVanElements(vans: VanElements[]) {
    const hostVansEls = vans?.map((van) => (
      <div
        className='flex items-center mb-4 py-4 px-6 border border-orange-200 rounded'
        key={van.id}
      >
        <img
          src={van.imageUrl}
          alt={`${van.name}`}
          className='rounded h-20 mr-4'
        />
        <div className='mr-auto'>
          <h3 className='text-xl font-semibold my-2'>{van.name}</h3>
          <p className=''>${van.price}/day</p>
        </div>
        <Link
          to={`vans/${van.id}`}
          className='p-2'
        >
          View
        </Link>
      </div>
    ));

    return (
      <div className='flex flex-col'>
        <section>{hostVansEls}</section>
        <Link
          to='new'
          className='self-end mt-2 text-white bg-[#f3761b] hover:bg-[#f3761b]/80 focus:ring-4 focus:outline-none focus:ring-[#f3761b]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  dark:hover:bg-[#f3761b]/80 dark:focus:ring-[#f3761b]/40'
        >
          Add a van
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 ml-2 -mr-1'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className='flex justify-between items-center flex-wrap px-2 py-8 sm:p-8 bg-[#ffead0]'>
        <div className=''>
          <h1 className='text-4xl font-bold'>
            {loaderData.username
              ? `Welcome, ${loaderData.username}`
              : 'Welcome'}
            !
          </h1>
          <p className='text-neutral-700 my-4'>
            Income last{' '}
            <span className='text-neutral-700 font-bold underline'>
              30 days
            </span>
          </p>
          <h2 className='text-4xl font-black'>$2,260</h2>
        </div>
        <Link
          to='income'
          className='p-2 hover:underline'
        >
          Details
        </Link>
      </section>
      <section className='flex flex-wrap items-center px-2 py-8 sm:p-8 bg-[#ffddb2]'>
        <h2 className='text-2xl font-bold'>Review score</h2>
        <Rating className='mr-auto'>
          <Rating.Star className='ml-3 w-8 h-8' />
          <p className='ml-2 text-xl font-bold text-gray-900 dark:text-white'>
            5
          </p>
          <span className='mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400' />
          <Link
            to='reviews'
            className='text-base font-medium text-gray-900 underline hover:no-underline dark:text-white'
          >
            2 reviews
          </Link>
        </Rating>
        <Link
          to='reviews'
          className='p-2 hover:underline'
        >
          Details
        </Link>
      </section>
      <section className='py-8 px-0 sm:p-8'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold my-4'>Your listed vans</h2>
          <Link
            to='vans'
            className='p-2 hover:underline'
          >
            View all
          </Link>
        </div>
        <React.Suspense fallback={<h3>Loading...</h3>}>
          <Await
            resolve={loaderData.vans}
            errorElement={<p className='text-red-500'>Error loading vans</p>}
          >
            {renderVanElements}
          </Await>
        </React.Suspense>
      </section>
    </>
  );
}
