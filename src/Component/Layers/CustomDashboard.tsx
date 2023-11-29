import Box from "@mui/material/Box";
import {BreadcrumbsBar} from "../Common/BreadcrumbsBar";
import * as React from "react";

export const CustomDashboard: React.FC = () => {
  return (
    <div>
      <Box sx={{ p: 1, flexDirection: 'column', height: '7vh', alignItems: 'center', marginTop: '-1vh'}}>
        <BreadcrumbsBar/>
      </Box>
      <Box sx={{ p: 1, flexDirection: 'column', marginTop: '1vh', width: '95vw', height: '80vh'}}>
        <iframe
            src="http://localhost:8080/d/000000039/postgresql-database?orgId=1&refresh=10s&fullscreen&kiosk&theme=light"
            width="100%"
            height="100%"
        ></iframe>
      </Box>
    </div>
  );
}
