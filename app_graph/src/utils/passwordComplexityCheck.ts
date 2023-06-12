import passwordComplexity from 'joi-password-complexity';

const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4
};

const passwordValidator = passwordComplexity(complexityOptions);

export function validatePassword(password: string) {
  const validationResult = passwordValidator.validate(password);
  if (validationResult.error) {
    // Handle the validation error
    console.error(validationResult.error);
    return false;
  }
  return true;
}
