import React from "react";
import { Space } from "antd";
import { VirtualLoadQueryType } from "../../types";
import { API } from "../../api";
import { useBearStore } from "../../store";
import { AlbumImageTile } from "../albumImageTile";
import { NoData } from "../noData";

type InvitationAlbumType = {
  isEnabled?: boolean;
};

export const InvitationAlbum = (props: InvitationAlbumType) => {
  const { isEnabled } = props;
  const [isFetchingData, setIsFetchingData] = React.useState(false);
  const [filter, setFilter] = React.useState<VirtualLoadQueryType>({
    offset: 0,
    limit: 5,
  });
  const { selectedInvitation, setEventAlbums, eventAlbums } =
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

  const getEventInvitationAlbum = (isFresh?: boolean) => {
    setIsFetchingData(true);
    API.eventManagement
      .getEventInvitationAlbum(selectedInvitation.id as string, filter)
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

  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }}>
        {isEnabled ? (
          <AlbumImageTile
            loading={isFetchingData}
            attachments={eventAlbums}
            handleLoadData={getEventInvitationAlbum}
          />
        ) : (
          <NoData
            description={
              <div>
                <p>Album has been deactivated by the event organizer.</p>
                <p>Kindly request the event organizer to enable event album.</p>
              </div>
            }
          />
        )}
      </Space>
    </div>
  );
};
