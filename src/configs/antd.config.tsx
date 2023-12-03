import { createStyles, useTheme } from "antd-style";
import { Theme } from "antd/es/config-provider/context";

export const useModalStyle = createStyles(({ token }) => ({
  "my-modal-body": {
    background: "rgba(18, 183, 106, 0.12)",
    padding: token.paddingSM,
  },
  "my-modal-mask": {
    // boxShadow: `inset 0 0 15px #fff`,
  },
  "my-modal-header": {
    borderBottom: `1px solid rgb(18, 183, 106)`,
  },
  "my-modal-footer": {
    color: token.colorPrimary,
  },
  "my-modal-content": {
    // border: "1px solid #333",
  },
}));

export const modalClassNames = (styles: any) => ({
  body: styles["my-modal-body"],
  mask: styles["my-modal-mask"],
  header: styles["my-modal-header"],
  footer: styles["my-modal-footer"],
  content: styles["my-modal-content"],
});

export const modalStyles = (token: any) => ({
  header: {
    borderLeft: `5px solid rgb(18, 183, 106)`,
    borderRadius: 0,
    paddingInlineStart: 5,
  },
  body: {
    // boxShadow: "inset 0 0 5px #999",
    borderRadius: 5,
    textAlign: "center",
  },
  mask: {
    // backdropFilter: "blur(5px)",
  },
  footer: {},
  content: {
    // boxShadow: "0 0 30px #999",
  },
});
