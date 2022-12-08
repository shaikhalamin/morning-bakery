import {
  MdDashboard,
  MdCall,
  MdLogin,
  MdManageAccounts,
  MdOutlineSettingsSystemDaydream,
  MdOutlineAnalytics,
  MdSettingsApplications,
  MdAutoGraph,
  MdNotificationsActive,
} from "react-icons/md";
import { FaRegUser, FaBuilding, FaHandshake } from "react-icons/fa";
import SingleListItems from "./SingleListItems";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Spinner } from "react-bootstrap";

export type SingleItemProps = {
  id: number;
  name: string;
  url: string;
  icon: CallableFunction;
  onClickFn?: CallableFunction;
};

interface SideNavItems {
  [key: string]: SingleItemProps[];
}

export const sideNavItems = (role: string): SideNavItems => {
  console.log("roles in nav", role);
  const navItems = {
    main: [
      {
        id: 1,
        name: "Dashboard",
        url: "/admin/home",
        icon: (size: number = 21) => <MdDashboard size={size} />,
      },
    ],
    list: [
      {
        id: 3,
        name: "Properties",
        url: "/admin/properties",
        icon: (size: number = 21) => <FaBuilding size={size} />,
      },
      // {
      //   id: 4,
      //   name: "Order",
      //   url: "/admin/orders",
      //   icon: (size: number = 21) => <MdCall size={size} />,
      // },
      // {
      //   id: 5,
      //   name: "Delivery",
      //   url: "/admin/delivery",
      //   icon: (size: number = 21) => <FaHandshake size={size} />,
      // },
    ],
    // service: [
    //   {
    //     id: 6,
    //     name: "System Health",
    //     url: "/admin/sys-health",
    //     icon: (size: number = 21) => (
    //       <MdOutlineSettingsSystemDaydream size={size} />
    //     ),
    //   },
    //   {
    //     id: 7,
    //     name: "Log",
    //     url: "/admin/log",
    //     icon: (size: number = 21) => <MdOutlineAnalytics size={size} />,
    //   },
    //   {
    //     id: 8,
    //     name: "Settings",
    //     url: "/admin/settings",
    //     icon: (size: number = 21) => <MdSettingsApplications size={size} />,
    //   },
    // ],
    // useful: [
    //   {
    //     id: 9,
    //     name: "Stats",
    //     url: "/admin/statistics",
    //     icon: (size: number = 21) => <MdAutoGraph size={size} />,
    //   },
    //   {
    //     id: 10,
    //     name: "Notifications",
    //     url: "/admin/logout",
    //     icon: (size: number = 21) => <MdNotificationsActive size={size} />,
    //   },
    // ],
    user: [
      {
        id: 9,
        name: "Profile",
        url: "/admin/users/profile",
        icon: (size: number = 21) => <MdManageAccounts size={size} />,
      },
      {
        id: 10,
        name: "Logout",
        url: "#",
        icon: (size: number = 21) => <MdLogin size={size} />,
        onClickFn: async () => await signOut(),
      },
    ],
  };

  if (role === "admin") {
    navItems["list"].unshift({
      id: 2,
      name: "Users",
      url: "/admin/users",
      icon: (size: number = 21) => <FaRegUser size={size} />,
    });
  }

  return navItems;
};

const SideNavBar = () => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <Button variant="outline-dark" className="mt-3 ml-3 mb-3">
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span style={{ marginLeft: "5px" }}>Loading...</span>
      </Button>
    );
  } else {
    const role = (session as any).role;
    const sideNavData = sideNavItems(role);
    return (
      <div>
        {Object.keys(sideNavData).map((key, index) => {
          const eachItem = sideNavData[key];
          return <SingleListItems key={index} data={eachItem} name={key} />;
        })}
      </div>
    );
  }
};

export default SideNavBar;
