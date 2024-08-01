import React from "react";
import useContextMenuStore from "@/stores/useContextMenuStore";
import styles from "./ContextMenuButton.module.css";

interface ContextMenuButtonProps {
  label: string;
  shortcut?: string;
  disabled: boolean;
  onClick: () => void;
}

function ContextMenuButton({
  label,
  shortcut,
  disabled,
  onClick,
}: ContextMenuButtonProps) {
  const hideContextMenu = useContextMenuStore((state) => state.hideContextMenu);
  function handleClick() {
    onClick();
    hideContextMenu();
  }
  return (
    <button
      className={`${styles.ContextMenuButton} ${disabled ? styles.disabled : ""}`}
      onClick={handleClick}
    >
      <span>{label}</span>
      <span className={styles.shortcut}>{shortcut}</span>
    </button>
  );
}

export default ContextMenuButton;
