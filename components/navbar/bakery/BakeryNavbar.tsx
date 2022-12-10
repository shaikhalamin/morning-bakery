import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./bakery-navbar.module.css";
import HamBurgerIcon from "../HamBurgerIcon";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import SubmitButton from "@/components/common/form/SubmitButton";
import { useState } from "react";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { Badge } from "react-bootstrap";
import { useBakeryContext } from "context/BakeryContext";

const BakeryNavbar = () => {
  const router = useRouter();
  const [buttonRef, setButtonRef] = useState<number | string>("");
  const { data: session } = useSession();
  const { cartItems, setCartShow } = useBakeryContext();

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className={`${styles.navBgColor} py-4`}
    >
      <Container>
        <Navbar.Brand
          href="/"
          role="general-navbar-brand-role"
          className={`${styles.ft18} ${styles.ftBold}`}
        >
          <span className="text-warning">Sweets & Bakery</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          role="navbar-toggle-role"
          className="border-none"
        >
          <HamBurgerIcon />
        </Navbar.Toggle>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="/"
              className={`text-white ${styles.ft14} fw-normal`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/products/all-items"
              className={`text-white ${styles.ft14} fw-normal`}
            >
              Products
            </Nav.Link>
            <Nav.Link
              href="/about-us"
              className={`text-white ${styles.ft14} fw-normal`}
            >
              About Us
            </Nav.Link>
            <Nav.Link
              href="/contact-us"
              className={`text-white ${styles.ft14} fw-normal`}
            >
              Contact Us
            </Nav.Link>
          </Nav>
          <Nav>
            {!session && (
              <>
                <Nav.Link
                  href="/auth/signin"
                  className={`text-white ${styles.ft14}`}
                >
                  Sign In
                </Nav.Link>
                <Nav.Link
                  href="/auth/signup"
                  className={`text-white ${styles.ft14} mr-2`}
                >
                  Sign Up
                </Nav.Link>
              </>
            )}

            <Nav.Link href="#" className={`text-white ${styles.ft14}`}>
              <FaHeart size={18} />
              <span>
                <sup className="text-white">
                  <Badge bg="danger" className={styles.ft10}>
                    0
                  </Badge>
                </sup>
              </span>
            </Nav.Link>

            <Nav.Link
              className={`text-white ${styles.ft14}`}
              onClick={() => setCartShow(true)}
            >
              <FaCartPlus size={18} />
              <span>
                <sup className="text-white">
                  <Badge bg="danger" className={styles.ft10}>
                    {cartItems.length}
                  </Badge>
                </sup>
              </span>
            </Nav.Link>

            {session && (
              <>
                <SubmitButton
                  title="Dashboard"
                  variant="warning"
                  isLoading={false}
                  btnId="dashboard"
                  btnRef={buttonRef}
                  onClick={async () => {
                    setButtonRef("dashboard");
                    await router.push("/admin/home");
                  }}
                  loadingTitle="Redirecting"
                  buttonCls={`text-dark ${styles.ftBold} ${styles.ft14} rounded-0`}
                  style={{ marginRight: "10px" }}
                />
                <SubmitButton
                  title="Log Out"
                  variant="outline-light"
                  isLoading={false}
                  btnId="log_out"
                  btnRef={buttonRef}
                  onClick={async () => {
                    setButtonRef("log_out");
                    await signOut();
                  }}
                  loadingTitle="Logging out"
                  buttonCls="rounded-0"
                  titleCls="ft-14"
                />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BakeryNavbar;
