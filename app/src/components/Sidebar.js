import './Sidebar.css'
import logo from '../img/logo.png'

function Sidebar({ setCurrentPage }) {
  return (
    <div className="sidebar">
        <img className='logo' src={logo}></img>
        <div className='sidebarButtonContainer'>
          <button onClick={() => setCurrentPage('Dashboard')} className='sidebarButton'>Dashboard</button>
          <button onClick={() => setCurrentPage('Ingredients')} className='sidebarButton'>Ingredients</button>
          <button onClick={() => setCurrentPage('Recipes')} className='sidebarButton'>Recipes</button>
          <button onClick={() => setCurrentPage('Account')} className='sidebarButton'>Account</button>
        </div>
    </div>
  );
}

export default Sidebar;
