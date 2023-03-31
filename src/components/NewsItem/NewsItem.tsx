import { Grid } from "@mui/material";
import NewsItemVertical from "./NewsItemElements/NewsItemVertical";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { setModalNews, toggleSaveArticle } from "../../features/news/newsSlice";
import { NewsItemProps } from "../../interfaces/newsInterfaces";
import NewsItemFullImage from "./NewsItemElements/NewsItemFullImage";
import NewsItemHorizontal from "./NewsItemElements/NewsItemHorizontal";

const NewsItem = ({
  news,
  placeholderIndex,
  maxWidth,
  fullImage,
  isVideo,
  horizontal,
}: NewsItemProps) => {
  const dispatch = useAppDispatch();
  const { modalNews } = useAppSelector((store) => store.news);

  const handleSave = () => {
    dispatch(toggleSaveArticle(news));
  };

  const handleOpenNewsModal = () => {
    if (modalNews) return;
    dispatch(setModalNews(news));
  };

  let element;
  if (fullImage) {
    element = (
      <NewsItemFullImage
        news={news}
        handleSave={handleSave}
        placeholderIndex={placeholderIndex}
        isVideo={isVideo}
      />
    );
  } else if (horizontal) {
    element = (
      <NewsItemHorizontal
        handleSave={handleSave}
        news={news}
        placeholderIndex={placeholderIndex}
      />
    );
  } else {
    element = (
      <NewsItemVertical
        news={news}
        handleSave={handleSave}
        placeholderIndex={placeholderIndex}
      />
    );
  }

  return (
    <Grid
      item
      xs={12}
      sm={maxWidth ? 12 : 6}
      md={maxWidth ? 12 : 4}
      lg={maxWidth ? 12 : 3}
      sx={{
        display: "flex",
        height: horizontal ? 250 : 350,
        cursor: "pointer",
      }}
      onClick={handleOpenNewsModal}
    >
      {element}
    </Grid>
  );
};

export default NewsItem;
