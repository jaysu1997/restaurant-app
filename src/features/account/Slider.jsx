import { useRef, useState } from "react";
import styled from "styled-components";

const StyledSlider = styled.div`
  flex: 1;
  height: 2rem;
  position: relative;
  cursor: pointer;
  user-select: none;
`;

const Track = styled.span`
  background-color: rgba(37, 99, 235, 0.2);
  height: 0.5rem;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 3px;
`;

const FilledTrack = styled.span`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 0.5rem;
  border-radius: 3px;
  background-color: #2563eb;
  z-index: 1;
  width: ${({ $percent }) => `${$percent}%`};
`;

const Thumb = styled.span`
  border: 2px solid #2563eb;
  background: #fff;
  position: absolute;
  top: 50%;
  left: ${({ $percent }) => `calc(${$percent}% - 1rem)`};
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  transform: translateY(-50%);
  z-index: 2;
  touch-action: none;
  transition: box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: 0 0 0 8px rgba(37, 99, 235, 0.15);
  }

  &:active {
    box-shadow: 0 0 0 16px rgba(37, 99, 235, 0.15);
  }
`;

// 縮放圖片拖曳條
function Slider({ min = 1, max = 3, zoom, setZoom }) {
  const sliderRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  // 將當前放大值映射成百分比(刻度)
  const percent = ((zoom - min) / (max - min)) * 100;

  function percentToZoom(clientX) {
    // 取得track的總長度，然後換算成react-easy-crop需要的zoom倍數值
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const raw = min + (x / rect.width) * (max - min);

    // 讓zoom倍數值的間距為0.1，且不會有過長的浮點數
    return Math.round(raw * 10) / 10;
  }

  // pointer按下
  function handlePointerDown(e) {
    if (!sliderRef.current) return;
    setZoom(percentToZoom(e.clientX));
    setDragging(true);
    // 此api可監聽完整pointer事件(從down到move到up)
    sliderRef.current.setPointerCapture(e.pointerId);
  }

  // pointer移動
  function handlePointerMove(e) {
    // 避免沒有pointerDown但是觸發pointerMove
    if (!dragging) return;

    setZoom(percentToZoom(e.clientX));
  }

  // pointer鬆開
  function handlePointerUp(e) {
    setDragging(false);
    // 清除監聽
    sliderRef.current.releasePointerCapture(e.pointerId);
  }

  // 使用point事件會更通用且適當
  return (
    <StyledSlider
      ref={sliderRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <Track />
      <FilledTrack $percent={percent} />
      <Thumb $percent={percent} />
    </StyledSlider>
  );
}

export default Slider;
