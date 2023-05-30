import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#455a64",
    },
    secondary: {
      main: "#eceff1",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
