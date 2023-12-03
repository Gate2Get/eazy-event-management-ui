import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { EVENT_STATUS, ROUTES_URL } from "../../../constants";

export const DASHBOARD_STATS = [
  {
    title: "Total Events",
    icon: (
      <FontAwesomeIcon icon={faCalendarDays} className="dark-color" size="xl" />
    ),
    stats: 0,
    key: "TOTAL",
    url: `${ROUTES_URL.EE}/${ROUTES_URL.EVENT_MANAGEMENT}`,
    urlLabel: "Total",
  },
  {
    title: "Completed Events",
    icon: <FontAwesomeIcon icon={faMessage} className="dark-color" size="xl" />,
    stats: 0,
    key: "COMPLETED",
    url: `${ROUTES_URL.EE}/${ROUTES_URL.EVENT_MANAGEMENT}?status=${EVENT_STATUS.COMPLETED}`,
    urlLabel: "Completed",
  },
  {
    title: "Inprogress Events",
    icon: <FontAwesomeIcon icon={faMessage} className="dark-color" size="xl" />,
    stats: 0,
    key: "INPROGRESS",
    url: `${ROUTES_URL.EE}/${ROUTES_URL.EVENT_MANAGEMENT}?status=${EVENT_STATUS.IN_PROGRESS}`,
    urlLabel: "Inprogress",
  },
];
