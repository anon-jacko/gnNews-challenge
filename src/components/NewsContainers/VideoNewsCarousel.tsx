import { Grid, Typography } from "@mui/material";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { CarouselProps } from "../../interfaces/newsInterfaces";
import NewsItem from "../NewsItem/NewsItem";

const VideoPosts = ({ news }: CarouselProps) => {
  return (
    <Grid container spacing={2} mb={2}>
      <Grid item xs={12} lg={12} sx={{ textAlign: "start" }}>
        <Typography variant="h4">Latest Videos</Typography>
      </Grid>
      <Grid item xs={12} lg={6}>
        <NewsItem news={news[0]} placeholderIndex={1} maxWidth />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Swiper
          modules={[Autoplay]}
          loop={true}
          slidesPerView={1}
          spaceBetween={15}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            600: {
              slidesPerView: 2,
            },
          }}
        >
          {news.slice(1).map((singleNews, i) => (
            <SwiperSlide key={i}>
              <NewsItem
                news={singleNews}
                placeholderIndex={i}
                maxWidth
                fullImage
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
    </Grid>
  );
};

export default VideoPosts;
