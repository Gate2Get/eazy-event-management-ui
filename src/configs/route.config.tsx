import React from "react";
import { Authorizer } from "../authorizer";
import { App403 } from "../components/403";
import { App404 } from "../components/404";
import { GoogleContactDoc } from "../components/googleContactDoc";
import { ROUTES_URL } from "../constants";
import { AppLayout } from "../layout";
import { AddCreditToWallet } from "../pages/addCreditToWallet";
import { ContactManagement } from "../pages/contactManagement";
import { ContactUs } from "../pages/contactUs";
import { Dashboard } from "../pages/dashboard";
import { EventManagement } from "../pages/eventManagement";
import { Feedback } from "../pages/feedback";
import { Home } from "../pages/home";
import { MyInvitation } from "../pages/myInvitation";
import { MyProfile } from "../pages/myProfile";
import { Pricing } from "../pages/pricing";
import { PrivacyPolicy } from "../pages/privacyPolicy";
import { ReportBug } from "../pages/reportBug";
import { ReviewTemplate } from "../pages/reviewTemplate";
import { SignIn } from "../pages/signIn";
import { TemplateManagement } from "../pages/templateManagement";
import { TermsOfService } from "../pages/termsOfService";
import { Wallet } from "../pages/wallet";
import { MyPlans } from "../pages/myPlans";
import { ServiceTransactionLogs } from "../pages/serviceTransactionLogs";
import { BuyPlan } from "../pages/buyPlan";
import { PlanPurchaseHistory } from "../pages/planPurchaseHistory";
import { PlanInvoice } from "../pages/planInvoice";
import { App429 } from "../components/429";
import { ContactAuthComplete } from "../pages/contactAuthComplete";

export const APP_ROUTES = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: `${ROUTES_URL.EE}/*`,
    element: <AppLayout />,
  },
  {
    path: ROUTES_URL.AUTHORIZER,
    element: <Authorizer />,
  },
  {
    path: ROUTES_URL.LOGIN,
    element: <SignIn />,
  },
  {
    path: ROUTES_URL.PRIVACY_POLICY,
    element: <PrivacyPolicy />,
  },
  {
    path: ROUTES_URL.TERMS_OF_SERVICE,
    element: <TermsOfService />,
  },
  {
    path: ROUTES_URL.CONTACT_MANAGEMENT_GOOGLE_DOC,
    element: <GoogleContactDoc />,
  },
  {
    path: ROUTES_URL.PRICING,
    element: <Pricing isPricingPage />,
  },
  {
    path: ROUTES_URL.CONTACT_US,
    element: <ContactUs />,
  },
  {
    path: ROUTES_URL.BUY_PLAN,
    element: <BuyPlan />,
  },

  {
    path: ROUTES_URL.FORBIDDEN,
    element: <App403 />,
  },
  {
    path: ROUTES_URL.TOO_MANY_REQUEST,
    element: <App429 />,
  },
  {
    path: ROUTES_URL.CONTACT_AUTH_COMPLETED,
    element: <ContactAuthComplete />,
  },
  {
    path: "*",
    element: <App404 />,
  },
];

export const SERVICE_ROUTES = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: ROUTES_URL.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: ROUTES_URL.CONTACT_MANAGEMENT,
    element: <ContactManagement />,
  },
  {
    path: ROUTES_URL.TEMPLATE_MANAGEMENT,
    element: <TemplateManagement />,
  },
  {
    path: ROUTES_URL.EVENT_MANAGEMENT,
    element: <EventManagement />,
  },
  {
    path: ROUTES_URL.MY_INVITATION,
    element: <MyInvitation />,
  },
  {
    path: ROUTES_URL.REVIEW_TEMPLATES,
    element: <ReviewTemplate />,
  },
  {
    path: ROUTES_URL.MY_PROFILE,
    element: <MyProfile />,
  },
  {
    path: ROUTES_URL.FEEDBACK,
    element: <Feedback />,
  },
  {
    path: ROUTES_URL.REPORT_BUG,
    element: <ReportBug />,
  },

  {
    path: ROUTES_URL.MY_PLAN,
    element: <Pricing />,
  },
  {
    path: ROUTES_URL.MY_PLAN_DETAILS,
    element: <MyPlans />,
  },
  {
    path: ROUTES_URL.SERVICE_TRANSACTION_LOGS,
    element: <ServiceTransactionLogs />,
  },
  {
    path: ROUTES_URL.MY_PLAN_TRANSACTION_HISTORY,
    element: <PlanPurchaseHistory />,
  },
  {
    path: `${ROUTES_URL.MY_PLAN_INVOICE}/:transactionId`,
    element: <PlanInvoice />,
  },
  {
    path: ROUTES_URL.FORBIDDEN,
    element: <App403 />,
  },
  {
    path: ROUTES_URL.TOO_MANY_REQUEST,
    element: <App429 />,
  },
  {
    path: "*",
    element: <App404 />,
  },
];
