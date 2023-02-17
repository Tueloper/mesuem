import joi from '@hapi/joi';
import passwordComplexity from 'joi-password-complexity';

const complexityOPtions = {
  min: 8,
  max: 250,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 3,
};
export const passwordResetEmailSchema = joi.object().keys({
  email: joi.string().email().required()
  .label('Incorrect email pattern'),
});

export const changePasswordSchema = joi.object().keys({
  oldPassword: joi.string(),
  newPassword: new passwordComplexity(complexityOPtions)
    .required(),
  confirmPassword: joi.string()
    .valid(joi.ref('newPassword'))
    .required()
    .options({
      language: {
        any: {
          allowOnly: 'Passwords do not match!',
        }
      }
    })
});
