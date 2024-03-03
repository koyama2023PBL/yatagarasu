import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomeMenu from '../Layers/HomeMenu';
import ExploreModeMenu from '../Layers/ExploreModeMenu';
import { CheckModeMenu } from '../Layers/CheckModeMenu';
import { AdvancedModeMenu } from '../Layers/AdvancedModeMenu';
import SettingsMenu from '../Layers/SettingsMenu';
import ServerRoot from '../../Content/Postgresql/Explore/Server/ServerRoot';
import QueryAdvanceHome from '../../Content/Postgresql/Explore/Query/QueryAdvanceHome';
import ExploreRoot from '../../Content/Postgresql/Explore/ExploreRoot';
import QueryHome from '../../Content/Postgresql/Explore/Query/QueryHome';
import OverviewHome from '../../Content/Postgresql/Explore/Overview/OverviewHome';
import ComponentBackend from '../../Content/Postgresql/Explore/Component/ComponentBackend';
import ComponentHome from '../../Content/Postgresql/Explore/Component/ComponentHome';
import ComponentRoot from '../../Content/Postgresql/Explore/Component/ComponentRoot';
import SvgExploreComponentPostgresprocess from '../../Content/Postgresql/SVGs/ReactComponent/Components/ExploreComponentPostgresprocess';
import ComponentPostgresProcess from '../../Content/Postgresql/Explore/Component/ComponentPostgresProcess';
import ComponentPostgresFile from '../../Content/Postgresql/Explore/Component/ComponentPostgresFile';


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
      <Route path="component">
        <Route index={true} element={<ComponentRoot />} />
        <Route path="backend-process" element={<ComponentBackend />} />
        <Route path="postgres-process" element={<ComponentPostgresProcess />} />
        <Route path="postgres-file" element={<ComponentPostgresFile />} />
      </Route>
      <Route path="query" >
        <Route index={true} element={<QueryHome />} />
        <Route path="advanced" element={<QueryAdvanceHome />} />
      </Route>
      <Route path="overview" element={<OverviewHome />} />
    </Route>
  </Routes>
);

export default renderRoutes;
