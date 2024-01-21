import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { EVENT_STATUS, ROUTES_URL } from "../../../constants";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EventIcon from "@mui/icons-material/Event";
import MessageIcon from "@mui/icons-material/Message";

export const DASHBOARD_STATS = [
  {
    title: "Events",
    icon: <EventIcon />,
    stats: {},
    key: "events",
    url: `${ROUTES_URL.EE}/${ROUTES_URL.EVENT_MANAGEMENT}`,
    urlLabel: "Total",
  },
  {
    title: "Notifications",
    icon: <NotificationsActiveIcon />,
    stats: {},
    key: "notifications",
    url: `${ROUTES_URL.EE}/${ROUTES_URL.EVENT_MANAGEMENT}?status=${EVENT_STATUS.COMPLETED}`,
    urlLabel: "Completed",
  },
  {
    title: "Templates",
    icon: <MessageIcon />,
    stats: {},
    key: "templates",
    url: `${ROUTES_URL.EE}/${ROUTES_URL.EVENT_MANAGEMENT}?status=${EVENT_STATUS.NOT_STARTED}`,
    urlLabel: "Inprogress",
  },
];
