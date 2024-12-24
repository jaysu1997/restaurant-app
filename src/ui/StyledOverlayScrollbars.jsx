// OverlayScrollbarsComponent

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

function StyledOverlayScrollbars({ children, autoHide, style = {} }) {
  return (
    <OverlayScrollbarsComponent
      options={{
        scrollbars: {
          autoHide: autoHide,
          clickScrolling: true,
          dragScrolling: true,
          autoHideDelay: 1000,
        },
      }}
      style={style}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}

export default StyledOverlayScrollbars;
