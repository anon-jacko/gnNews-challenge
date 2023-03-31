import { Box } from "@mui/material";
import CategoryNavigationItem from "./CategoryNavigationItem";
import { categoriesList } from "../../utils/constants/category";

const CategoryNavigation = () => {
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexWrap: "wrap",
        gap: "12px",
        justifyContent: "center",
      }}
    >
      {categoriesList.map((categoryItem) => (
        <CategoryNavigationItem
          categoryItem={categoryItem}
          key={categoryItem}
        />
      ))}
    </Box>
  );
};

export default CategoryNavigation;
