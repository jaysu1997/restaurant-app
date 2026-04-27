import styled from "styled-components";
import { Fragment, useState } from "react";
import { ChevronRight } from "lucide-react";

const Accordion = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  font-size: 1.2rem;

  max-height: ${({ $isExpanded }) => ($isExpanded ? "13.8rem" : "3.8rem")};
  transition: max-height 0.3s;
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
  font-size: 1.4rem;
  border-bottom: 1px solid
    ${({ $isExpanded }) => ($isExpanded ? "#ddd" : "transparent")};

  transition:
    background-color 0.3s,
    border-color 0.3s ease;

  svg {
    width: 1.3rem;
    height: 1.3rem;
    transition: transform 0.3s;
    transform: ${({ $isExpanded }) =>
      $isExpanded ? "rotate(-90deg)" : "rotate(90deg)"};
  }

  &:hover {
    background-color: #f1f5f9;
  }
`;

const AccordionContent = styled.div`
  font-size: 1.4rem;
  padding: 0.6rem 1.2rem;
  max-height: 10rem;
  overflow-y: auto;

  span[tabIndex="0"] {
    color: #3b82f6;
    cursor: pointer;
  }

  span[tabIndex="0"]:hover {
    color: #2563eb;
    text-decoration: underline;
  }
`;

// 刪除食材時才需要顯示的內容
function RelatedMenus({ relatedMenus, setIsOpenModal }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Accordion $isExpanded={isExpanded}>
      <AccordionTitle
        $isExpanded={isExpanded}
        onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
      >
        <ChevronRight />
        <span>查看有使用此食材的餐點</span>
      </AccordionTitle>

      <AccordionContent $isExpanded={isExpanded} inert={!isExpanded}>
        {relatedMenus.length !== 0 ? (
          relatedMenus.map((menu, index) => (
            <Fragment key={menu.id}>
              <span
                role="button"
                tabIndex="0"
                onClick={() => setIsOpenModal({ type: "menuForm", data: menu })}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setIsOpenModal({ type: "menuForm", data: menu });
                  }
                }}
              >
                {menu.name}
              </span>
              {index < relatedMenus.length - 1 && "、"}
            </Fragment>
          ))
        ) : (
          <span>無</span>
        )}
      </AccordionContent>
    </Accordion>
  );
}

export default RelatedMenus;
