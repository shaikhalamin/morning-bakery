import React from "react";
import { Form, FormText } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

interface TextAreaProps {
  labelText: string;
  name: string;
  rows?: number;
  errorMessage?: string;
  labelCls?: string;
}

const TextAreaField: React.FC<TextAreaProps> = ({
  labelText,
  name,
  rows,
  errorMessage,
  labelCls,
}) => {
  const { register } = useFormContext();

  return (
    <Form.Group controlId={name}>
      <Form.Label className={labelCls ? labelCls : ""}>{labelText}</Form.Label>
      <Form.Control
        as="textarea"
        rows={rows ? rows : 3}
        {...register(name)}
        className={`${errorMessage ? "is-invalid" : ""} rounded-0`}
      />
      {errorMessage && (
        <FormText className="text-danger">{errorMessage}</FormText>
      )}
    </Form.Group>
  );
};

export default TextAreaField;
