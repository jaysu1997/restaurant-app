// 訂單編輯頁面的迷你菜單
import styled, { css } from "styled-components";
import { useState } from "react";
import Modal, {
  ModalContainer,
  ModalContent,
} from "../../../components/modal/Modal";
import useGetMenus from "../../../hooks/data/menus/useGetMenus";
import QueryStatusFallback from "../../../components/QueryStatusFallback";
import DishCard from "../../../components/DishCard";
import { SquareMenu } from "lucide-react";
import { hoverStyles } from "../../../style/helpers";

const StyledMiniMenu = styled(ModalContainer)`
  position: relative;
`;

const MenuHeader = styled.header`
  flex-shrink: 0;
  padding: 0 2.4rem;
  height: 5.2rem;
  display: grid;
  grid-template-columns: 3.6rem minmax(0px, 1fr) 3.6rem;
  align-items: center;
  justify-items: center;
  border-bottom: 1px solid #f3f4f6;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  z-index: 1;
`;

const ToggleButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 3.6rem;
  height: 3.6rem;
  color: #4b5563;
  border-radius: 8px;

  svg {
    height: 2.4rem;
    width: 2.4rem;
  }

  ${hoverStyles(css`
    color: #1f2937;
    background-color: #f3f4f6;
  `)}
`;

const CategoryName = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const MiniMenuContent = styled(ModalContent)`
  background-color: #f9fafb;
  flex-basis: 56rem;
`;

const Overlay = styled.div`
  position: absolute;
  top: 5.2rem;
  left: 0;
  z-index: 2;
  width: 100%;
  height: calc(100% - 5.2rem);
  background-color: rgba(0, 0, 0, 0.2);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? "visible" : "hidden")};

  transition:
    opacity 0.15s ease,
    visibility 0.15s ease;
`;

const CategoryList = styled.div`
  max-height: min(24rem, 100%);
  overflow-y: auto;
  scrollbar-gutter: stable both-edges;
  padding: 0.8rem 1.2rem;
  border-bottom: 1px solid #f3f4f6;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  transform: ${({ $open }) =>
    $open ? "translateY(0)" : "translateY(-1.2rem)"};

  transition: transform 0.18s ease;
`;

const CategoryOption = styled.button`
  width: 100%;
  min-height: 4rem;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 1.4rem;
  background-color: ${({ $active }) => ($active ? "#eff6ff" : "transparent")};
  color: ${({ $active }) => ($active ? "#2563eb" : "#4b5563")};
  font-weight: ${({ $active }) => ($active ? 600 : 500)};

  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  ${hoverStyles(css`
    background-color: ${({ $active }) => ($active ? "#eff6ff" : "#f9fafb")};
    color: ${({ $active }) => ($active ? "#2563eb" : "#111827")};
  `)}
`;

const DishList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

function MiniMenu({ onCreateDish, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { menusQuery, categories } = useGetMenus();
  const menuCategories = ["全部", ...categories];

  const { data: menus = [] } = menusQuery;
  const displayMenus =
    selectedCategory === "全部"
      ? menus
      : menus.filter((dish) => dish.category === selectedCategory);

  return (
    <Modal onClose={onClose} title="菜單" maxWidth={40}>
      <QueryStatusFallback
        queries={[menusQuery]}
        hasNoData={menus.length === 0}
        noDataFallback={{
          message: "目前沒有任何餐點數據，請前往菜單設定頁面新增餐點。",
          actionLabel: "新增餐點",
          redirectTo: "/menu-manage",
        }}
      >
        <StyledMiniMenu>
          <MenuHeader>
            <ToggleButton
              type="button"
              aria-label="選擇分類"
              onClick={() => setIsCategoryOpen((prev) => !prev)}
            >
              <SquareMenu />
            </ToggleButton>
            <CategoryName>{selectedCategory}</CategoryName>
          </MenuHeader>

          <Overlay
            $open={isCategoryOpen}
            onClick={() => setIsCategoryOpen(false)}
          >
            <CategoryList $open={isCategoryOpen}>
              {menuCategories.map((category) => (
                <CategoryOption
                  $active={selectedCategory === category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsCategoryOpen(false);
                  }}
                  key={category}
                >
                  {category}
                </CategoryOption>
              ))}
            </CategoryList>
          </Overlay>

          <MiniMenuContent inert={isCategoryOpen}>
            <DishList>
              {displayMenus.map((dish) => (
                <DishCard
                  dish={dish}
                  onSelect={() => {
                    onClose();
                    onCreateDish(dish);
                  }}
                  canPlaceOrder={true}
                  key={dish.id}
                />
              ))}
            </DishList>
          </MiniMenuContent>
        </StyledMiniMenu>
      </QueryStatusFallback>
    </Modal>
  );
}

export default MiniMenu;
