import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchSearchSources,
  fetchTopHeadlinesNews,
  fetchVideoArticles,
  fetchByQueryAndFilters,
  fetchCurrencyRates,
  getUserCountry,
} from "./newsActions";

import {
  CurrencyRatesType,
  News,
  SearchSource,
} from "../../interfaces/newsInterfaces";

interface NewsState {
  articles: News[];
  isLoading: boolean;
  isLoadingVideos: boolean;
  countryCode: string;
  savedArticles: News[];
  viewOption: "tiles" | "list";
  userCountry: string;
  countryCurrency: string;
  currencyRates: CurrencyRatesType;
  modalNews: News | null;
  searchSources: SearchSource[];
  videoArticles: News[];
}

const initialState: NewsState = {
  articles: [],
  isLoading: false,
  isLoadingVideos: false,
  viewOption: "tiles",
  userCountry: "",
  countryCode: "",
  countryCurrency: "",
  savedArticles: [],
  currencyRates: {},
  modalNews: null,
  searchSources: [],
  videoArticles: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setViewOption(state, action: PayloadAction<"tiles" | "list">) {
      state.viewOption = action.payload;
    },
    setCountryCurrency(state, action: PayloadAction<string>) {
      state.countryCurrency = action.payload;
    },
    setCountryCode(state, action: PayloadAction<string>) {
      state.countryCode = action.payload;
    },
    setModalNews(state, action: PayloadAction<News | null>) {
      state.modalNews = action.payload;
    },
    toggleSaveArticle(state, action: PayloadAction<News>) {
      const newsItem = action.payload;
      const existingItemIndex = state.savedArticles.findIndex(
        (item) => item.url === newsItem.url
      );

      if (existingItemIndex !== -1) {
        state.savedArticles.splice(existingItemIndex, 1);
      } else {
        state.savedArticles.push(newsItem);
      }

      localStorage.setItem(
        "savedArticles",
        JSON.stringify(state.savedArticles)
      );
    },
    loadSavedArticles: (state) => {
      const savedArticles = localStorage.getItem("savedArticles");
      if (savedArticles?.length) {
        state.savedArticles = JSON.parse(savedArticles);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTopHeadlinesNews.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTopHeadlinesNews.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.articles = payload.articles;
    });
    builder.addCase(fetchTopHeadlinesNews.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchByQueryAndFilters.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchByQueryAndFilters.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.articles = payload.articles;
    });
    builder.addCase(fetchByQueryAndFilters.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchVideoArticles.pending, (state) => {
      state.isLoadingVideos = true;
    });
    builder.addCase(fetchVideoArticles.fulfilled, (state, { payload }) => {
      state.isLoadingVideos = false;
      state.videoArticles = payload.articles;
    });
    builder.addCase(fetchVideoArticles.rejected, (state) => {
      state.isLoadingVideos = false;
    });
    builder.addCase(fetchSearchSources.fulfilled, (state, { payload }) => {
      state.searchSources = payload.sources;
    });
    builder.addCase(fetchCurrencyRates.fulfilled, (state, { payload }) => {
      state.currencyRates = payload.rates;
    });
    builder.addCase(getUserCountry.fulfilled, (state, { payload }) => {
      state.userCountry = payload.country_code.toLowerCase();
      state.countryCurrency = payload.currency;
    });
  },
});

export const {
  setCountryCode,
  setCountryCurrency,
  setModalNews,
  setViewOption,
  toggleSaveArticle,
  loadSavedArticles,
} = newsSlice.actions;

export default newsSlice.reducer;
