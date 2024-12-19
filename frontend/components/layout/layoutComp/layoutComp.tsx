"use client";

import React from "react";
import {
  Avatar,
  Button,
  Spacer,
  Tab,
  Tabs,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@nextui-org/react";
import { usePathname } from "next/navigation";

import SidebarDrawer from "./sidebar-drawer";
import Sidebar from "./sidebar";
import { items } from "./items";

/**
 * This example requires installing the `usehooks-ts` and `lodash` packages.
 * `npm install usehooks-ts lodash`
 *
 * import {useMediaQuery} from "usehooks-ts";
 * import {isEqual, uniqWith} from "lodash";
 *
 *
 * 💡 TIP: You can use the usePathname hook from Next.js App Router to get the current pathname
 * and use it as the active key for the Sidebar component.
 *
 * ```tsx
 * import {usePathname} from "next/navigation";
 *
 * const pathname = usePathname();
 * const currentPath = pathname.split("/")?.[1]
 *
 * <Sidebar defaultSelectedKey="home" selectedKeys={[currentPath]} />
 * ```
 */
export default function LayoutComponent({ children }: { children: any }) {
  const pathname = usePathname();
  const currentPath = pathname.split("/")?.[1];
  const { isOpen, onOpenChange } = useDisclosure();
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const onToggle = React.useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  return (
    <div className="flex h-dvh w-full gap-4">
      {/* Sidebar */}
      <SidebarDrawer
        className={cn("min-w-[288px] rounded-lg", {
          "min-w-[76px]": isCollapsed || isMobile,
        })}
        hideCloseButton={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <div
          className={cn(
            "will-change relative flex h-full w-72 flex-col bg-default-100 p-6 transition-width",
            {
              "w-[83px] items-center px-[6px] py-6":
                (isCollapsed || isMobile) && !isOpen,
            }
          )}
        >
          <div
            className={cn("flex items-center gap-3 pl-2", {
              "justify-center gap-0 pl-0": (isCollapsed || isMobile) && !isOpen,
            })}
          >
            <span
              className={cn("w-full text-small font-light opacity-100", {
                "w-0 opacity-0": (isCollapsed || isMobile) && !isOpen,
              })}
            >
              {" "}
            </span>
            <div className={cn("flex-end flex", { hidden: false })}>
              <Icon
                className={cn(
                  "cursor-pointer dark:text-primary-foreground/60 [&>g]:stroke-[1px] transition-transform hover:-translate-x-1",
                  {
                    "rotate-180 hover:translate-x-1":
                      (isCollapsed || isMobile) && !isOpen,
                  }
                )}
                icon="solar:round-alt-arrow-left-line-duotone"
                width={24}
                onClick={isMobile && isCollapsed ? onOpenChange : onToggle}
              />
            </div>
          </div>

          <Spacer y={6} />

          <Sidebar
            defaultSelectedKey="home"
            iconClassName="group-data-[selected=true]:text-default-50"
            isCompact={(isCollapsed || isMobile) && !isOpen}
            itemClasses={{
              base: "px-3 rounded-large data-[selected=true]:!bg-foreground",
              title: "group-data-[selected=true]:text-default-50",
            }}
            items={items}
            selectedKeys={[currentPath]}
          />

          <Spacer y={8} />

          <div
            className={cn("mt-auto flex flex-col", {
              "items-center": (isCollapsed || isMobile) && !isOpen,
            })}
          >
            <Tooltip
              content="Support"
              isDisabled={!isCollapsed || !isMobile || isOpen}
              placement="right"
            >
              <Button
                fullWidth
                className={cn(
                  "justify-start truncate text-default-600 data-[hover=true]:text-foreground",
                  {
                    "justify-center": (isCollapsed || isMobile) && !isOpen,
                  }
                )}
                isIconOnly={(isCollapsed || isMobile) && !isOpen}
                startContent={
                  isCollapsed && !isOpen ? null : (
                    <Icon
                      className="flex-none text-default-600"
                      icon="solar:info-circle-line-duotone"
                      width={24}
                    />
                  )
                }
                variant="light"
                onPress={() => {
                  window.open(
                    "https://wa.me/8696260393?text=Hi%20Ajay%2C%20I%20have%20been%20using%20the%20Appointment%20booking%20system%20you%20created%20and%20I%20need%20some%20help%20regarding%20it.%20%0Alet%20me%20know%20when%20you%20are%20available%20for%20a%20chat",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                {isCollapsed && !isOpen ? (
                  <Icon
                    className="text-default-500"
                    icon="solar:info-circle-line-duotone"
                    width={24}
                  />
                ) : (
                  "Support"
                )}
              </Button>
            </Tooltip>
          </div>
        </div>
      </SidebarDrawer>
      {children}
    </div>
  );
}
