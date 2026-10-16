import styled, { css, keyframes } from "styled-components";
import { Fragment, useEffect, useState } from "react";
import { ChevronRight, AlertCircle } from "lucide-react";
import useIngredientMenus from "../../hooks/data/menus/useIngredientMenus";
import { focusRingStyles, hoverStyles } from "../../style/helpers";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  border: 2px solid var(--color-border-strong);
  border-top-color: var(--color-text-muted);
  animation: ${spin} 0.8s linear infinite;
`;

const Accordion = styled.div`
  width: 100%;
  border: 1px solid
    ${({ $isError }) =>
      $isError ? "var(--color-danger-border)" : "var(--color-border-strong)"};
  border-radius: var(--radius-md);
  overflow: hidden;
  font-size: var(--font-size-xs);
  margin-top: var(--space-6);
  padding: 0;
  max-height: ${({ $isExpanded }) => ($isExpanded ? "13.8rem" : "3.8rem")};
  transition: max-height 0.3s ease;
`;

const AccordionTitle = styled.div`
  width: 100%;
  height: 3.6rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: var(--space-2) var(--space-3);
  gap: var(--space-1-5);
  font-size: var(--font-size-sm);

  transition: background-color 0.2s ease;

  svg {
    width: 1.3rem;
    height: 1.3rem;
    flex-shrink: 0;
  }
`;

const LoadingTitle = styled(AccordionTitle)`
  color: var(--color-text-muted);
  background-color: var(--color-background);

  ${hoverStyles(css`
    background-color: var(--color-surface-subtle);
  `)}
`;

const ErrorTitle = styled(AccordionTitle)`
  color: var(--color-danger-text);
  background-color: var(--color-danger-subtle);

  ${hoverStyles(css`
    background-color: #fee2e2;
  `)}
`;

const ReadyTitle = styled(AccordionTitle)`
  color: var(--color-text-strong);
  background-color: var(--color-background);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--color-border-strong);
    opacity: ${({ $isExpanded }) => ($isExpanded ? 1 : 0)};
    transition: opacity 0.2s ease;
  }

  svg {
    transform: ${({ $isExpanded }) =>
      $isExpanded ? "rotate(0.25turn)" : "rotate(0)"};

    transition: transform 0.2s ease;
  }

  ${hoverStyles(css`
    background-color: #f1f5f9;
  `)}
`;

const AccordionContent = styled.div`
  font-size: var(--font-size-sm);
  padding: var(--space-1-5) var(--space-3);
  max-height: 10rem;
  overflow-y: auto;
`;

const EmptyContent = styled.span`
  color: var(--color-text-placeholder);
`;

const RelatedMenuButton = styled.span`
  color: var(--color-info);
  cursor: pointer;

  ${hoverStyles(css`
    font-weight: var(--font-weight-medium);
    color: var(--color-brand);
    text-decoration: underline;
    text-underline-offset: 2px;
  `)}

  &:focus-visible {
    ${focusRingStyles}
  }
`;

function RelatedMenus({ setModal, ingredientId, setIsDeleteDisabled }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    data: relatedMenus,
    isPending,
    isError,
  } = useIngredientMenus(ingredientId);

  // 有被餐點使用的食材不能刪除
  useEffect(() => {
    if (isPending || isError || !relatedMenus) {
      setIsDeleteDisabled(true);
      return;
    }

    setIsDeleteDisabled(relatedMenus.length > 0);
  }, [isPending, isError, relatedMenus, setIsDeleteDisabled]);

  return (
    <Accordion $isExpanded={isExpanded} $isError={isError}>
      {isPending && (
        <LoadingTitle>
          <Spinner />
          <span>正在取得相關餐點...</span>
        </LoadingTitle>
      )}

      {isError && (
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
                  <RelatedMenuButton
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
                      if (e.key === "Enter" || e.key === " ") {
                        if (e.key === " ") e.preventDefault();

                        setModal((prev) => ({
                          ...prev,
                          type: "menuForm",
                          menu: menu,
                        }));
                      }
                    }}
                  >
                    {menu.name}
                  </RelatedMenuButton>

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
