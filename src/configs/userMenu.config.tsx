import PersonIcon from "@mui/icons-material/Person";
import ArticleIcon from "@mui/icons-material/Article";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { ROUTES_URL } from "../constants";

export const userMenuConfig = [
  {
    name: "My profile",
    href: `${ROUTES_URL.EE}/${ROUTES_URL.MY_PROFILE}`,
    icon: <PersonIcon fontSize="inherit" />,
  },
  {
    name: "My plan",
    href: `${ROUTES_URL.EE}/${ROUTES_URL.MY_PLAN}`,
    icon: <ArticleIcon fontSize="inherit" />,
  },
  {
    name: "Plan transactions",
    href: `${ROUTES_URL.EE}/${ROUTES_URL.MY_PLAN_TRANSACTION_HISTORY}`,
    icon: <HistoryEduIcon fontSize="inherit" />,
  },
  {
    name: "Transaction logs",
    href: `${ROUTES_URL.EE}/${ROUTES_URL.SERVICE_TRANSACTION_LOGS}`,
    icon: <ReceiptLongIcon fontSize="inherit" />,
  },
];
