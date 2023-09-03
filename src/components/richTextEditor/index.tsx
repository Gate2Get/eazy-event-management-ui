import React, { useRef, useEffect } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import { SunEditorReactProps } from "suneditor-react/dist/types/SunEditorReactProps";
import "./styles.scss";

const options: any = {
  mode: "classic",
  rtl: false,
  minHeight: "40vh",
  katex: "window.katex",
  imageGalleryUrl:
    "https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo",
  videoFileInput: false,
  tabDisable: false,
  buttonList: [
    [
      "undo",
      "redo",
      "font",
      "fontSize",
      "formatBlock",
      "paragraphStyle",
      "blockquote",
      "bold",
      "underline",
      "italic",
      "strike",
      "subscript",
      "superscript",
      "fontColor",
      "hiliteColor",
      "textStyle",
      "removeFormat",
      "outdent",
      "indent",
      "align",
      "horizontalRule",
      "list",
      "lineHeight",
      "table",
      "link",
      "image",
      "video",
      "audio",
      "math",
      "imageGallery",
      "fullScreen",
      "showBlocks",
      "codeView",
      "preview",
      "print",
      "save",
      "template",
    ],
  ],
};

export const RichTextEditor = (props: SunEditorReactProps) => {
  const editor = useRef<any>();

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor: any) => {
    editor.current = sunEditor;
  };
  return (
    <div>
      <SunEditor
        getSunEditorInstance={getSunEditorInstance}
        width="100%"
        height="100%"
        setOptions={options}
        placeholder="Please type here..."
        autoFocus={true}
        {...props}
      />
    </div>
  );
};
