import React,  {useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import DesignsListPage from './components/DesignsListPage';
import LoginPage from './components/LoginPage';
import LogoutPage from './components/LogoutPage';
import RegisterPage from './components/RegisterPage';
import AddNewDesignPage from './components/AddNewDesignPage';
import DesignDetailsPage from './components/DesignDetailsPage';
import UserDetailsPage from './components/UserDetailsPage';
import EditUserPage from './components/EditUserPage';
import EditDesignPage from './components/EditDesignPage';
import FeedPage from './components/FeedPage';
import { LoggedUser } from './types';
import { setToken } from './services/token';

const App = () => {
  const [user, setUser] = useState<LoggedUser>(null);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUserParmod');
    const token = window.localStorage.getItem('tokenParmod');
    if (loggedUser && token) {
      const user = JSON.parse(loggedUser) as LoggedUser;
      setUser(user);
      setToken(token.replaceAll('"',''));
    }
  }, []);
    
  return (
    <div>
      <NavBar user={user}/>
      <Routes>
        <Route path='/' element={<FeedPage/>} />
        <Route path='/login' element={<LoginPage setUser={setUser}/>} />
        <Route path='/logout' element={<LogoutPage setUser={setUser}/>} />
        <Route path='/register' element={<RegisterPage setUser={setUser}/>} />
        <Route path='/best-designs' element={<DesignsListPage type="best"/>} />
        <Route path='/recent-designs' element={<DesignsListPage type="recent"/>} />
        <Route path='/add-design' element={<AddNewDesignPage />} />
        <Route path='/design/:id' element={<DesignDetailsPage loggedUser={user}/>} />
        <Route path='/edit-design/:id' element={<EditDesignPage/>} />
        <Route path='/user/:id' element={<UserDetailsPage loggedUser={user}/>} />
        <Route path='/edit-user/:id' element={<EditUserPage loggedUser={user} setLoggedUser={setUser}/>} />
      </Routes>
    </div>
  );
};

export default App;
