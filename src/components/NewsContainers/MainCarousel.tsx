import { Grid, Paper } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { CarouselProps } from "../../interfaces/newsInterfaces";
import NewsItem from "../NewsItem/NewsItem";

const MainCarousel = ({ news }: CarouselProps) => {
  return (
    <Grid container spacing={2} mb={2}>
      <Grid item xs={12} sm={6} lg={3}>
        <NewsItem
          news={news[0]}
          placeholderIndex={1}
          maxWidth
          fullImage
          isVideo
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <NewsItem news={news[1]} placeholderIndex={2} maxWidth fullImage />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Paper elevation={2} sx={{ borderRadius: 4 }}>
          <Swiper
            modules={[Autoplay]}
            loop={true}
            speed={700}
            autoplay={{ delay: 5000 }}
          >
            {news.slice(2).map((singleNews, i) => (
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
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MainCarousel;
