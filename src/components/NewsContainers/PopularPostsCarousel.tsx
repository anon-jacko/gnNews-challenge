import { Box, Typography } from "@mui/material";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { CarouselProps } from "../../interfaces/newsInterfaces";
import NewsItem from "../NewsItem/NewsItem";

const PopularPosts = ({ news }: CarouselProps) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "start" }}>
        Popular posts
      </Typography>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        speed={400}
        loop={true}
        autoplay={{ delay: 5000 }}
        spaceBetween={15}
        style={{ padding: "10px" }}
        breakpoints={{
          1200: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
        }}
      >
        {news.map((singleNews, i) => (
          <SwiperSlide key={i}>
            <NewsItem
              news={singleNews}
              placeholderIndex={i}
              maxWidth
              horizontal
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default PopularPosts;
