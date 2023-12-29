import { Space, Typography } from "antd";
import React from "react";
import { BaseReactPlayerProps } from "react-player/base";
import ReactPlayer from "react-player/lazy";
import { NoData } from "../noData";
import "./styles.scss";

const { Paragraph } = Typography;

type VideoPlayerType = BaseReactPlayerProps & {
  isVideoEnable?: boolean;
};

export const VideoPlayer = (props: VideoPlayerType) => {
  const { isVideoEnable, url } = props;
  return (
    <div className="video-player__container">
      {isVideoEnable && url && (
        <div className="video-player">
          <ReactPlayer {...props} />
        </div>
      )}
      ;
      {(!isVideoEnable || !url) && (
        <NoData
          description={
            <div>
              {!isVideoEnable ? (
                <>
                  <p>
                    Video streaming has been deactivated by the event organizer.
                  </p>
                  <p>
                    Kindly request the event organizer to enable video
                    streaming.
                  </p>
                </>
              ) : (
                <>
                  <p>This event does not offer video streaming.</p>
                </>
              )}
            </div>
          }
        />
      )}
      ;
    </div>
  );
};
