import { Typography } from "antd";
import React from "react";
import { useBearStore } from "../../store";
import "./styles.scss";

const { Title, Paragraph } = Typography;

export const GoogleContactDoc = () => {
  const { screen } = useBearStore.appStore();
  return (
    <div
      style={{ padding: screen === "MOBILE" ? "0px 2rem" : "0px 20rem" }}
      className="google-contact-doc__container"
    >
      <Title level={1}>Exporting Contacts from Google Contacts</Title>

      <Title level={3}>Step 1: Open Google Contacts</Title>
      <Paragraph className="doc-paragraph">
        Visit{" "}
        <i>
          <a href="https://contacts.google.com/" target="_blank">
            Google Contacts
          </a>{" "}
        </i>
        and log in with your Google account.
      </Paragraph>

      <Title level={3}>Step 2: Select Contacts</Title>
      <Paragraph className="doc-paragraph">
        On the left side, select the contacts you want to export. You can select
        all contacts or specific ones.
      </Paragraph>

      <Title level={3}>Step 3: Export Contacts</Title>
      <Paragraph className="doc-paragraph">
        Click on <b>"More"</b> and choose <b>"Export"</b> from the dropdown
        menu.
      </Paragraph>

      <Title level={3}>Step 4: Choose Export Format</Title>
      <Paragraph className="doc-paragraph">
        You can export in various formats in <b>Google CSV</b> or{" "}
        <b>vCard (for iOS Contacts)</b>.
      </Paragraph>

      <Title level={3}>Step 5: Download</Title>
      <Paragraph className="doc-paragraph">
        Click on the <b>"Export"</b> button, and your contacts will be
        downloaded in the chosen format.
      </Paragraph>

      <Paragraph className="doc-paragraph">
        This is the recommended and legitimate way to export contacts from
        Google Contacts. Always ensure you comply with the terms of service and
        privacy policies of the services you are using. Unauthorized scraping or
        exporting of data may lead to account suspension or other consequences.
      </Paragraph>
    </div>
  );
};
