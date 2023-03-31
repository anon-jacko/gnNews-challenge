import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import {
  fetchCurrencyRates,
  fetchTopHeadlinesNews,
  fetchVideoArticles,
} from "../features/news/newsActions";
import CategoryNavigation from "../components/CategoryNavigation/CategoryNavigation";
import CategorySelect from "../components/CategoryNavigation/CategoryNavigationSelelect";
import SideNavSelect from "../components/SideNav/SideNavSelect";
import SideNav from "../components/SideNav/SideNav";
import MainCarousel from "../components/NewsContainers/MainCarousel";
import PopularPosts from "../components/NewsContainers/PopularPostsCarousel";
import CurrencyRatesContainer from "../components/CurrencyRates/CurrencyRatesContainer";
import VideoPosts from "../components/NewsContainers/VideoNewsCarousel";
import NewsContainer from "../components/NewsContainers/StandardNewsContainer";

const HomePage = () => {
  const { articles, countryCurrency, countryCode, userCountry, videoArticles } =
    useAppSelector((store) => store.news);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { category } = Object.fromEntries([...searchParams]);

  useEffect(() => {
    dispatch(
      fetchTopHeadlinesNews({
        countryCode: countryCode || userCountry,
        category,
      })
    );
    dispatch(fetchVideoArticles({}));
    dispatch(fetchCurrencyRates(countryCurrency));
  }, [countryCode, category, userCountry]);

  useEffect(() => {
    dispatch(fetchCurrencyRates(countryCurrency));
  }, [countryCode]);

  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Grid item sm={12} sx={{ display: { xs: "none", md: "block" } }}>
          <CategoryNavigation />
        </Grid>
        <Grid
          item
          container
          spacing={2}
          xs={12}
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <Grid item xs={6}>
            <CategorySelect />
          </Grid>
          <Grid item xs={6}>
            <SideNavSelect />
          </Grid>
        </Grid>
        <Grid item md={3} lg={2} sx={{ display: { xs: "none", md: "block" } }}>
          <SideNav />
        </Grid>
        {/* Jeżeli nie ma category, to wyświetla się CurrencyRatesContainer */}
        {/* Jeżeli nie ma query to wyświetla się górna karuzela */}
        <Grid item xs={12} md={9} lg={10}>
          {/* jeżel mobile view to tylko karuzela bez tych dodatkowych */}
          {articles?.length && <MainCarousel news={articles} />}
          {articles?.length && <PopularPosts news={articles} />}
          <CurrencyRatesContainer />
          {videoArticles?.length && <VideoPosts news={videoArticles} />}

          {/* To poniżej wyświetlane tylko jeżeli jest to mobile view */}
          <Typography variant="h4" sx={{ textAlign: "start" }}>
            Other posts
          </Typography>
          {articles?.length && <NewsContainer news={articles} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
