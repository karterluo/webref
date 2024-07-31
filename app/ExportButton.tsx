import React from "react";
import styles from "./ExportButton.module.css";
import useStore from "./useStore";

interface RefData {
  x: number;
  y: number;
  width: number;
  height: number | string;
}

export default function ExportButton() {
  const store = useStore();

  const exportData = () => {
    const refMap = store.refMap;
    const jsonData: Record<string, RefData> = {};

    refMap.forEach((value, key) => {
      jsonData[key] = value;
    });

    const jsonString = JSON.stringify(jsonData, null, 2);

    // Handle the JSON data here, e.g., save it to a file, display it, etc.
    console.log(jsonString);
  };

  return (
    <button className={styles.ExportButton} onClick={exportData}>
      Export
    </button>
  );
}
