import React from "react";
import { Button, Modal, Space, Typography } from "antd";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { UploadAttachmentDragger } from "../uploadAttachmentDragger";
import { AttachmentType, VirtualLoadQueryType } from "../../types";
import { API } from "../../api";
import { useBearStore } from "../../store";
import { AlbumImageTile } from "../albumImageTile";

const { Text } = Typography;

export const EventAlbum = () => {
  const [isUpload, setIsUpload] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string[]>([]);
  const [isFetchingData, setIsFetchingData] = React.useState(false);
  const [filter, setFilter] = React.useState<VirtualLoadQueryType>({
    offset: 0,
    limit: 5,
  });
  const { selectedEvents, setEventAlbums, eventAlbums } =
    useBearStore.eventStore();
  const { setLoading } = useBearStore.appStore();

  React.useEffect(() => {
    return () => {
      setEventAlbums([]);
      setFilter({
        offset: 0,
        limit: 5,
      });
    };
  }, []);

  const addEventAlbum = (attachments: AttachmentType[]) => {
    setLoading(true);
    API.eventManagement
      .addEventAlbum(selectedEvents.id as string, attachments)
      .then((status) => {
        setLoading(false);
        setIsUpload(false);
        getEventAlbum(true);
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "addEventAlbum", error });
      });
  };

  const deleteEventAlbum = () => {
    setLoading(true);
    API.eventManagement
      .deleteEventAlbum(selectedEvents.id as string, selectedImage)
      .then((status) => {
        setLoading(false);
        setSelectedImage([]);
        getEventAlbum(true);
      })
      .catch((error) => {
        setLoading(false);
        console.log({ location: "deleteEventAlbum", error });
      });
  };

  const getEventAlbum = (isFresh?: boolean) => {
    setIsFetchingData(true);
    const _filter = isFresh
      ? {
          limit: 5,
          offset: 0,
        }
      : filter;
    API.eventManagement
      .getEventAlbum(selectedEvents.id as string, _filter)
      .then((album) => {
        setIsFetchingData(false);
        setEventAlbums(isFresh ? album : [...eventAlbums, ...album]);
        setFilter({
          ...filter,
          offset: isFresh
            ? 0
            : (filter.offset as number) + (filter.limit as number),
        });
      })
      .catch((error) => {
        setIsFetchingData(false);
        console.log({ location: "getEventAlbum", error });
      });
  };

  const onSelectImage = (isChecked: boolean, attachment: AttachmentType) => {
    if (isChecked) {
      setSelectedImage([...selectedImage, attachment.id]);
    } else {
      const _selectedImage = selectedImage.filter(
        (item) => item !== attachment.id
      );
      setSelectedImage(_selectedImage);
    }
  };

  return (
    <div>
      <Modal
        open={isUpload}
        title="Upload Album"
        footer={null}
        width="100%"
        onCancel={() => {
          setIsUpload(false);
        }}
      >
        <UploadAttachmentDragger
          onUploadFile={addEventAlbum}
          uploadUrl="/api/v1/app/file/upload-multiple/eventAlbum"
          accept="image/*"
        />
      </Modal>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div>
          {selectedImage.length ? (
            <Text italic style={{ float: "left" }}>
              {selectedImage?.length || 0}'s selected
            </Text>
          ) : null}
          <Button
            icon={<FileUploadOutlinedIcon fontSize="inherit" />}
            style={{ float: "right" }}
            onClick={() => {
              setIsUpload(true);
            }}
          >
            Upload
          </Button>
          {selectedImage.length ? (
            <Button
              icon={<FileUploadOutlinedIcon fontSize="inherit" />}
              style={{ float: "right", marginRight: "8px" }}
              onClick={deleteEventAlbum}
              danger
            >
              Delete
            </Button>
          ) : null}
        </div>

        <AlbumImageTile
          loading={isFetchingData}
          attachments={eventAlbums}
          handleLoadData={getEventAlbum}
          isEditable
          onSelectImage={onSelectImage}
          selectedImage={selectedImage}
        />
      </Space>
    </div>
  );
};
