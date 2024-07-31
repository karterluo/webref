import React, { useCallback, useEffect, useState } from "react";
import useStore from "./useStore";
import styles from "./ContextMenu.module.css";
import ContextMenuButton from "./ContextMenuButton";

export default function ContextMenu() {
  const addRef = useStore((state) => state.addRef);
  const delRef = useStore((state) => state.delRef);
  const selectedUrl = useStore((state) => state.selectedUrl);
  const setSelectedUrl = useStore((state) => state.setSelectedUrl);
  const contextMenuX = useStore((state) => state.contextMenuX);
  const contextMenuY = useStore((state) => state.contextMenuY);
  const contextMenuShown = useStore((state) => state.contextMenuShown);
  const hideContextMenu = useStore((state) => state.hideContextMenu);
  const [isMac, setIsMac] = useState(false);

  const handleDelete = useCallback(() => {
    // useCallback caches function so it won't be recreated each render. Needed for useEffect.
    delRef(selectedUrl);
    setSelectedUrl("");
    hideContextMenu();
  }, [delRef, selectedUrl, setSelectedUrl, hideContextMenu]);

  const handlePaste = useCallback(async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const clipboardItem of clipboardItems) {
        const imageTypes = clipboardItem.types.filter((type) =>
          type.startsWith("image/"),
        );
        for (const imageType of imageTypes) {
          const blob = await clipboardItem.getType(imageType);
          const url = URL.createObjectURL(blob);
          addRef(url);
        }
      }
    } catch (err: unknown) {
      console.error(err); // Do we actually need this?
    }
    hideContextMenu();
  }, [addRef, hideContextMenu]);

  function handleContextMenu(e: React.MouseEvent) {
    // Block right-click on context menu and treat as left-click. Doesn't work in Safari.
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLButtonElement).click();
  }

  useEffect(() => {
    // Detect if user is on Mac to display correct shortcuts.
    if (navigator.userAgent.includes("Mac")) {
      setIsMac(true);
    }
    // Handle keyboard shortcuts.
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        hideContextMenu();
      } else if (e.key === "Delete" || e.key == "Backspace") {
        handleDelete();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("paste", handlePaste); // Paste event is not a keyboard event.
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("paste", handlePaste);
    };
  }, [handleDelete, handlePaste, hideContextMenu]);

  return (
    <div
      className={styles.ContextMenu}
      onContextMenu={handleContextMenu}
      style={{
        display: contextMenuShown ? "block" : "none",
        transform: `translate(${contextMenuX}px, ${contextMenuY}px)`,
      }}
    >
      <ContextMenuButton
        label="Delete"
        shortcut="Del"
        disabled={!selectedUrl}
        onClick={handleDelete}
      />
      {/* Chrome will ask and save clipboard permission, but Firefox and Safari will prompt each time. */}
      <ContextMenuButton
        label="Paste"
        shortcut={isMac ? "⌘V" : "^V"}
        disabled={false}
        onClick={handlePaste}
      />
    </div>
  );
}
