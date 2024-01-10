import React, { Dispatch } from "react";
import { Card, Typography } from "antd";
import { ReviewConversationType } from "../../types";
import { useBearStore } from "../../store";
import "./styles.scss";

const { Paragraph } = Typography;

export const ReviewConversation = (props: ReviewConversationType) => {
  const { screen } = useBearStore.appStore();
  console.log({ props });
  const { comments, loggedInUserId } = props;
  let cardStyle = {};
  if (screen === "DESKTOP") {
    cardStyle = {
      textAlign: "left",
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
                  <div style={{ color: "grey" }}>{conv.updatedAt}</div>
                </Card>
              </Paragraph>
            );
          })}
        </Card>
      </div>
    </div>
  );
};
