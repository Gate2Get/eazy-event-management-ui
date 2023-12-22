import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Specify the correct versions for both API and worker
const apiVersion = "3.11.174";
const workerVersion = "3.11.174";
const workerSrc = `https://unpkg.com/pdfjs-dist@${workerVersion}/build/pdf.worker.min.js`;

type PdfViewerType = {
  url: string;
};

export const PdfViewer = (props: PdfViewerType) => {
  const { url } = props;
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div>
      <Worker workerUrl={workerSrc}>
        <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  );
};
