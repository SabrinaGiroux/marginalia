import { NavBar } from './NavBar';

export function Header() {
  return (
    <header className="w-full mx-auto p-5 flex items-center justify-between border-b border-[#2a2a2a]">
      <h1 className="text-xl font-semibold text-slate-100 p-1">Marginalia</h1>
      <NavBar />
    </header>
  );
}
