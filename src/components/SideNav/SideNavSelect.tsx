import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigateSearch } from "../../hooks/useNavigateSearch";
import { useAppDispatch } from "../../hooks/storeHooks";
import { countriesList } from "../../utils/constants/countries";
import { setCountryCurrency } from "../../features/news/newsSlice";

const SideNavSelect = () => {
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  const { code } = useParams();
  const navigate = useNavigateSearch();
  const dispatch = useAppDispatch();
  const handleChangeGlobalCountry = (e: SelectChangeEvent) => {
    navigate(`/country/${e.target.value}`, currentParams);
    dispatch(setCountryCode(e.target.value));
    const index = countriesList.findIndex(
      (country) => country.code === e.target.value
    );
    dispatch(setCountryCurrency(countriesList[index].currencyCode));
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Country</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={code || ""}
        label="Country"
        onChange={(e) => handleChangeGlobalCountry(e)}
      >
        {countriesList.map((country) => (
          <MenuItem
            key={country.code}
            value={country.code}
            sx={{ display: "flex" }}
          >
            <img
              src={`https://flagcdn.com/20x15/${country.code}.png`}
              alt={`${country.name} flag`}
            />
            {country.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SideNavSelect;
function setCountryCode(value: string): any {
  throw new Error("Function not implemented.");
}
