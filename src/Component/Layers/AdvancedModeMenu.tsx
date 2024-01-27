import Box from "@mui/material/Box";
import {BreadcrumbsBar} from "../Common/BreadcrumbsBar";
import * as React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../Redux/StateStore";
import {useSettings} from "../Common/SettingsContext";

export const AdvancedModeMenu: React.FC = () => {
  const dashboardUrls = useSettings()?.grafana.dashboard_urls;
  const { from, to } = useSelector((state: RootState) => state.date);
  const starttime = new Date(from);
  const endtime   = new Date(to);

  const dashboardBox = (url: string) => {
    return (
      <Box sx={{ p: 1, flexDirection: 'column', marginTop: '1vh', width: '95vw', height: '80vh' }}>
        <iframe
          src={url + `&refresh=10s&fullscreen&kiosk&theme=light&from=${starttime.getTime()}&to=${endtime.getTime()}`}
          width="100%"
          height="100%"
        ></iframe>
      </Box>
    )
  }

  return (
    <div>
      <Box sx={{ p: 1, flexDirection: 'column', height: '7vh', alignItems: 'center', marginTop: '-1vh'}}>
        <BreadcrumbsBar/>
      </Box>
      {dashboardUrls?.map((url) => dashboardBox(url))}
    </div>
  );
}
