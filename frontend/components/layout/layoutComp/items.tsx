import { Chip } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { type SidebarItem } from "./sidebar";

/**
 * Please check the https://nextui.org/docs/guide/routing to have a seamless router integration
 */

export const items: SidebarItem[] = [
  {
    key: "doctors",
    href: "/doctors",
    icon: "maki:doctor",
    title: "Doctors",
  },
  {
    key: "slots",
    href: "/slots",
    icon: "simple-line-icons:calender",
    title: "Slots",
  },
  {
    key: "bookings",
    href: "/bookings",
    icon: "mdi:calendar-check",
    title: "Bookings",
  },
];
