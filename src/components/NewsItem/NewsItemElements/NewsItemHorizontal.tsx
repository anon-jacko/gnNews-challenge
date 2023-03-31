import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../..//hooks/storeHooks";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { NewsItemElementProps } from "../../../interfaces/newsInterfaces";

const NewsItemHorizontal = ({
  news,
  placeholderIndex,
  handleSave,
}: NewsItemElementProps) => {
  const { savedArticles } = useAppSelector((store) => store.news);
  const isNewsSaved =
    savedArticles.findIndex((item) => item.url === news?.url) !== -1;
  const { t } = useTranslation();
  return (
    <Paper
      sx={{
        display: "flex",
        width: "100%",
        borderRadius: 4,
      }}
      elevation={2}
    >
      <Grid container>
        <Grid
          item
          xs={6}
          sx={{
            width: "100%",
            backgroundSize: "cover",
            borderRadius: 4,
            backgroundImage: `url(${
              news?.urlToImage ||
              `https://picsum.photos/id/${(placeholderIndex + 1) * 10}/200/300`
            })`,
          }}
        ></Grid>
        <Grid
          item
          xs={6}
          sx={{ padding: 2, display: "flex", flexDirection: "column" }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            variant="subtitle1"
            gutterBottom
            component="div"
          >
            {news?.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              color: "black",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textAlign: "justify",
            }}
          >
            {news?.content || `${t("news.placeholderText")}`}
          </Typography>
          <Box sx={{ display: "flex", flexGrow: 1, alignItems: "flex-end" }}>
            <Paper
              variant="outlined"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 2,
                padding: 0.5,
                flexGrow: 1,
                backgroundColor: "#C3EAF455",
              }}
            >
              <img
                src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opty=TYPE,SIZE,URL&url=https://${
                  news.url.split("https://").pop()?.split("/")[0]
                }&size=32`}
                alt={news.source.name}
                width={32}
                height={32}
                style={{ borderRadius: "6px" }}
              />
              <Box>
                <Typography sx={{ fontSize: 14 }}>
                  {news.source.name}
                </Typography>
                {news.publishedAt && (
                  <Typography sx={{ fontSize: 12 }}>{`${new Date(
                    news.publishedAt
                  )
                    .toDateString()
                    .slice(4)}`}</Typography>
                )}
              </Box>
              <IconButton
                size="small"
                color="primary"
                onClick={handleSave}
                sx={{
                  justifySelf: "flex-end",
                  backgroundColor: "#C3EAF4BB",
                }}
              >
                {!isNewsSaved ? <BookmarkBorderIcon /> : <BookmarkIcon />}
              </IconButton>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NewsItemHorizontal;
