import './App.css'
import Recipes from './screens/Recipes'
import Dashboard from './screens/Dashboard'
import Ingredients from './screens/Ingredients'
import Account from './screens/Account'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { useState } from 'react';


function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard');

  function getCurrentPage() {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard />
      case 'Ingredients':
        return <Ingredients />
      case 'Recipes':
        return <Recipes />
      case 'Account':
        return <Account />
    }
  }

  return (
    <div className="outerContainer">
      <Sidebar setCurrentPage={setCurrentPage}></Sidebar>
      <div className="innerContainer">
        <Header></Header>
        {getCurrentPage()}
      </div>
    </div>
  );
}

export default App;
