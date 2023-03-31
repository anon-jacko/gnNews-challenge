import { Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/storeHooks";
import { useNavigateSearch } from "../../hooks/useNavigateSearch";
import { useTranslation } from "react-i18next";

const CategoryNavigationItem = ({ categoryItem }: { categoryItem: string }) => {
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigateSearch();
  const handleChangeGlobalCategory = () => {
    // dispatch(setCategory(categoryItem));
    navigate("", { category: categoryItem });
  };

  return (
    <Button
      onClick={handleChangeGlobalCategory}
      variant={
        categoryItem === currentParams.category ? "contained" : "outlined"
      }
      color="info"
    >
      {/* {categoryItem} */}
      {t(`category.${categoryItem}`)}
    </Button>
  );
};

export default CategoryNavigationItem;
