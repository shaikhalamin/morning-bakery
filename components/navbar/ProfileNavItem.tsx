import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { Nav, Dropdown, Spinner } from "react-bootstrap";
import { ApiUser } from "@/data/types/auth";
import { useRouter } from "next/router";
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";

const ProfileNavItem = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span style={{ marginLeft: "5px" }}>Loading...</span>
      </>
    );
  } else {
    const user = (session as any).user as ApiUser;
    return (
      <Nav>
        <Dropdown align={"end"}>
          <Dropdown.Toggle
            variant="dark"
            id="dropdown-basic"
            className="text-warning"
          >
            <span className="ft-15 fw-normal">{user.first_name}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="/dashboard/users/profile">
              <span style={{ marginRight: "3px" }}>
                <FaUserCog size={19} className="text-info" />
              </span>
              <span className="ft-14 fw-normal">Profile</span>
            </Dropdown.Item>
            <Dropdown.Item href="/dashboard/home">
              <span style={{ marginRight: "3px" }}>
                <MdDashboard size={19} className="text-info" />
              </span>
              <span className="ft-14 fw-normal">Dashboard</span>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => signOut()}>
              <span style={{ marginRight: "3px" }}>
                <MdLogout size={19} className="text-danger" />
              </span>
              <span className="ft-14 fw-normal">Logout</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    );
  }
};

export default ProfileNavItem;
