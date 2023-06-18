import { Link } from '@remix-run/react';

export default function FooterComponent() {
  const footerLinks = [
    ['About', '/about'],
    ['Project Source', 'https://github.com/anthonypz/vanLife'],
    ['My Github', 'https://github.com/anthonypz'],
  ];

  return (
    <footer className='bg-neutral-900 text-neutral-400 font-medium rounded-none p-5 flex flex-col sm:flex-row justify-between'>
      <div className='p-2'>
        &#169; {new Date().getFullYear()} VANLIFE&#8482;
      </div>
      <div className='flex flex-col'>
        {footerLinks.map(([text, link]) => (
          <Link
            key={text}
            className='hover:underline p-2'
            to={link}
          >
            {text}
          </Link>
        ))}
      </div>
    </footer>
  );
}
