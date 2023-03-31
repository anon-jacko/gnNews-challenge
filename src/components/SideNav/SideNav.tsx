import { Box } from "@mui/material";
import SideNavItem from "./SideNavItem";
import { countriesList } from "../../utils/constants/countries";

const SideNav = () => {
  return (
    <Box>
      {countriesList.map((country) => (
        <SideNavItem key={country.code} country={country} />
      ))}
    </Box>
  );
};

export default SideNav;
