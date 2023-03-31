import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { fetchSearchSources } from "../features/news/newsActions";
import AdvancedSearchBar from "../components/AdvancedSearchBar";
import NewsContainer from "../components/NewsContainers/StandardNewsContainer";
import { Box, Typography } from "@mui/material";

const SearchPage = () => {
  const dispatch = useAppDispatch();
  const { articles } = useAppSelector((store) => store.news);
  // const [searchParams] = useSearchParams();
  // const currentParams = Object.fromEntries([...searchParams]);

  // tutaj coś nie śmiga, bo nie powinno ładować elementów z głównego sluga, osobny state może jakiś

  useEffect(() => {
    dispatch(fetchSearchSources());
  }, []);

  return (
    <Box>
      <Typography>SearchPage</Typography>
      <AdvancedSearchBar />
      <NewsContainer news={articles} />
    </Box>
  );
};

export default SearchPage;
