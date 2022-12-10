import _ from "lodash";
import qs from "qs";

export type KeyValueObject = {
  [key: string]: string | number;
};


export const getErrorMessage = (errors: any) => {
  return (index: string) => {
    return errors && errors[index] ? errors[index]?.message : "";
  };
};

export const removeFalsy = (malformedObject: KeyValueObject) => {
  return _.omitBy(malformedObject, _.isEmpty);
};

export const generateFilterUrl = (
  queryObject: KeyValueObject
): {
  filterUrl: string;
  queryParams: _.Dictionary<string | number>;
} => {
  const newQueryObject = { ...queryObject };
  const queryParams = removeFalsy(newQueryObject as KeyValueObject);
  const filterUrl = qs.stringify(
    {
      filters: {
        ...queryParams,
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  return {
    filterUrl,
    queryParams,
  };
};
