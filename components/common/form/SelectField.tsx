import React from "react";
import { Form, FormText } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

type GenericArray = {
  id: number | string;
  name: string;
};

interface SelectFormProps {
  labelText: string;
  fieldName: string;
  selectData: GenericArray[];
  errorMessage?: string;
  labelCls?: string;
  formCheckCls?: string;
}

const SelectField: React.FC<SelectFormProps> = ({
  labelText,
  fieldName,
  selectData,
  errorMessage,
  labelCls,
  ...props
}) => {
  const { register } = useFormContext();
  return (
    <Form.Group controlId={`htmlId${fieldName.toLowerCase()}`}>
      <Form.Label className={labelCls}>{labelText}</Form.Label>
      <Form.Select
        defaultValue={"Select"}
        {...register(fieldName)}
        className={errorMessage ? "is-invalid" : ""}
        {...props}
      >
        <option>Select {labelText}</option>
        {selectData.map((item, index) => {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </Form.Select>
      {errorMessage && (
        <FormText className="text-danger">{errorMessage}</FormText>
      )}
    </Form.Group>
  );
};

export default SelectField;
