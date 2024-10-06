import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:underline">Home</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;