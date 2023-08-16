import { required } from '#validation/required';
import { min } from '#validation/minValue';
import { email } from '#validation/email';
import { max } from '#validation/maxValue';
import { integer } from '#validation/integer';
import { toBoolean } from "#validation/toBoolean";
import { trim } from "#validation/trim";
import { escape } from "#validation/escape";
import { whitelist } from "#validation/whitelist";

/**
 * Create a custom validator instance for data validation.
 * @param {object} data - The data to be validated.
 * @returns {object} - The custom validator instance.
 */
export default function validator(data) {
  const errors = {};

  /**
   * Add an error message for a specific field.
   * @param {string} field - The field to which the error belongs.
   * @param {string} message - The error message to add.
   */
  function addError(field, message) {
    if (!errors[field]) {
      errors[field] = [];
    }
    errors[field].push(message);
  }

  /**
   * Check if the validation passes.
   * @returns {boolean} - True if validation passes, otherwise false.
   */
  function passes() {
    return Object.keys(errors).length === 0;
  }

  /**
   * Check if the validation fails.
   * @returns {boolean} - True if validation fails, otherwise false.
   */
  function fails() {
    return !passes();
  }

  const customValidator = {
    required: (field, message) => {
      const error = required(data, field, message);
      if (error) {
        addError(field, error);
      }
      return customValidator;
    },
    min: (field, minLength, message) => {
      const error = min(data, field, minLength, message);
      if (error) {
        addError(field, error);
      }
      return customValidator;
    },
    email: (field, message) => {
      const error = email(data, field, message);
      if (error) {
        addError(field, error);
      }
      return customValidator;
    },
    max: (field, maxLength, message) => {
      const error = max(data, field, maxLength, message);
      if (error) {
        addError(field, error);
      }
      return customValidator;
    },
    whitelist: (field, allowedValues, message) => {
      const error = whitelist(data, field, allowedValues, message);
      if (error) {
        addError(field, error);
      }
      return customValidator;
    },
    integer: (field, message) => {
      const error = integer(data, field, message);
      if (error) {
        addError(field, error);
      }
      return customValidator;
    },
    bool: (field, message) => {
      const error = toBoolean(data, field, message);
      if (error) {
        addError(field, error);
      }
      return customValidator;
    },
    trim: (field, message) => {
      const error = trim(data, field, message);
      if (error) {
        addError(field, error);
      }
      return customValidator;
    },
    escape: (field, message) => {
      const error = escape(data, field, message);
      if (error) {
        addError(field, error);
      }
      return customValidator;
    },
    passes: passes,
    fails: fails,
    errors: errors,
  };

  return customValidator;
}