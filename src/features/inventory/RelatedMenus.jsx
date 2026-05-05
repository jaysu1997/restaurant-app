import styled, { keyframes } from "styled-components";
import { Fragment, useState } from "react";
import { ChevronRight, AlertCircle } from "lucide-react";
import useIngredientMenus from "../../hooks/data/menus/useIngredientMenus";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  border: 2px solid #d1d5db;
  border-top-color: #6b7280;
  animation: ${spin} 0.8s linear infinite;
`;

const Accordion = styled.div`
  width: 100%;
  border: 1px solid ${({ $isError }) => ($isError ? "#fecaca" : "#ddd")};
  border-radius: 6px;
  overflow: hidden;
  font-size: 1.2rem;
  margin-top: 2.4rem;
  padding: 0;
  max-height: ${({ $isExpanded }) => ($isExpanded ? "13.8rem" : "3.8rem")};
  transition: max-height 0.3s;
`;

const AccordionTitle = styled.div`
  width: 100%;
  height: 3.6rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.8rem 1.2rem;
  gap: 0.6rem;
  font-size: 1.4rem;

  transition: background-color 0.2s;

  svg {
    width: 1.3rem;
    height: 1.3rem;
    flex-shrink: 0;
  }
`;

const LoadingTitle = styled(AccordionTitle)`
  color: #6b7280;
  background-color: #f9fafb;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const ErrorTitle = styled(AccordionTitle)`
  color: #b91c1c;
  background-color: #fef2f2;

  &:hover {
    background-color: #fee2e2;
  }
`;

const ReadyTitle = styled(AccordionTitle)`
  color: #111827;
  background-color: #f9fafb;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #ddd;
    opacity: ${({ $isExpanded }) => ($isExpanded ? 1 : 0)};
    transition: opacity 0.2s;
  }

  svg {
    transform: ${({ $isExpanded }) =>
      $isExpanded ? "rotate(0.25turn)" : "rotate(0)"};

    transition: transform 0.2s;
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

  span[tabindex="0"] {
    color: #3b82f6;
    cursor: pointer;
  }

  span[tabindex="0"]:hover {
    color: #2563eb;
    text-decoration: underline;
  }
`;

const EmptyContent = styled.span`
  color: #9ca3af;
`;

function RelatedMenus({ setModal, ingredientId }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { relatedMenus, relatedMenusIsLoading, relatedMenusIsError } =
    useIngredientMenus(ingredientId);

  return (
    <Accordion $isExpanded={isExpanded} $isError={relatedMenusIsError}>
      {relatedMenusIsLoading && (
        <LoadingTitle>
          <Spinner />
          <span>正在取得相關餐點...</span>
        </LoadingTitle>
      )}

      {relatedMenusIsError && (
        <ErrorTitle>
          <AlertCircle />
          <span>無法取得相關餐點</span>
        </ErrorTitle>
      )}

      {relatedMenus && (
        <>
          <ReadyTitle
            as="button"
            onClick={() => setIsExpanded((v) => !v)}
            $isExpanded={isExpanded}
          >
            <ChevronRight />
            <span>查看有使用此食材的餐點</span>
          </ReadyTitle>

          <AccordionContent inert={!isExpanded}>
            {relatedMenus.length === 0 ? (
              <EmptyContent>目前沒有餐點使用此食材</EmptyContent>
            ) : (
              relatedMenus.map((menu, index) => (
                <Fragment key={menu.id}>
                  <span
                    role="button"
                    tabIndex="0"
                    onClick={() =>
                      setModal((prev) => ({
                        ...prev,
                        type: "menuForm",
                        menu: menu,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setModal((prev) => ({
                          ...prev,
                          type: "menuForm",
                          menu: menu,
                        }));
                      }
                    }}
                  >
                    {menu.name}
                  </span>

                  {index < relatedMenus.length - 1 && "、"}
                </Fragment>
              ))
            )}
          </AccordionContent>
        </>
      )}
    </Accordion>
  );
}

export default RelatedMenus;
