import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const slider = () => {
  return (
    <Swiper
      className="pt-5 h-[300px]"
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      centeredSlides={true}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 2000,
      }}
      loop={true}
    >
      <SwiperSlide className=" object-center">
        <img src="src\assest\img\slide-book\906_generated.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide className=" object-center">
        <img src="src\assest\img\slide-book\6784851.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide className=" object-center">
        <img src="src\assest\img\slide-book\8644661.jpg" alt="" />
      </SwiperSlide>
    </Swiper>
  );
};

export default slider;
