import { NavLink } from 'react-router';
import BookImg from '../assets/book-shelf-line.png';

export function NavBar() {
  return (
    <nav className="px-5">
      <ul>
        <li>
          <NavLink to="/">
            <img src={BookImg} alt="Book Icon" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
