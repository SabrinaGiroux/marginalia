import { NavLink } from 'react-router';
// import BookImg from '../assets/book-shelf-line.png';
// import SettingsImg from '../assets/settings.png';
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
