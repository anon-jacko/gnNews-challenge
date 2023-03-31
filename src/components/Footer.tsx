import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/storeHooks";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { articles, videoArticles } = useAppSelector((store) => store.news);
  const { t } = useTranslation();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  } as const;
  const [displayedTime, setDisplayedtime] = useState("");

  const getTime = () => {
    const currentTime = new Intl.DateTimeFormat("en-EN", options).format(
      new Date()
    );
    setDisplayedtime(currentTime);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#0288d1",
        height: "80px",
        borderRadius: 4,
        marginTop: 3,
      }}
    >
      <Typography>
        {t("footer.newsNumber")} {articles?.length + videoArticles?.length}
      </Typography>
      <Typography>
        {t("footer.currentTime")} {displayedTime}
      </Typography>
    </Box>
  );
};

export default Footer;
