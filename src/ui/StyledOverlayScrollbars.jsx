// OverlayScrollbarsComponent

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { OverlayScrollbars, ClickScrollPlugin } from "overlayscrollbars";
import "overlayscrollbars/overlayscrollbars.css";

OverlayScrollbars.plugin(ClickScrollPlugin);

function StyledOverlayScrollbars({ children, autoHide = "never", style = {} }) {
  return (
    <OverlayScrollbarsComponent
      options={{
        scrollbars: {
          autoHide: autoHide,
          clickScrolling: true,
          dragScrolling: true,
          autoHideDelay: 1000,
          clickScroll: true,
        },
      }}
      style={style}
      defer
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}

export default StyledOverlayScrollbars;
