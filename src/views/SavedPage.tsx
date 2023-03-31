import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../hooks/storeHooks";
import { News } from "../interfaces/newsInterfaces";
import NewsContainer from "../components/NewsContainers/StandardNewsContainer";
import { useTranslation } from "react-i18next";

const SavedPage = () => {
  const { savedArticles } = useAppSelector((store) => store.news);
  const savedPosts: News[] = [];
  const savedVideos: News[] = [];
  const { t } = useTranslation();

  savedArticles.forEach((article) => {
    if (article.url.match(/youtube.com/i)) {
      savedVideos.push(article);
      return;
    }
    savedPosts.push(article);
  });

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" gutterBottom>
        {t("savedPage.savedArticles")}
      </Typography>
      <Box mb={6}>
        <NewsContainer news={savedPosts} />
      </Box>
      <Typography variant="h5" gutterBottom>
        {t("savedPage.savedVideos")}
      </Typography>
      <Box>
        <NewsContainer news={savedVideos} />
      </Box>
    </Container>
  );
};

export default SavedPage;
