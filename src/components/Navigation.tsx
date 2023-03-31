import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useTranslation } from "react-i18next";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import useDebounce from "../hooks/useDebaounce";
import { setCountryCode, setViewOption } from "../features/news/newsSlice";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { viewOption, countryCode, userCountry } = useAppSelector(
    (store) => store.news
  );
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 3000);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [searchParams] = useSearchParams();
  const { t, i18n } = useTranslation();

  const { category } = Object.fromEntries([...searchParams]);
  const params = useParams();
  const location = useLocation();
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElSettings, setAnchorElSettings] = useState<null | HTMLElement>(
    null
  );

  const handleChangeViewOption = () => {
    dispatch(setViewOption(viewOption === "tiles" ? "list" : "tiles"));
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenSettingsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSettings(event.currentTarget);
  };
  const handleCloseSettingsMenu = () => {
    setAnchorElSettings(null);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "pl" : "en");
  };

  useEffect(() => {
    // dispatch(
    //   fetchTopHeadlinesNews({
    //     // category,
    //     countryCode: countryCode || userCountry,
    //     query: debouncedSearchTerm,
    //   })
    // );
    // dispatch(fetchVideoArticles({ query: debouncedSearchTerm }));
    // }
  }, [debouncedSearchTerm]);
  return (
    // Jeżeli jest mobile view to ma się zamieniać cześciowo na speedDial
    <>
      <AppBar position="sticky" color="default" sx={{ marginBottom: 3 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            // container
            // py={2}
            sx={{
              alignItems: "center",
              justifyContent: { xs: "flex-end", md: "space-around" },
              display: "flex",
              width: "100%",
            }}
            // spacing={2}
            maxWidth="lg"
          >
            <Box
              sx={{
                flexGrow: { xs: 1, md: 0 },
                alignSelf: { xs: "flex-start", md: "auto" },
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Link to="/" onClick={() => dispatch(setCountryCode(""))}>
                <Box
                  sx={{
                    width: { xs: 50, md: 100, lg: 200 },
                    height: { xs: 50, md: 20, lg: 40 },
                    backgroundImage: {
                      xs: `url("https://i.ibb.co/LRht1sS/gnnews-website-favicon-color.png")`,
                      md: `url("https://i.ibb.co/Tr2fwWX/logo-no-background.png")`,
                    },
                    backgroundSize: "cover",
                  }}
                >
                  {/* <img
                    src="https://i.ibb.co/Tr2fwWX/logo-no-background.png"
                    alt="logo-no-background"
                    width={200}
                  /> */}
                </Box>
              </Link>
              <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                    // marginLeft: { xs: 0, lg: 10 },
                    marginLeft: 10,
                  },
                }}
              >
                <Link to="/search">
                  <Button variant="outlined">
                    {t("navigation.advancedSearch")}
                  </Button>
                </Link>
                <Button onClick={() => setOpen(true)}>
                  {t("navigation.summary")}
                </Button>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate("/search");
                    }}
                  >
                    <Typography textAlign="center">Search</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      setOpen(true);
                    }}
                  >
                    <Typography textAlign="center">
                      {t("navigation.summary")}
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
            <TextField
              sx={{ width: { md: 150, lg: 300 } }}
              type="text"
              placeholder={t("navigation.search") as string}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              size="small"
            />
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "space-between",
              }}
            >
              {i18n.language === "en" ? (
                <IconButton onClick={toggleLanguage}>
                  <img src="https://flagcdn.com/20x15/pl.png" alt="" />
                </IconButton>
              ) : (
                <IconButton onClick={toggleLanguage}>
                  <img src="https://flagcdn.com/20x15/gb.png" alt="" />
                </IconButton>
              )}
              <Link to="/saved">
                <IconButton>
                  <BookmarkIcon />
                </IconButton>
              </Link>
              <IconButton onClick={handleChangeViewOption}>
                {viewOption === "tiles" ? (
                  <FormatListBulletedIcon />
                ) : (
                  <GridViewIcon />
                )}
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenSettingsMenu}
                color="inherit"
              >
                <SettingsIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElSettings}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElSettings)}
                onClose={handleCloseSettingsMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseSettingsMenu}>
                  {i18n.language === "en" ? (
                    <IconButton>
                      <img src="https://flagcdn.com/20x15/pl.png" alt="" />
                    </IconButton>
                  ) : (
                    <IconButton>
                      <img src="https://flagcdn.com/20x15/gb.png" alt="" />
                    </IconButton>
                  )}
                  <Typography>Change</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseSettingsMenu();
                    navigate("/saved");
                  }}
                >
                  <IconButton>
                    <BookmarkIcon />
                  </IconButton>
                  <Typography>Saved</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseSettingsMenu();
                    handleChangeViewOption();
                  }}
                >
                  <IconButton>
                    {viewOption === "tiles" ? (
                      <FormatListBulletedIcon />
                    ) : (
                      <GridViewIcon />
                    )}
                  </IconButton>
                  <Typography>View</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                  {t("navigation.summary")}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {t("modalNews.authorNote")}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {t("modalNews.greatestDifficulty")}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {t("modalNews.greatestFun")}
                </Typography>
              </Box>
            </Modal>
          </Box>
        </Toolbar>
      </AppBar>
      {/* <Toolbar /> */}
    </>
  );
};

export default Navigation;
