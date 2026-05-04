import { NavLink } from 'react-router';
import BookImg from '../assets/book-shelf-line.png';
import SettingsImg from '../assets/settings.png';

export function NavBar() {
  return (
    <nav className="px-5">
      <ul>
        <li className="flex gap-8">
          <NavLink to="/">
            <img src={BookImg} className="w-7" alt="Book Icon" />
          </NavLink>
          <NavLink to="/settings">
            <img src={SettingsImg} className="w-7" alt="Settings Icon" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
