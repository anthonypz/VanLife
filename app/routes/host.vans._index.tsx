import React from 'react';
import { Link, useLoaderData, Await } from '@remix-run/react';
import { defer } from '@remix-run/node';
import type { LoaderArgs } from '@remix-run/node';
import type { Van } from '~/models/van.server';
import { getHostVans } from '~/models/van.server';
import { requireAuth } from '~/utils.server';

export async function loader(args: LoaderArgs) {
  const userId = await requireAuth(args);

  return defer({ vans: getHostVans(userId) });
}

type VanElements = Omit<Van, 'createdAt' | 'updatedAt'>;

export default function HostVans() {
  const dataPromise = useLoaderData();

  function renderVanElements(vans: VanElements[]) {
    const hostVansEls = vans.map((van) => (
      <Link
        to={van.id}
        key={van.id}
      >
        <div
          className='flex items-center mb-4 py-4 px-6 border border-orange-200 rounded ss'
          key={van.id}
        >
          <img
            src={van.imageUrl}
            alt={`${van.name}`}
            className='rounded h-20 mr-4'
          />
          <div className='host-van-info'>
            <h3 className='text-xl font-semibold my-2'>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        </div>
      </Link>
    ));
    return (
      <div className='host-vans-list'>
        <section>{hostVansEls}</section>
      </div>
    );
  }

  return (
    <section className='flex flex-col'>
      <h1 className='font-bold text-3xl mb-8'>Your listed vans</h1>
      <React.Suspense fallback={<h2>Loading vans...</h2>}>
        <Await
          resolve={dataPromise.vans}
          errorElement={<p className='text-red-500'>Error loading vans</p>}
        >
          {renderVanElements}
        </Await>
      </React.Suspense>
      <Link
        to='/host/new'
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
    </section>
  );
}
