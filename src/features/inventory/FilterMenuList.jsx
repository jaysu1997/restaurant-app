import styled from "styled-components";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import UpsertMenuForm from "../menu-manage/UpsertMenuForm";

const Accordion = styled.div`
  width: 100%;
  border: 1px solid #dddddd;
  border-radius: 6px;
  overflow: hidden;
  font-size: 1.2rem;
`;

const AccordionTitle = styled.button`
  width: 100%;
  height: 3.6rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.8rem 1.2rem;
  gap: 0.4rem;
  background-color: #f9fafb;
  transition: background-color 0.3s;
  font-size: 1.4rem;

  svg {
    transition: transform 0.3s;
    transform: ${({ $collapse }) =>
      $collapse ? "rotate(-90deg)" : "rotate(90deg)"};
  }

  &:hover {
    background-color: #f1f5f9;
  }
`;

const AccordionContent = styled.div`
  overflow: hidden;
  height: ${({ $height }) => $height};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  transition: height 0.3s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.6s ease,
    visibility 0.6s ease;

  .content-inner {
    padding: 0.6rem 1.2rem;
    font-size: 1.4rem;
    line-height: 1.6;
  }

  span[tabindex="0"] {
    color: #3b82f6;
    cursor: pointer;
  }

  span[tabindex="0"]:hover {
    color: #2563eb;
    text-decoration: underline;
  }

  span[tabindex="0"]:focus {
    outline: 2px solid #007bff;
  }
`;

// 刪除食材時才需要顯示的內容
function FilterMenuList({ name, filterMenuData }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [height, setHeight] = useState("0px");
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (isExpanded) {
      const scrollHeight = el.scrollHeight;
      setHeight(`${scrollHeight}px`);
      setIsVisible(true);
    } else {
      setHeight("0px");
      setIsVisible(false);
    }
  }, [isExpanded]);

  const handleToggle = () => {
    // 先讓內容可見，再設定展開，避免 scrollHeight 為 0
    if (!isExpanded) setIsVisible(true);
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <Accordion>
        <AccordionTitle $collapse={isExpanded} onClick={handleToggle}>
          <ChevronRight size={14} />
          <span>查看使用{name}的餐點</span>
        </AccordionTitle>

        <AccordionContent
          ref={contentRef}
          $height={height}
          $visible={isVisible}
        >
          <div className="content-inner">
            {filterMenuData.length !== 0 ? (
              filterMenuData.map((menu, index) => (
                <Fragment key={menu.id}>
                  <span
                    role="button"
                    tabIndex="0"
                    onClick={() => setActiveMenu(menu)}
                  >
                    {menu.name}
                  </span>
                  {index < filterMenuData.length - 1 ? "、" : "。"}
                </Fragment>
              ))
            ) : (
              <span>無</span>
            )}
          </div>
        </AccordionContent>
      </Accordion>

      {activeMenu && (
        <UpsertMenuForm
          onCloseModal={() => setActiveMenu(null)}
          menu={activeMenu}
        />
      )}
    </>
  );
}

export default FilterMenuList;
