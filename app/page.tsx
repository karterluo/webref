"use client";

import Canvas from "./Canvas";
import UploadButton from "./UploadButton";
import ExportButton from "./ExportButton";
import ContextMenu from "./ContextMenu";
import Debug from "./Debug";

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
