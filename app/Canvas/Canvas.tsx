import React from "react";
import useRefStore from "@/stores/useRefStore";
import useContextMenuStore from "@/stores/useContextMenuStore";
import useSelectionStore from "@/stores/useSelectionStore";
import RefImage from "@/RefImage/RefImage";
import styles from "./Canvas.module.css";

export default function Canvas() {
  const refMap = useRefStore((state) => state.refMap);
  const clearSelection = useSelectionStore((state) => state.clearSelection);
  const contextMenuShown = useContextMenuStore(
    (state) => state.contextMenuShown,
  );
  const showContextMenu = useContextMenuStore((state) => state.showContextMenu);
  const hideContextMenu = useContextMenuStore((state) => state.hideContextMenu);

  // Handle mousedown on the canvas (more configurable than click)
  function handleMouseDown(e: React.MouseEvent) {
    if (e.button == 2) return; // Right mouse button is only for context menu
    if (contextMenuShown) {
      hideContextMenu();
    }
    // Ignore if shift key is pressed (for multi-select)
    if (e.shiftKey) return;
    clearSelection();
  }

  // Handle right-clicking on the canvas
  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    showContextMenu(e.clientX, e.clientY);
  }

  return (
    <div
      className={styles.Canvas}
      onMouseDown={handleMouseDown}
      onContextMenu={handleContextMenu}
    >
      {Array.from(refMap.keys()).map((url) => (
        <RefImage key={url} url={url} />
      ))}
    </div>
  );
}
