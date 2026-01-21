import "swiper/css";
import "swiper/css/navigation";
import styled from "styled-components";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSearchParams } from "react-router-dom";

const StyleSwiper = styled(Swiper)`
  grid-column: 1 / 2;
  width: 100%;
`;

const StyleSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: ${(props) => (props.$isActive ? "#171717" : "#737373")};
  padding: 0.6rem 1.2rem;
`;

export default function SwiperBar({ categories }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // 根據選擇的option值來改變URL的searchParams
  function handleFilter(e) {
    searchParams.set("category", e.target.dataset.type);
    setSearchParams(searchParams);
  }

  return (
    <StyleSwiper
      slidesPerView={3.5}
      spaceBetween={5}
      freeMode={true}
      grabCursor={true}
      modules={[FreeMode]}
      breakpoints={{
        640: {
          slidesPerView: 4.5,
          spaceBetween: 10,
        },
      }}
    >
      <StyleSwiperSlide
        onClick={handleFilter}
        data-type="all"
        $isActive={
          !searchParams.get("category") ||
          searchParams.get("category") === "all"
        }
      >
        全部
      </StyleSwiperSlide>
      {categories.map((category) => (
        <StyleSwiperSlide
          key={category}
          onClick={handleFilter}
          data-type={category}
          $isActive={searchParams.get("category") === category}
        >
          {category}
        </StyleSwiperSlide>
      ))}
    </StyleSwiper>
  );
}
