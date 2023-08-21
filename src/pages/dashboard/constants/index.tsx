import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faCalendarDays } from "@fortawesome/free-regular-svg-icons";

export const DASHBOARD_STATS = [
  {
    title: "Total Events",
    icon: (
      <FontAwesomeIcon icon={faCalendarDays} className="dark-color" size="1x" />
    ),
    stats: 10,
  },
  {
    title: "Total Notifications",
    icon: <FontAwesomeIcon icon={faMessage} className="dark-color" size="1x" />,
    stats: 1000,
  },
  {
    title: "Total Notifications Remaining",
    icon: <FontAwesomeIcon icon={faMessage} className="dark-color" size="1x" />,
    stats: 10,
  },
];
