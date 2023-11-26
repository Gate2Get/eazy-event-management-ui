import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faCalendarDays } from "@fortawesome/free-regular-svg-icons";

export const DASHBOARD_STATS = [
  {
    title: "Total Events",
    icon: (
      <FontAwesomeIcon icon={faCalendarDays} className="dark-color" size="1x" />
    ),
    stats: 0,
    key: "TOTAL",
  },
  {
    title: "Completed Events",
    icon: <FontAwesomeIcon icon={faMessage} className="dark-color" size="1x" />,
    stats: 0,
    key: "COMPLETED",
  },
  {
    title: "Inprogress Events",
    icon: <FontAwesomeIcon icon={faMessage} className="dark-color" size="1x" />,
    stats: 0,
    key: "INPROGRESS",
  },
];
