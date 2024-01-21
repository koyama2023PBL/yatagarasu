import * as React from 'react';
import ComponentHome from './ComponentHome';
import { Outlet } from 'react-router-dom';


const ComponentRoot: React.FC = () => {
  
  return (
    <div>
      <ComponentHome/>
      <Outlet/>
    </div>
  );
}

export default ComponentRoot;


