import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useSearchParams } from "react-router-dom";
import { useNavigateSearch } from "../../hooks/useNavigateSearch";
import { categoriesList } from "../../utils/constants/category";

const CategorySelect = () => {
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  const navigate = useNavigateSearch();
  const handleChangeGlobalCategory = (e: SelectChangeEvent) => {
    navigate("", { category: e.target.value });
  };
  // useEffect(() => {
  //   setSelectedCategory(currentParams.category);
  // }, []);
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentParams.category || ""}
        label="Country"
        onChange={(e) => handleChangeGlobalCategory(e)}
      >
        {categoriesList.map((categoryItem) => (
          <MenuItem key={categoryItem} value={categoryItem}>
            {categoryItem.toUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
