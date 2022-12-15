import React from "react";
import { Nav } from "react-bootstrap";
import { SingleItemProps } from "./SideNavBar";

type SingleListProps = {
  data: SingleItemProps[];
  name: string;
};

const SingleListItems: React.FC<SingleListProps> = ({ data, name }) => {
  return (
    <div>
      {data.length > 0 && (
        <>
          <div className="px-3 ft-14 mt-4 text-secondary">
            {name.toUpperCase()}
          </div>
          <Nav className="flex-column px-4">
            {data.map((item) => {
              return item.url !== "#" ? (
                <Nav.Link href={item.url} key={item.id}>
                  <span style={{ marginRight: "5px" }}>{item.icon()}</span>
                  <span className="text-dark ft-14">{item.name}</span>
                </Nav.Link>
              ) : (
                <a
                  onClick={async () => {
                    item.onClickFn !== undefined
                      ? await item?.onClickFn()
                      : alert("Function not defined !");
                  }}
                  key={item.id}
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  <span style={{ marginRight: "5px" }}>{item.icon()}</span>
                  <span className="text-dark ft-14">{item.name}</span>
                </a>
              );
            })}
          </Nav>
        </>
      )}
    </div>
  );
};

export default SingleListItems;
