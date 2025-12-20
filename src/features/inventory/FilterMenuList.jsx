import styled from "styled-components";
import { Fragment, useState } from "react";
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
    transform: ${({ $isExpanded }) =>
      $isExpanded ? "rotate(-90deg)" : "rotate(90deg)"};
  }

  &:hover {
    background-color: #f1f5f9;
  }
`;

const AccordionContent = styled.div`
  font-size: 1.4rem;
  opacity: ${({ $isExpanded }) => ($isExpanded ? 1 : 0)};
  visibility: ${({ $isExpanded }) => ($isExpanded ? "visible" : "hidden")};
  padding: ${({ $isExpanded }) => ($isExpanded ? "0.6rem 1.2rem" : "0 1.2rem")};
  max-height: ${({ $isExpanded }) => ($isExpanded ? "7.5rem" : "0")};
  overflow: ${({ $isExpanded }) => ($isExpanded ? "auto" : "hidden")};

  transition: max-height 0.3s, padding 0.3s, opacity 0.6s ease,
    visibility 0.6s ease;

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

  function handleToggle() {
    setIsExpanded((isExpanded) => !isExpanded);
  }

  return (
    <>
      <Accordion>
        <AccordionTitle $isExpanded={isExpanded} onClick={handleToggle}>
          <ChevronRight size={14} />
          <span>查看使用{name}的餐點</span>
        </AccordionTitle>

        <AccordionContent $isExpanded={isExpanded}>
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
