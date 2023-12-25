import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeMenu from '../Layers/HomeMenu';
import ExploreModeMenu from '../Layers/ExploreModeMenu';
import { CheckModeMenu } from '../Layers/CheckModeMenu';
import { CustomDashboard } from '../Layers/CustomDashboard';
import SettingsMenu from '../Layers/SettingsMenu';
import ServerRoot from '../../Content/Postgresql/Explore/Server/ServerRoot';
import ComponentRoot from '../../Content/Postgresql/Explore/Component/ComponentRoot';
import QueryRoot from '../../Content/Postgresql/Explore/Query/QueryRoot';
import QueryAdvanceHome from '../../Content/Postgresql/Explore/Query/QueryAdvanceHome';
import ExploreRoot from '../../Content/Postgresql/Explore/ExploreRoot';
import QueryHome from '../../Content/Postgresql/Explore/Query/QueryHome';
import WelcomeExplore from '../../Content/Postgresql/Explore/Welcome/WelcomeExplore';
import OverviewHome from '../../Content/Postgresql/Explore/Overview/OverviewHome';



const renderRoutes = () => (
  <Routes>
    <Route path="/" element={<HomeMenu/>} />
    <Route path="/check" element={<CheckModeMenu/>}/>
    <Route path="/advance" element={<CustomDashboard/>}/>
    <Route path="/settings" element={<SettingsMenu/>}/>

    <Route path="explore" element={<ExploreModeMenu />}>
      <Route index element={<ExploreRoot />} />
      <Route path="server" element={<ServerRoot />} />
      <Route path="component" element={<ComponentRoot />} />
      <Route path="query" >
        <Route index={true} element={<QueryHome />} />
        <Route path="advance" element={<QueryAdvanceHome />} />
      </Route>
      <Route path="overview" element={<OverviewHome />} />
    </Route>
  </Routes>
);

export default renderRoutes;