import React, { Dispatch } from "react";
import {
  AudioRecorder as ReactAudioRecorder,
  useAudioRecorder,
} from "react-audio-voice-recorder";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Space } from "antd";
import lamejs from "@breezystack/lamejs";

type AudioRecorderType = {
  onUpload?: (blob: Blob) => void;
};

export const AudioRecorder = (props: AudioRecorderType) => {
  const { onUpload } = props;
  const [url, setUrl] = React.useState("");
  const [blob, setBlob]: [Blob, Dispatch<any>] = React.useState(new Blob());

  const recorderControls = useAudioRecorder();

  const decodeAudioData = (arrayBuffer: ArrayBuffer): Promise<AudioBuffer> => {
    return new Promise((resolve, reject) => {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      audioContext.decodeAudioData(arrayBuffer, resolve, reject);
    });
  };

  const floatTo16BitPCM = (input: Float32Array): Int16Array => {
    const output = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++) {
      const s = Math.max(-1, Math.min(1, input[i]));
      output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return output;
  };

  const encodeMP3 = (audioBuffer: AudioBuffer): Uint8Array[] => {
    console.log({ audioBuffer });
    const samples = audioBuffer.getChannelData(0);
    const samples16Bit = floatTo16BitPCM(samples); // Convert Float32Array to Int16Array
    const mp3Encoder = new lamejs.Mp3Encoder(1, audioBuffer.sampleRate, 256);
    const mp3Data: Uint8Array[] = [];
    const sampleBlockSize = 1152;

    for (let i = 0; i < samples16Bit.length; i += sampleBlockSize) {
      const sampleChunk = samples16Bit.subarray(i, i + sampleBlockSize);
      const mp3buf = mp3Encoder.encodeBuffer(sampleChunk);
      if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
      }
    }

    const mp3buf = mp3Encoder.flush();
    if (mp3buf.length > 0) {
      mp3Data.push(mp3buf);
    }

    return mp3Data;
  };

  const onAudio = async (audioBlob: Blob) => {
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBuffer = await decodeAudioData(arrayBuffer);
    const mp3Buffer = encodeMP3(audioBuffer);
    const mp3Blob = new Blob(mp3Buffer, { type: "audio/mp3" });
    const mp3Url = URL.createObjectURL(mp3Blob);
    console.log({ mp3Url });
    setUrl(mp3Url);
    setBlob(mp3Blob);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <div>
        <ReactAudioRecorder
          onRecordingComplete={(blob) => onAudio(blob)}
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
