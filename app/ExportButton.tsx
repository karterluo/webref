import React from "react";
import styles from "./ExportButton.module.css";
import useRefStore from "@/stores/useRefStore";
import JSZip from "jszip";
import saveAs from "file-saver";

interface RefData {
  x: number;
  y: number;
  width: number;
  height: number | string;
}

export default function ExportButton() {
  const refMap = useRefStore((state) => state.refMap);
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

  const exportImages = () => {};

  const exportData = () => {
    const zip = new JSZip();
    zip.file("refMap.json", jsonRecord());
    const imgZip = zip.folder("Images");

    // Generate timestamped filename
    const timestamp = new Date()
      .toISOString()
      .replace(/T|:/g, "-")
      .substring(0, 19);
    const zipFilename = `${timestamp}.zip`;

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, zipFilename);
    });
  };

  return (
    <button className={styles.ExportButton} onClick={exportData}>
      Export
    </button>
  );
}
