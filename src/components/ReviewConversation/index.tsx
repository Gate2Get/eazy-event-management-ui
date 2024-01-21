import React, { Dispatch } from "react";
import { Card, Typography } from "antd";
import { ReviewConversationType } from "../../types";
import { useBearStore } from "../../store";
import "./styles.scss";
import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "../../constants";

const { Paragraph } = Typography;

export const ReviewConversation = (props: ReviewConversationType) => {
  const { screen } = useBearStore.appStore();
  const { comments, loggedInUserId } = props;
  let cardStyle = {};
  if (screen === "DESKTOP") {
    cardStyle = {
      textAlign: "left",
      margin: "2% 20%",
    };
  }

  return (
    <div>
      <div className="phone">
        <Card style={cardStyle} className="chat-container">
          {comments?.map((conv) => {
            console.log({ userId: conv.userId, loggedInUserId });
            return (
              <Paragraph id={conv._id}>
                <Card
                  style={{
                    float: loggedInUserId === conv.userId ? "right" : "left",
                  }}
                  className="message sent"
                  bordered={false}
                >
                  <div style={{ float: "right" }}>{conv.comment}</div>
                  <br />
                  <div style={{ color: "grey" }}>
                    {dayjs(conv.updatedAt).format(DATE_TIME_FORMAT)}
                  </div>
                </Card>
              </Paragraph>
            );
          })}
        </Card>
      </div>
    </div>
  );
};
