import "swiper/css";
import "swiper/css/navigation";
import styled from "styled-components";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSearchParams } from "react-router-dom";

const StyleSwiper = styled(Swiper)`
  grid-column: 1 / 2;
  max-width: 96rem;
  width: 100%;
  box-sizing: border-box;
  max-height: 3.2rem;
  /* padding: 0 4rem; */
`;

const StyleSwiperSlide = styled(SwiperSlide)`
  background-color: #262626;
  color: #fafafa;
  min-height: 3.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function SwiperBar({ categorys }) {
  // React Router提供的searchParams功能
  const [searchParams, setSearchParams] = useSearchParams();

  // 根據選擇的option值來改變URL的searchParams
  function handleFilter(e) {
    // searchParams.delete("name");
    searchParams.set("category", e.target.dataset.type);
    setSearchParams(searchParams);
  }

  return (
    <StyleSwiper
      slidesPerView={2.5}
      spaceBetween={10}
      freeMode={true}
      grabCursor={true}
      modules={[FreeMode]}
      breakpoints={{
        640: {
          slidesPerView: 2.5,
          spaceBetween: 5,
        },
        768: {
          slidesPerView: 3.5,
          spaceBetween: 5,
        },
        1024: {
          slidesPerView: 4.5,
          spaceBetween: 5,
        },
      }}
    >
      <StyleSwiperSlide onClick={handleFilter} data-type="all">
        全部
      </StyleSwiperSlide>
      {categorys.map((category) => (
        <StyleSwiperSlide
          key={category}
          onClick={handleFilter}
          data-type={category}
        >
          {category}
        </StyleSwiperSlide>
      ))}
    </StyleSwiper>
  );
}
