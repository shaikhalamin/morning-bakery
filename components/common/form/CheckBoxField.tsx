import React from "react";
import { Form } from "react-bootstrap";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface CheckFormProps {
  htmlId: string;
  labelText?: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  value: string | number;
  errorMessage?: string;
  labelCls?: string;
  formCheckCls?: string;
}

const CheckForm: React.FC<CheckFormProps> = ({
  htmlId,
  labelText,
  register,
  name,
  value,
  errorMessage,
  labelCls,
  formCheckCls,
}) => {
  const Id = `check-${htmlId}`;
  return (
    <>
      <Form.Group controlId={`htmlId${name.toLowerCase()}`}>
        <Form.Check type={"checkbox"} id={Id} className={formCheckCls}>
          <Form.Check.Input
            {...register(name)}
            type={"checkbox"}
            value={value}
            className={errorMessage ? "is-invalid" : ""}
          />
          <Form.Check.Label className={labelCls}>
            <span className={``}>{labelText}</span>
          </Form.Check.Label>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </Form.Check>
      </Form.Group>
    </>
  );
};

export default CheckForm;
