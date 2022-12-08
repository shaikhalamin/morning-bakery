import { Row, Col, Nav } from "react-bootstrap";
import AdminNavbar from "../navbar/admin/AdminNavbar";
import SideNavBar from "../navbar/sidebar/SideNavBar";

interface ChildProps {
  children: React.ReactNode;
}
const AdminLayout: React.FC<ChildProps> = ({ children }) => {
  return (
    <>
      <AdminNavbar />
      <Row>
        <Col md="2" className="border">
          <Row>
            <Col className="min-vh-100">
              <SideNavBar />
            </Col>
          </Row>
        </Col>
        <Col md="10">{children}</Col>
      </Row>

      <footer>
        <p>This is footer</p>
      </footer>
    </>
  );
};

export default AdminLayout;
