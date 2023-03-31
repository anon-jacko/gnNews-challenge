export interface News {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string | null;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: News[];
}

export type CurrencyRatesType = Record<string, number>;

export interface CurrencyRatesResponse {
  motd: {
    msg: string;
    url: string;
  };
  success: boolean;
  base: string;
  date: string;
  rates: CurrencyRatesType;
}

export interface CarouselProps {
  news: News[];
}

export interface NewsItemElementProps {
  news: News;
  handleSave: () => void;
  placeholderIndex: number;
  isVideo?: boolean;
}

export interface NewsItemProps {
  news: News;
  placeholderIndex: number;
  maxWidth?: boolean;
  fullImage?: boolean;
  isVideo?: boolean;
  horizontal?: boolean;
}

export interface SideNavItemProps {
  country: {
    name: string;
    code: string;
    currencyCode: string;
  };
}

export interface CurrencyRatesItemProps {
  currency: any;
  ratio: any;
  countryCurrency: any;
}

export interface TopHeadlinesRequest {
  countryCode?: string;
  category?: string;
  query?: string;
}

export interface AdvancedSearchRequest {
  from?: Date;
  to?: Date;
  language?: string;
  searchIn?: string;
  sources?: string;
  sortBy?: string;
  q?: string;
}

export type SearchSource = {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
};

export interface SearchSourcesResponse {
  sources: SearchSource[];
  status: string;
}

export interface UserDataResponse {
  ip: string;
  network: string;
  version: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: null;
  latitude: null;
  longitude: null;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: number;
  country_population: string;
  asn: string;
  org: string;
}
