import React, { ReactNode } from "react";
import { InputGroup, Form, FormText } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

type InputGroupFieldProps = {
  labelTextIcon: ReactNode;
  name: string;
  inputType: string;
  placeholder?: string;
  errorMessage?: string;
};

const InputGroupField: React.FC<InputGroupFieldProps> = ({
  labelTextIcon,
  name,
  inputType,
  placeholder,
  errorMessage,
}) => {
  const { register } = useFormContext();
  return (
    <Form.Group className="mb-3" controlId={name}>
      <InputGroup>
        <InputGroup.Text id={name} className="rounded-0">
          <span>{labelTextIcon}</span>
        </InputGroup.Text>
        <Form.Control
          placeholder={placeholder ? placeholder : ""}
          aria-label={name}
          type={inputType}
          {...register(name)}
          aria-describedby={name}
          className={`${errorMessage ? "is-invalid" : ""} rounded-0`}
        />
      </InputGroup>
      {errorMessage && (
          <FormText className="text-danger">{errorMessage}</FormText>
        )}
    </Form.Group>
  );
};

export default InputGroupField;
