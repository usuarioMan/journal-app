import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({ ...formState, [name]: value });
  };

  const onReset = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckValues = {};
    for (const formFields of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formFields];
      formCheckValues[`${formFields}Valid`] = fn(formState[formFields]) // fn => bool
        ? null // True
        : errorMessage; // false
    } // => {username: null|error, email: null|error, password: null|error}
    setFormValidation(formCheckValues);
  };

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return;
    }
    return true;
  }, [formValidation]);

  return {
    formState,
    ...formState,
    onInputChange,
    onReset,
    formValidation,
    ...formValidation,
    isFormValid,
  };
};
