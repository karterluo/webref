"use client";

import Canvas from "./Canvas/Canvas";
import UploadButton from "./UploadButton/UploadButton";
import ExportButton from "./ExportButton";
import ContextMenu from "./ContextMenu/ContextMenu";
import Selection from "@/Selection/Selection";
import Debug from "./Debug/Debug";
import Drop from "./Drop/Drop";

export default function Home() {
  return (
    <main>
      <Canvas />
      <Debug />
      <UploadButton />
      <ExportButton />
      <Selection />
      <ContextMenu />
      <Drop />
    </main>
  );
}
