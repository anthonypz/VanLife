import { Link } from '@remix-run/react';

export default function Index() {
  return (
    <>
      <section className='pt-8 px-4 mx-auto max-w-screen-lg lg:pt-16'>
        <img
          src='https://res.cloudinary.com/dyt5tdxun/image/upload/f_auto,q_auto/v1681872320/about-hero_u972aw.png'
          className='rounded'
          alt='man camping in his van'
        />
        <h1 className='text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold my-6'>
          Don’t squeeze in a sedan when you could relax in a van.
        </h1>
        <p className='text-lg font-normal text-gray-600 mb-5'>
          Our mission is to enliven your road trip with the perfect travel van
          rental. Our vans are recertified before each trip to ensure your
          travel plans can go off without a hitch. (Hitch costs extra 😉)
        </p>
        <p className='text-lg font-normal text-gray-600 mb-5'>
          Our team is full of vanlife enthusiasts who know firsthand the magic
          of touring the world on 4 wheels.
        </p>
      </section>
      <section className=''>
        <div className='py-8 px-4 mx-auto max-w-screen-lg lg:py-16'>
          <div className='bg-[#ffcc8d] border border-gray-100 rounded-lg p-8 md:p-12 mb-8'>
            <h2 className='text-gray-900 text-3xl md:text-5xl font-bold mb-3'>
              Your destination is waiting.
              <br />
              Your van is ready.
            </h2>
            <Link
              to='/vans'
              className='inline-flex justify-center items-center py-2.5 px-5 mt-2 text-base font-bold text-center text-[#fff7ed] rounded-lg bg-black hover:bg-black/80 focus:ring-4 focus:ring-black/50'
            >
              Explore our vans
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
    </>
  );
}
