import { NavBar } from './NavBar';
import { NavLink } from 'react-router';

export function Header() {
  return (
    <header className="w-full h-[10vh] mx-auto p-5 flex items-center justify-between border-b border-[#2a2a2a]">
      <NavLink to="/">
        <h1 className="text-xl font-semibold text-slate-100 p-1">Marginalia</h1>
      </NavLink>

      <NavBar />
    </header>
  );
}
