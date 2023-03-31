import {
  Autocomplete,
  FormControl,
  IconButton,
  InputLabel,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import { useAppSelector } from "../hooks/storeHooks";
import { useNavigateSearch } from "../hooks/useNavigateSearch";
import { languageList } from "../utils/constants/languages";

const AdvancedSearchBar = () => {
  const { searchSources } = useAppSelector((store) => store.news);
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries([...searchParams]);
  const [controlledSearchParams, setControlledSearchParams] = useState({
    from: "",
    to: "",
    language: "",
    searchIn: "",
    sources: "",
    sortBy: "",
    q: "",
  });
  const navigateSearch = useNavigateSearch();

  const handleSearch = () => {
    const purifiedData = {
      ...(controlledSearchParams.from && { from: controlledSearchParams.from }),
      ...(controlledSearchParams.to && { to: controlledSearchParams.to }),
      ...(controlledSearchParams.language && {
        language: controlledSearchParams.language,
      }),
      ...(controlledSearchParams.searchIn && {
        searchIn: controlledSearchParams.searchIn,
      }),
      ...(controlledSearchParams.sources && {
        sources: controlledSearchParams.sources,
      }),
      ...(controlledSearchParams.sortBy && {
        sortBy: controlledSearchParams.sortBy,
      }),
      ...(controlledSearchParams.q && { q: controlledSearchParams.q }),
    };

    if (!Object.keys(purifiedData).length) return;

    navigateSearch("/search", purifiedData);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      | SelectChangeEvent<string>
  ) => {
    setControlledSearchParams({
      ...controlledSearchParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleAutocompleteChange = (
    newSources: {
      label: string;
      sourceCode: string;
    } | null
  ) => {
    setControlledSearchParams({
      ...controlledSearchParams,
      sources: newSources?.sourceCode || "",
    });
  };

  useEffect(() => {
    if (!Object.keys(currentParams).length) return;

    setControlledSearchParams({ ...controlledSearchParams, ...currentParams });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item>
        <TextField
          type="date"
          label="From"
          name="from"
          size="small"
          onChange={(e) => handleChange(e)}
          value={controlledSearchParams.from}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item>
        <TextField
          type="date"
          label="To"
          name="to"
          onChange={(e) => handleChange(e)}
          size="small"
          value={controlledSearchParams.to}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="language-select">Language</InputLabel>
          <Select
            labelId="language-select"
            name="language"
            label="language"
            onChange={(e) => handleChange(e)}
            value={controlledSearchParams.language}
          >
            {languageList.map((language) => (
              <MenuItem key={language.code} value={language.code}>
                {language.nativeName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="searchIn-select">Search In</InputLabel>
          <Select
            labelId="searchIn-select"
            name="searchIn"
            label="searchIn"
            onChange={(e) => handleChange(e)}
            value={controlledSearchParams.searchIn}
          >
            <MenuItem value="">all</MenuItem>
            <MenuItem value="title">title</MenuItem>
            <MenuItem value="description">description</MenuItem>
            <MenuItem value="content">content</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {searchSources.length && (
        <Grid item>
          <Autocomplete
            disablePortal
            size="small"
            autoSelect
            options={searchSources.map((source) => ({
              label: source.name,
              sourceCode: source.id,
            }))}
            sx={{ width: 300 }}
            onChange={(_event, newSources) =>
              handleAutocompleteChange(newSources)
            }
            renderInput={(params) => <TextField {...params} label="Sources" />}
          />
        </Grid>
      )}
      <Grid item>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="sortBy-select">Sort by</InputLabel>
          <Select
            labelId="sortBy-select"
            name="sortBy"
            label="Sort by"
            onChange={(e) => handleChange(e)}
            // defaultValue={controlledSearchParams.sortBy}
            value={controlledSearchParams.sortBy}
          >
            <MenuItem value="relevancy">relevancy</MenuItem>
            <MenuItem value="popularity">popularity</MenuItem>
            <MenuItem value="publishedAt">publishedAt</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <TextField
          type="text"
          placeholder="Search..."
          name="q"
          size="small"
          onChange={(e) => handleChange(e)}
          value={controlledSearchParams.q}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSearch}>
                <SearchIcon />{" "}
              </IconButton>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default AdvancedSearchBar;
