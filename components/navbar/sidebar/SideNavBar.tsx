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
  const navItems: SideNavItems = {
    main: [
      {
        id: 1,
        name: "Dashboard",
        url: "/dashboard/home",
        icon: (size: number = 21) => <MdDashboard size={size} />,
      },
    ],
    list: [],
    user: [
      {
        id: 9,
        name: "Profile",
        url: "/dashboard/users/profile",
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
    const adminRoutes: SingleItemProps[] = [
      {
        id: 2,
        name: "Users",
        url: "/dashboard/users",
        icon: (size: number = 21) => <FaRegUser size={size} />,
      },
      {
        id: 3,
        name: "Products",
        url: "/dashboard/products",
        icon: (size: number = 21) => <FaBuilding size={size} />,
      },
    ];
    navItems.list = adminRoutes;
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
