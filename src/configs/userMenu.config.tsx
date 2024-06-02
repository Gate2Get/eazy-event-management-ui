import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { ROUTES_MENU, ROUTES_URL } from "../constants";

export const userMenuConfig = [
  {
    key: ROUTES_URL.MY_PROFILE,
    // name: "My profile",
    name: ROUTES_MENU.MY_PROFILE,
    href: `${ROUTES_URL.EE}/${ROUTES_URL.MY_PROFILE}`,
    icon: <PersonIcon fontSize="inherit" />,
  },
  {
    key: ROUTES_URL.MY_PLAN,
    // name: "My plan",
    name: ROUTES_MENU.MY_PLAN,
    href: `${ROUTES_URL.EE}/${ROUTES_URL.MY_PLAN}`,
    icon: <ArticleIcon fontSize="inherit" />,
  },
  {
    key: ROUTES_URL.MY_PLAN_TRANSACTION_HISTORY,
    // name: "Plan transactions",
    name: ROUTES_MENU.MY_PLAN_TRANSACTION_HISTORY,
    href: `${ROUTES_URL.EE}/${ROUTES_URL.MY_PLAN_TRANSACTION_HISTORY}`,
    icon: <HistoryEduIcon fontSize="inherit" />,
  },
  {
    key: ROUTES_URL.SERVICE_TRANSACTION_LOGS,
    // name: "Transaction logs",
    name: ROUTES_MENU.SERVICE_TRANSACTION_LOGS,
    href: `${ROUTES_URL.EE}/${ROUTES_URL.SERVICE_TRANSACTION_LOGS}`,
    icon: <ReceiptLongIcon fontSize="inherit" />,
  },
];
