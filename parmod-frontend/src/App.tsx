import React,  {useState} from 'react';
import { Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import DesignsListPage from './components/DesignsListPage';
import { LoggedUser } from './types';

const App = () => {
  const [user, setUser] = useState<LoggedUser>(null);
    
  return (
    <div>
      <NavBar user={user}/>
      <Routes>
        <Route path='/' element={<>home</>} />
        <Route path='/login' element={<>login</>} />
        <Route path='/register' element={<>register</>} />
        <Route path='/best-designs' element={<DesignsListPage/>} />
        <Route path='/recent-designs' element={<DesignsListPage/>} />
        <Route path='/add-design' element={<>add-design</>} />
      </Routes>
    </div>
  );
};

export default App;
