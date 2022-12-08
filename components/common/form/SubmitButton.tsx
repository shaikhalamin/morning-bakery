import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";

type SubmitButtonProps = {
  title: string;
  isLoading: boolean;
  size?: ButtonSize | undefined;
  loadingTitle?: string;
  onClick?: () => void;
  type?: ButtonType | undefined;
  variant?: string;
  titleCls?: string;
  buttonCls?: string;
  btnRef?: string | number;
  btnId?: string | number;
  style?: { [key: string]: string };
};

export enum ButtonType {
  SUBMIT = "submit",
  RESET = "reset",
  BUTTON = "button",
}

export enum ButtonSize {
  SM = "sm",
  LG = "lg",
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  title,
  size,
  variant = "primary",
  type = ButtonType.SUBMIT,
  loadingTitle = "Submitting",
  titleCls,
  isLoading,
  buttonCls,
  btnRef,
  btnId,
  onClick,
  style,
}) => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    isLoading === true && setLoader(true);
    isLoading === false && setLoader(false);
    if (btnRef !== undefined && btnId !== undefined && btnRef === btnId) {
      setLoader(true);
    }
  }, [isLoading, btnRef, btnId]);

  const spinner = (
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
  );

  return (
    <Button
      size={size}
      variant={variant}
      type={type}
      className={buttonCls ? buttonCls : ""}
      onClick={onClick}
      style={style ? style : {}}
    >
      {loader === true ? (
        <>
          <span>{spinner}</span>
          {loadingTitle && (
            <span style={{ marginLeft: "3px" }} className="ft-12">
              {loadingTitle}...
            </span>
          )}
        </>
      ) : (
        <span
          className={titleCls ? titleCls : ""}
          style={{ marginLeft: "3px" }}
        >
          {title}
        </span>
      )}
    </Button>
  );
};

export default SubmitButton;
