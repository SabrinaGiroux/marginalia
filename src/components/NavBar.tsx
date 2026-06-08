import { NavLink } from 'react-router';
import { Settings, Library } from 'lucide-react';

export function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li className="flex gap-8">
          <NavLink to="/">
            <Library className="w-7" />
          </NavLink>
          <NavLink to="/settings">
            <Settings className="w-7" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
