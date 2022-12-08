import React from "react";
import { Form, FormText } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
interface InputFormProps {
  labelText: string;
  name: string;
  inputType: string;
  errorMessage?: string;
  labelCls?: string;
  formCheckCls?: string;
}

export const InputField: React.FC<InputFormProps> = ({
  labelText,
  name,
  inputType,
  errorMessage,
  labelCls,
  ...props
}) => {

  const { register } = useFormContext();

  return (
    <Form.Group controlId={name}>
      <Form.Label className={labelCls}>{labelText}</Form.Label>
      <Form.Control
        type={inputType ? inputType : "text"}
        {...register(name)}
        autoComplete="off"
        className={errorMessage ? "is-invalid" : ""}
        {...props}
      />
      {errorMessage && (
        <FormText className="text-danger">{errorMessage}</FormText>
      )}
    </Form.Group>
  );
};
