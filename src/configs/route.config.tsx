import React from "react";
import { Authorizer } from "../authorizer";
import { App403 } from "../components/403";
import { App404 } from "../components/404";
import { GoogleContactDoc } from "../components/googleContactDoc";
import { ROUTES_URL } from "../constants";
import { AppLayout } from "../layout";
import { ContactManagement } from "../pages/contactManagement";
import { Dashboard } from "../pages/dashboard";
import { EventManagement } from "../pages/eventManagement";
import { Feedback } from "../pages/feedback";
import { Home } from "../pages/home";
import { MyProfile } from "../pages/myProfile";
import { Pricing } from "../pages/pricing";
import { PrivacyPolicy } from "../pages/privacyPolicy";
import { ReportBug } from "../pages/reportBug";
import { ReviewEvent } from "../pages/reviewEvent";
import { SignIn } from "../pages/signIn";
import { TemplateManagement } from "../pages/templateManagement";

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
    path: ROUTES_URL.CONTACT_MANAGEMENT_GOOGLE_DOC,
    element: <GoogleContactDoc />,
  },
  {
    path: ROUTES_URL.PRICING,
    element: <Pricing />,
  },
  {
    path: ROUTES_URL.FORBIDDEN,
    element: <App403 />,
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
    path: ROUTES_URL.REVIEW_EVENTS,
    element: <ReviewEvent />,
    // element: <div></div>,
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
    path: ROUTES_URL.FORBIDDEN,
    element: <App403 />,
  },
  {
    path: "*",
    element: <App404 />,
  },
];
