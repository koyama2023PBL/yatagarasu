import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeMenu from '../Layers/HomeMenu';
import ExploreModeMenu from '../Layers/ExploreModeMenu';
import { CheckModeMenu } from '../Layers/CheckModeMenu';
import { AdvancedModeMenu } from '../Layers/AdvancedModeMenu';
import SettingsMenu from '../Layers/SettingsMenu';
import ServerRoot from '../../Content/Postgresql/Explore/Server/ServerRoot';
import ComponentRoot from '../../Content/Postgresql/Explore/Component/ComponentRoot';
import QueryRoot from '../../Content/Postgresql/Explore/Query/QueryRoot';
import QueryAdvanceHome from '../../Content/Postgresql/Explore/Query/QueryAdvanceHome';
import ExploreRoot from '../../Content/Postgresql/Explore/ExploreRoot';
import QueryHome from '../../Content/Postgresql/Explore/Query/QueryHome';
import OverviewHome from '../../Content/Postgresql/Explore/Overview/OverviewHome';
import ComponentBackend from '../../Content/Postgresql/Explore/Component/ComponentBackend';
import ComponentHome from '../../Content/Postgresql/Explore/Component/ComponentHome';


const renderRoutes = () => (
  <Routes>
    <Route path="" element={<HomeMenu/>} />
    <Route path="check" element={<CheckModeMenu/>}/>
    <Route path="advanced">
      <Route index element={<AdvancedModeMenu/>}/>
    </Route>
    <Route path="settings" element={<SettingsMenu/>}/>

    <Route path="explore" element={<ExploreModeMenu />}>
      <Route index element={<ExploreRoot />} />
      <Route path="server" element={<ServerRoot/>} />
      <Route path="component" />
        <Route index={true} element={<ComponentHome />} />
        <Route path="backend-process" element={<ComponentBackend />} />
      <Route path="query" >
        <Route index={true} element={<QueryHome />} />
        <Route path="advanced" element={<QueryAdvanceHome />} />
      </Route>
      <Route path="overview" element={<OverviewHome />} />
    </Route>
  </Routes>
);

export default renderRoutes;
