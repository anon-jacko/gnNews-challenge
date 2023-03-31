import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AdvancedSearchRequest,
  CurrencyRatesResponse,
  NewsResponse,
  SearchSourcesResponse,
  TopHeadlinesRequest,
  UserDataResponse,
} from "../../interfaces/newsInterfaces";

export const getUserCountry = createAsyncThunk<UserDataResponse>(
  "user/getUserCountry",
  async () => {
    const res = await fetch("https://ipapi.co/json");
    const data = await res.json();

    return data;
  }
);

export const fetchTopHeadlinesNews = createAsyncThunk<
  NewsResponse,
  TopHeadlinesRequest
>("news/getTopheadlineNews", async ({ countryCode, category, query }) => {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?apiKey=48e67a0eeacf4f709e5fbcbf88591d8a&pageSize=48${
      countryCode ? `&country=${countryCode}` : ""
    }${category ? `&category=${category}` : ""}${
      query?.trim() ? `&q=${encodeURIComponent(query.trim())}` : ""
    }`
  );

  const data = await res.json();

  return data;
});

export const fetchVideoArticles = createAsyncThunk<
  NewsResponse,
  AdvancedSearchRequest
>(
  "news/getVideoArticles",
  async ({ q, from, to, language, sortBy, searchIn, sources }) => {
    const res = await fetch(
      `https://newsapi.org/v2/everything?domains=youtube.com${
        q?.trim() ? `&q=${encodeURIComponent(q.trim())}` : ""
      }${from ? `&from=${from}` : ""}${to ? `&to=${to}` : ""}${
        language ? `&language=${language}` : ""
      }&sortBy=${sortBy ?? "popularity"}${
        searchIn ? `&searchIn=${searchIn}` : ""
      }
    ${
      sources ? `&sources=${sources}` : ""
    }&apiKey=48e67a0eeacf4f709e5fbcbf88591d8a&searchIn=title`
    );

    const data = await res.json();

    return data;
  }
);

export const fetchByQueryAndFilters = createAsyncThunk<
  NewsResponse,
  AdvancedSearchRequest
>(
  "news/getNewsByQuery",
  async ({ q, from, to, language, sortBy, searchIn, sources }) => {
    const res = await fetch(
      `https://newsapi.org/v2/everything?${
        q?.trim() ? `&q=${encodeURIComponent(q.trim())}` : ""
      }${from ? `&from=${from}` : ""}${to ? `&to=${to}` : ""}${
        language ? `&language=${language}` : ""
      }${searchIn ? `&searchIn=${searchIn}` : ""}&sortBy=${
        sortBy ?? "publishedAt"
      }${
        sources ? `&sources=${sources}` : ""
      }&apiKey=48e67a0eeacf4f709e5fbcbf88591d8a`
    );

    const data = await res.json();

    return data;
  }
);

export const fetchCurrencyRates = createAsyncThunk<
  CurrencyRatesResponse,
  string
>("currencyRates/getCurrencyRates", async (countryCurrency) => {
  const res = await fetch(
    `https://api.exchangerate.host/latest?base=${countryCurrency}&symbols=USD,EUR,CZK,CHF,GBP,JPY,AUD,CAD,CNH,HKD,NZD,CNY,SEK,NOK,PLN,DKK`
  );

  const data = await res.json();

  return data;
});

export const fetchSearchSources = createAsyncThunk<SearchSourcesResponse>(
  "searchSources/getSearchSources",
  async () => {
    const res = await fetch(
      "https://newsapi.org/v2/top-headlines/sources?apiKey=48e67a0eeacf4f709e5fbcbf88591d8a"
    );

    const data = await res.json();

    return data;
  }
);
