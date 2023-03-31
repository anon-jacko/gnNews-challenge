import { Grid } from "@mui/material";
import NewsItem from "../NewsItem/NewsItem";
import { CarouselProps } from "../../interfaces/newsInterfaces";
import "swiper/css";
import "swiper/css/navigation";

const NewsContainer = ({ news }: CarouselProps) => {
  return (
    <Grid container spacing={2}>
      {news.map((article, i) => (
        <NewsItem news={article} placeholderIndex={i} key={article.url} />
      ))}
    </Grid>
  );
};

export default NewsContainer;
