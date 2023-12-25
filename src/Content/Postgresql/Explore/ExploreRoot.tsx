import * as React from 'react';
import WelcomeRoot from './Welcome/WelcomeRoot';
import { useSyncQueryString } from '../../../Component/Common/DateUpdate';
import { Outlet } from 'react-router-dom';


const ExploreRoot: React.FC = () => {

  useSyncQueryString();
  
  return (
    <div>
      <WelcomeRoot />
    </div>
  );
}

export default ExploreRoot;


