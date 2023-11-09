import './Sidebar.css'
import logo from '../img/logo.png'
import { Link } from 'react-router-dom';

function Sidebar({ setCurrentPage }) {
  return (
    <div className="sidebar">
        <img className='logo' src={logo}></img>
        <div className='sidebarButtonContainer'>
          <Link to = '/dashboard' className='sidebarButton'>Dashboard </Link>
          <Link to = '/ingredients' className='sidebarButton'>Ingredients </Link>
          <Link to = '/recipes' className='sidebarButton'>Recipes</Link>
          <Link to = '/account' className='sidebarButton'>Account</Link>
        </div>
    </div>
  );
}

export default Sidebar;
