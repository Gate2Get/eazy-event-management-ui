import React, { Dispatch } from "react";
import {
  AudioRecorder as ReactAudioRecorder,
  useAudioRecorder,
} from "react-audio-voice-recorder";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Space } from "antd";

type AudioRecorderType = {
  onUpload?: (blob: Blob) => void;
};

export const AudioRecorder = (props: AudioRecorderType) => {
  const { onUpload } = props;
  const [url, setUrl] = React.useState("");
  const [blob, setBlob]: [Blob, Dispatch<any>] = React.useState(new Blob());

  const recorderControls = useAudioRecorder();

  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    console.log({ url, blob });
    setUrl(url);
    setBlob(blob);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <div>
        <ReactAudioRecorder
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
          downloadFileExtension="mp3"
          showVisualizer
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          mediaRecorderOptions={{
            mimeType: "audio/mpeg",
          }}
        />
      </div>
      {url && (
        <audio
          className="message sent"
          src={url}
          controls
          style={{ width: "100%", float: "left" }}
        />
      )}
      <Button
        type="primary"
        icon={<CloudUploadIcon fontSize="inherit" />}
        onClick={() => onUpload?.(blob)}
      >
        Upload
      </Button>
    </Space>
  );
};
