import { NavLink, Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';

const links = [
  { to: '/', label: 'HOME', end: true },
  { to: '/experience', label: 'EXPERIENCE' },
  { to: '/projects', label: 'PROJECTS' },
  { to: '/contact', label: 'CONTACT' },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md h-24 flex items-center justify-between px-6 md:px-12 border-b border-black/5 bg-[#f2f2f2]/80">
      <Link to="/" className="flex items-center gap-2 font-black text-lg tracking-tighter uppercase select-none">
        <Code2 className="w-5 h-5" />
        dev
      </Link>

      <div className="hidden md:flex gap-10 text-xs font-bold tracking-widest uppercase">
        {links.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `relative group transition-colors ${isActive ? 'text-black' : 'text-zinc-500 hover:text-black'}`
            }
          >
            {({ isActive }) => (
              <>
                {label}
                <span
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-4 left-0 w-full h-0.5 bg-black" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <a
        href="/assets/resume3.pdf"
        target="_blank"
        rel="noreferrer"
        className="bg-black text-white px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors"
      >
        RÉSUMÉ ↗
      </a>
    </nav>
  );
}
