import {Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import styles from "./banner.module.css";

const bannerData = [
  {
    href: "https://cdn.myikas.com/images/theme-images/b2751dac-8452-49c2-b861-b553b69d0521/image_1950.webp",
  },
  {
    href: "https://cdn.myikas.com/images/theme-images/167cca43-3338-42e0-9940-bd71fe98acba/image_1950.webp",
  },
  {
    href: "https://cdn.myikas.com/images/theme-images/72181c0a-c3c9-4003-b313-117ebbd89dce/image_1950.webp",
  },
  
  {
    href: "https://cdn.myikas.com/images/theme-images/52844b1d-1a9b-409f-9a00-759dd6c20f78/image_1950.webp",
  },

];

const Banner = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, A11y, Autoplay]}
      slidesPerView="auto"
      loop={true}
      navigation
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      className="swiperSlider"
    >
      {bannerData.map((x, index) => (
        <SwiperSlide key={index}>
          <div className={styles.bannerContainer}>
            <img className={styles.bannerImg} src={x.href} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
