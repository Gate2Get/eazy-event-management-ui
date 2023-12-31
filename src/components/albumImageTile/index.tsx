import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Avatar,
  Card,
  Checkbox,
  Col,
  Divider,
  Image,
  Input,
  List,
  Row,
  Skeleton,
} from "antd";
import { useBearStore } from "../../store";
import { useWindowSize } from "../../hooks/useWindowSize";
import { AttachmentType } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";

const { Meta } = Card;

type AlbumImageTileType = {
  attachments: AttachmentType[];
  loading: boolean;
  handleLoadData: () => void;
  isEditable?: boolean;
  onSelectImage?: (isChecked: boolean, attachment: AttachmentType) => void;
  selectedImage?: string[];
};

export const AlbumImageTile = (props: AlbumImageTileType) => {
  const { screen } = useBearStore.appStore();
  const { width } = useWindowSize();
  const {
    attachments,
    loading,
    handleLoadData,
    isEditable,
    selectedImage,
    onSelectImage,
  } = props;

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    handleLoadData();
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  const renderItem = (item: AttachmentType) => {
    return (
      <Card
        hoverable
        style={{ margin: "8px" }}
        cover={
          <Image
            style={{
              textAlign: "center",
            }}
            src={item.url}
          />
        }
        onClick={(event) => {
          isEditable &&
            onSelectImage?.(!selectedImage?.includes(item.id), item);
        }}
      >
        {isEditable && (
          <Row gutter={[8, 8]}>
            <Col span={22}>{item.name}</Col>
            {selectedImage?.includes(item.id) && (
              <Col span={2}>
                <Checkbox
                  checked
                  onChange={(event) => {
                    onSelectImage?.(event.target.checked, item);
                  }}
                  style={{ position: "relative", top: "4px" }}
                />
              </Col>
            )}
          </Row>
        )}
      </Card>
    );
  };

  return (
    <div
      id="scrollableAlbumImageDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 18px",
      }}
    >
      <InfiniteScroll
        dataLength={attachments.length}
        next={loadMoreData}
        hasMore={attachments.length < 50}
        loader={loading && <Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableAlbumImageDiv"
      >
        <Image.PreviewGroup
          preview={{
            onChange: (current, prev) =>
              console.log(`current index: ${current}, prev index: ${prev}`),
          }}
        >
          <List
            grid={{
              gutter: [8, 8],
              column: screen === "MOBILE" ? 2 : 3,
            }}
            dataSource={attachments}
            renderItem={renderItem}
          />
        </Image.PreviewGroup>
      </InfiniteScroll>
    </div>
  );
};
