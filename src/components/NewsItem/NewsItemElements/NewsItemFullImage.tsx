import { Box, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../hooks/storeHooks";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PlayCircleFilledTwoToneIcon from "@mui/icons-material/PlayCircleFilledTwoTone";
import { NewsItemElementProps } from "../../../interfaces/newsInterfaces";

const NewsItemFullImage = ({
  news,
  handleSave,
  placeholderIndex,
  isVideo,
}: NewsItemElementProps) => {
  const { savedArticles } = useAppSelector((store) => store.news);
  const { t } = useTranslation();
  const isNewsSaved =
    savedArticles.findIndex((item) => item.url === news?.url) !== -1;

  return (
    <Box
      sx={{
        borderRadius: 4,
        width: "100%",
        backgroundImage: `url(${
          news?.urlToImage ||
          `https://picsum.photos/id/${(placeholderIndex + 1) * 10}/200/300`
        })`,
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
      }}
    >
      {isVideo && (
        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <PlayCircleFilledTwoToneIcon
            sx={{ fontSize: 60, color: "#0288d1" }}
          />
        </IconButton>
      )}
      <IconButton
        size="small"
        color="primary"
        onClick={handleSave}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: "#C3EAF4BB",
        }}
      >
        {!isNewsSaved ? (
          <BookmarkBorderIcon fontSize="large" />
        ) : (
          <BookmarkIcon fontSize="large" />
        )}
      </IconButton>
      <Box
        sx={{
          backgroundColor: "#C3EAF4BB",
          bottom: 10,
          borderRadius: 4,
          marginX: 1,
          marginY: 2,
        }}
      >
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          sx={{
            fontWeight: "600",
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "black",
          }}
        >
          {news?.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            color: "black",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {news?.content || `${t("news.placeholderText")}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default NewsItemFullImage;
