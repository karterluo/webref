import React from "react";
import styles from "./ExportButton.module.css";
import useStore from "./useStore";
import JSZip from "jszip";

interface RefData {
  x: number;
  y: number;
  width: number;
  height: number | string;
}

export default function ExportButton() {
  const refMap = useStore((state) => state.refMap);
  // Function to store the JSON information
  const jsonRecord = () => {
    const jsonData: Record<string, RefData> = {};

    refMap.forEach((value, key) => {
      jsonData[key] = value;
    });

    const jsonString = JSON.stringify(jsonData, null, 2);
    console.log(jsonString);
    return jsonString;
  };

  const exportImg = () => {
  };

  const exportData = () => {
    const zip = new JSZip();
    zip.file("refMap.json", jsonRecord());
    const imgZip = zip.folder("Images");

  };

  return (
    <button className={styles.ExportButton} onClick={exportData}>
      Export
    </button>
  );
}
