import React from "react";

type PurposeButtonProps = {
  purpose: string;
};

const PurposeBadge: React.FC<PurposeButtonProps> = ({ purpose }) => {
  const purposeCls =
    purpose.toLocaleLowerCase() === "rent" ? "bg-danger" : "bg-warning";

  return (
    <>
      <span className={`badge ${purposeCls} fs-12 fs-normal rounded-0`}>
        {purpose}
      </span>
    </>
  );
};

export default PurposeBadge;
