import { createSearchParams, useNavigate } from "react-router-dom";

export const useNavigateSearch = () => {
  const navigate = useNavigate();

  return (pathname: string, params: Record<string, string>) =>
    navigate({ pathname, search: `?${createSearchParams(params)}` });
};
