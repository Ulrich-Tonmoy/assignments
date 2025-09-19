import {
  type CSSProperties,
  type Dispatch,
  type SetStateAction,
  useState,
} from 'react';

const BEARER_TOKEN = '';
const URL =
  'https://api.challenge.hennge.com/password-validation-challenge-api/001';
const PATH = '/challenge-signup';

const ERROR_MESSAGES = {
  validationMsg: {
    passwordTooShort: 'Password must be at least 10 characters long',
    passwordTooLong: 'Password must be at most 24 characters long',
    passwordNoSpaces: 'Password cannot contain spaces',
    passwordNeedsNumber: 'Password must contain at least one number',
    passwordNeedsUpper: 'Password must contain at least one uppercase letter',
    passwordNeedsLower: 'Password must contain at least one lowercase letter',
  },
  apiMsg: {
    unauthorized: 'Not authenticated to access this resource.',
    notAllowed:
      'Sorry, the entered password is not allowed, please try a different one.',
    server: 'Something went wrong, please try again.',
  },
};
enum ErrorCode {
  InvalidRequest = 'invalid_request',
  TooShort = 'too_short',
  TooLong = 'too_long',
  NoWhitespace = 'no_whitespace',
  MissingDigits = 'missing_digits',
  MissingUppercase = 'missing_uppercase',
  MissingLowercase = 'missing_lowercase',
  NotAllowed = 'not_allowed',
}

const messageMap: Record<ErrorCode, string> = {
  [ErrorCode.InvalidRequest]: '',
  [ErrorCode.TooShort]: ERROR_MESSAGES.validationMsg.passwordTooShort,
  [ErrorCode.TooLong]: ERROR_MESSAGES.validationMsg.passwordTooLong,
  [ErrorCode.NoWhitespace]: ERROR_MESSAGES.validationMsg.passwordNoSpaces,
  [ErrorCode.MissingDigits]: ERROR_MESSAGES.validationMsg.passwordNeedsNumber,
  [ErrorCode.MissingUppercase]: ERROR_MESSAGES.validationMsg.passwordNeedsUpper,
  [ErrorCode.MissingLowercase]: ERROR_MESSAGES.validationMsg.passwordNeedsLower,
  [ErrorCode.NotAllowed]: ERROR_MESSAGES.apiMsg.notAllowed,
};

interface SignupRequest {
  username: string;
  password: string;
}

interface ApiResponseSuccess {
  success: boolean;
}

interface ApiResponseFailure extends ApiResponseSuccess {
  errors: ErrorCode[];
}

const signup = async (request: SignupRequest) => {
  return await fetch(`${URL}${PATH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    body: JSON.stringify(request),
  });
};

const validatePassword = (password: string) => {
  const validationErrors = [];

  if (password.length < 10) {
    validationErrors.push(ERROR_MESSAGES.validationMsg.passwordTooShort);
  }
  if (password.length > 24) {
    validationErrors.push(ERROR_MESSAGES.validationMsg.passwordTooLong);
  }
  if (/\s/.test(password)) {
    validationErrors.push(ERROR_MESSAGES.validationMsg.passwordNoSpaces);
  }
  if (!/\d/.test(password)) {
    validationErrors.push(ERROR_MESSAGES.validationMsg.passwordNeedsNumber);
  }
  if (!/[A-Z]/.test(password)) {
    validationErrors.push(ERROR_MESSAGES.validationMsg.passwordNeedsUpper);
  }
  if (!/[a-z]/.test(password)) {
    validationErrors.push(ERROR_MESSAGES.validationMsg.passwordNeedsLower);
  }

  return validationErrors;
};

const getValidationMessages = (errors: ErrorCode[]): string[] => {
  if (!errors || errors.length === 0) {
    return [];
  }

  return errors.map((errorCode) => messageMap[errorCode]);
};

interface CreateUserFormProps {
  setUserWasCreated: Dispatch<SetStateAction<boolean>>;
}

function CreateUserForm({ setUserWasCreated }: CreateUserFormProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordValidationErrors, setPasswordValidationErrors] = useState<
    string[]
  >([]);
  const [apiErrors, setApiErrors] = useState<string[]>([]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPasswordValidationErrors([]);
    setApiErrors([]);

    const validationErrors = validatePassword(password);

    setPasswordValidationErrors(validationErrors);

    if (validationErrors.length === 0) {
      try {
        const res = await signup({ username, password });
        if (res.ok) {
          setUserWasCreated(true);
        } else {
          if (res.status === 401 || res.status === 403) {
            setApiErrors([ERROR_MESSAGES.apiMsg.unauthorized]);
          } else if (res.status === 422) {
            const response: ApiResponseFailure = await res.json();
            const apiErrors = getValidationMessages(response.errors);
            setApiErrors(apiErrors);
          } else if (res.status === 500) {
            setApiErrors([ERROR_MESSAGES.apiMsg.server]);
          }
        }
      } catch (error) {
        setApiErrors([ERROR_MESSAGES.apiMsg.server]);
      }
    }
  };

  return (
    <div style={formWrapper}>
      {apiErrors.length > 0 && (
        <div style={apiErrorContainer}>
          <h3>Api Errors:</h3>
          <ul style={apiErrorMessage}>
            {apiErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form style={form} onSubmit={handleSubmit}>
        {/* make sure the username and password are submitted */}
        {/* make sure the inputs have the accessible names of their labels */}
        <label htmlFor="username" style={formLabel}>
          Username
        </label>
        <input
          id="username"
          autoComplete="username"
          type="text"
          aria-invalid={!username}
          style={formInput}
          value={username}
          onChange={handleUsernameChange}
          required
        />

        <label htmlFor="password" style={formLabel}>
          Password
        </label>
        <input
          id="password"
          // type="password"
          aria-invalid={passwordValidationErrors.length > 0}
          style={{
            ...formInput,
            ...(passwordValidationErrors.length > 0 ? invalidInput : {}),
          }}
          value={password}
          onChange={handlePasswordChange}
          required
        />

        {passwordValidationErrors.length > 0 && (
          <ul style={validationErrorMessage}>
            {passwordValidationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <button type="submit" style={formButton}>
          Create User
        </button>
      </form>
    </div>
  );
}

export { CreateUserForm };

const formWrapper: CSSProperties = {
  maxWidth: '500px',
  width: '80%',
  backgroundColor: '#efeef5',
  padding: '24px',
  borderRadius: '8px',
};

const form: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const formLabel: CSSProperties = {
  fontWeight: 700,
};

const formInput: CSSProperties = {
  outline: 'none',
  padding: '8px 16px',
  height: '40px',
  fontSize: '14px',
  backgroundColor: '#f8f7fa',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: '4px',
};

const formButton: CSSProperties = {
  outline: 'none',
  borderRadius: '4px',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  backgroundColor: '#7135d2',
  color: 'white',
  fontSize: '16px',
  fontWeight: 500,
  height: '40px',
  padding: '0 8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '8px',
  alignSelf: 'flex-end',
  cursor: 'pointer',
};

const validationErrorMessage: CSSProperties = {
  color: 'red',
  padding: '2px 16px',
};

const apiErrorContainer: CSSProperties = {
  border: '2px solid red',
  color: 'red',
  padding: '0px 8px',
};

const apiErrorMessage: CSSProperties = {
  padding: '8px 26px',
  fontWeight: 700,
};

const invalidInput: CSSProperties = {
  borderColor: 'red',
  boxShadow: '0 0 0 1px red',
};
