import ContactManagementImage from "../assets/svg/contact-management-home.svg";
import TemplateManagementImage from "../assets/svg/template-management-home.svg";
import EventManagementImage from "../assets/svg/event-home.svg";
import DashboardHomeImage from "../assets/svg/dashboard-home.svg";
import InvitationHomeImage from "../assets/svg/Invitation-home.svg";
import { ROUTES_MENU, ROUTES_URL } from "../constants";

export const howIsItWorksContent = [
  {
    image: DashboardHomeImage,
    moduleName: "Dashboard",
    title:
      "Get a quick overview of your event activities with our intuitive and informative dashboard.",
    text: "Your events, at a glance. The Dashboard offers a visual feast - from a mesmerizing donut chart showcasing your last notification to a calendar highlighting your upcoming events. Be in control, stay in style",
  },
  {
    image: ContactManagementImage,
    moduleName: "Contact Management",
    title: "Contact Management Made Easy",
    text: "At Eazy Event, we understand the importance of keeping your guest list organized and accessible. Our Contact Management module empowers you to effortlessly manage your event's guest list by providing a user-friendly interface for uploading and organizing your contacts.",
  },
  {
    image: TemplateManagementImage,
    moduleName: "Template Management",
    title: "Template Management for Personalized Messages",
    text: "Creating heartfelt and impactful event notifications has never been easier. With Eazy Event's Template Management module, you can craft and store message templates for SMS, voice calls, ensuring that your event invitations and updates are not just sent, but are memorable and meaningful.",
  },
  {
    image: EventManagementImage,
    moduleName: "Event Management",
    title: "Effortless Event Management & Notification",
    text: "Bringing your events to life has never been smoother than with Eazy Event's Event Management module. This all-in-one solution empowers you to seamlessly coordinate, schedule, and send event notifications to your contacts via SMS, voice calls.",
  },
  {
    image: InvitationHomeImage,
    moduleName: "Invitations",
    title: "Your VIP Pass to Unforgettable Moments",
    text: "All your invitations, one grand entrance. Dive into the My Invitations hub—your gateway to upcoming events, detailed invites, and immersive media experiences. Be a guest at your own celebration!",
  },
];

export const homeDrawerMenu = [
  {
    label: ROUTES_MENU.PRICING,
    link: ROUTES_URL.PRICING,
  },
  {
    label: ROUTES_MENU.CONTACT_US,
    link: ROUTES_URL.CONTACT_US,
  },
  {
    label: ROUTES_MENU.PRIVACY_POLICY,
    link: ROUTES_URL.PRIVACY_POLICY,
  },
  {
    label: ROUTES_MENU.TERMS_OF_SERVICE,
    link: ROUTES_URL.TERMS_OF_SERVICE,
  },
];
