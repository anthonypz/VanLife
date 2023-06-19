import { Link, NavLink } from '@remix-run/react';
import { useUser, UserButton } from '@clerk/remix';

export default function Header() {
  const { isSignedIn } = useUser();

  const activeStyles = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  };

  const links = ['Host', 'About', 'Vans'];
  const signInLinks = ['Sign in', 'Sign up'];

  return (
    <header className='bg-[#fff7ed]'>
      <nav className='flex items-center justify-between flex-wrap p-3'>
        <Link
          className='whitespace-nowrap text-2xl font-black uppercase hover:underline mr-2'
          to='/'
        >
          #VanLife
        </Link>
        <div className='flex flex-wrap items-center'>
          {links.map((link) => (
            <NavLink
              key={link}
              className='text-slate-600 font-semibold hover:text-slate-800 hover:underline text-base p-2'
              to={link.toLowerCase()}
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              {link}
            </NavLink>
          ))}
          {isSignedIn ? (
            <div className='p-2'>
              <UserButton afterSignOutUrl='/' />
            </div>
          ) : (
            <>
              {signInLinks.map((link) => (
                <NavLink
                  key={link}
                  className='py-1.5 px-3 text-base font-semibold text-center text-[#fff7ed] rounded-md bg-neutral-800 hover:bg-black/80 focus:ring-4 focus:ring-black/50 ml-2'
                  to={link.split(' ').join('-').toLowerCase()}
                  // style={({ isActive }) =>
                  //   isActive ? activeStyles : undefined
                  // }
                >
                  {link}
                </NavLink>
              ))}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
