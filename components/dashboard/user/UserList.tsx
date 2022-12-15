import SubmitButton, {
  ButtonSize,
} from "@/components/common/form/SubmitButton";
import { User } from "@/data/model/user";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";

type UserListProps = {
  users: User[];
};

const UserList: React.FC<UserListProps> = ({ users }) => {
  const router = useRouter();
  const [buttonRef, setButtonRef] = useState<number | string>("");
  return (
    <Row className="py-4 px-2">
      <Col className="">
        <Row>
          <Col className="mb-3 mt-2">
            <Button
              className="btn-md btn-primary"
              onClick={() => alert("Insufficient admin permission")}
            >
              + Add User
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Table className="border" responsive>
              <thead>
                <tr>
                  <th>FirstName</th>
                  <th>LastName</th>

                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 &&
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>

                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.role}</td>
                      <td>
                        <SubmitButton
                          title="Edit"
                          variant="warning"
                          isLoading={false}
                          size={ButtonSize.SM}
                          loadingTitle="Redirecting"
                          btnId={user.id}
                          btnRef={buttonRef}
                          onClick={() => {
                            setButtonRef(user.id);
                            router.push(`/dashboard/users/edit/${user.id}`);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default UserList;
