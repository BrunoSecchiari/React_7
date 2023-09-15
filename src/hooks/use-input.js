// import { useState } from 'react';
import { useReducer } from 'react';

const initialInputState = {
  value: '',
  wasTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === 'CHANGE') {
    return { value: action.value, wasTouched: state.wasTouched };
  }
  if (action.type === 'BLUR') {
    return { value: state.value, wasTouched: true };
  }
  if (action.type === 'RESET') {
    return { value: '', wasTouched: false };
  }
  return initialInputState;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  // const [enteredValue, setEnteredValue] = useState('');
  // const [inputWasTouched, setInputWasTouched] = useState(false);

  const valueIsValid = validateValue(inputState.value);
  const inputIsInvalid = !valueIsValid && inputState.wasTouched;

  const inputChangeHandler = (event) => {
    // setEnteredValue(event.target.value);
    dispatch({ type: 'CHANGE', value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    // setInputWasTouched(true);
    dispatch({ type: 'BLUR' });
  };

  const valueResetHandler = () => {
    // setEnteredValue('');
    // setInputWasTouched(false);
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    valueIsValid,
    inputIsInvalid,
    inputBlurHandler,
    inputChangeHandler,
    valueResetHandler,
  };
};

export default useInput;
