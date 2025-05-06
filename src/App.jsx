import React, { useState } from 'react';
import {Outlet} from 'react-router-dom';
import Main from './components/Main';
import { Link } from 'react-router-dom'


const App = () => {
  return (
    <div>
       <Main />
      <Outlet/>
    </div>
  );
};

export default App;