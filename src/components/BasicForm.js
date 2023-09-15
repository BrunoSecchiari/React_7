import useInput from '../hooks/use-input';

const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.includes('@');

const BasicForm = (props) => {
  const {
    value: enteredName,
    valueIsValid: enteredNameIsValid,
    inputIsInvalid: nameInputIsInvalid,
    inputChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    valueResetHandler: enteredNameResetHandler,
  } = useInput(isNotEmpty);

  const {
    value: enteredEmail,
    valueIsValid: enteredEmailIsValid,
    inputIsInvalid: emailInputIsInvalid,
    inputChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    valueResetHandler: enteredEmailResetHandler,
  } = useInput(isEmail);

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(enteredName);
    enteredNameResetHandler();

    console.log(enteredEmail);
    enteredEmailResetHandler();
  };

  const inputClassesHandler = (input) => {
    if (input) {
      return 'form-control invalid';
    } else {
      return 'form-control';
    }
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={inputClassesHandler(nameInputIsInvalid)}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          value={enteredName}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameInputIsInvalid && (
          <p className='error-text'>Please enter a valid name</p>
        )}
      </div>
      <div className={inputClassesHandler(emailInputIsInvalid)}>
        <label htmlFor='email'>Your Email</label>
        <input
          type='email'
          id='email'
          value={enteredEmail}
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {emailInputIsInvalid && (
          <p className='error-text'>Please enter a valid email</p>
        )}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
