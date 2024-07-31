"use client";

import Canvas from "./Canvas/Canvas";
import UploadButton from "./UploadButton/UploadButton";
import ExportButton from "./ExportButton";
import ContextMenu from "./ContextMenu/ContextMenu";
import Debug from "./Debug/Debug";
import Drop from "./Drop/Drop";

export default function Home() {
  return (
    <main>
      <Canvas />
      <UploadButton />
      <ExportButton />
      <ContextMenu />
      <Drop />
      <Debug />
    </main>
  );
}
