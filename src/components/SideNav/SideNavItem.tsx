import { Button, Typography } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/storeHooks";
import { useNavigateSearch } from "../../hooks/useNavigateSearch";
import { setCountryCurrency } from "../../features/news/newsSlice";
import { SideNavItemProps } from "../../interfaces/newsInterfaces";

const SideNavItem = ({ country }: SideNavItemProps) => {
  const { code } = useParams();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  const navigate = useNavigateSearch();
  const handleChangeGlobalCountry = () => {
    navigate(`/country/${country.code}`, currentParams);
    dispatch(setCountryCode(country.code));
    dispatch(setCountryCurrency(country.currencyCode));
  };
  return (
    <Button
      fullWidth
      color="info"
      onClick={handleChangeGlobalCountry}
      variant={code === country.code ? "contained" : "outlined"}
      sx={{ marginBottom: 1,display:'flex', justifyContent:'flex-start' }}
    >
      <img
        src={`https://flagcdn.com/20x15/${country.code}.png`}
        alt={`${country.name} flag`}
      />
      <Typography variant="body2" sx={{ marginLeft: 1 }}>{country.name}</Typography>
    </Button>
  );
};

export default SideNavItem;

function setCountryCode(code: string): any {
  throw new Error("Function not implemented.");
}
