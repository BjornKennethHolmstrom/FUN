// src/lib/validation.ts

export type ValidationError = {
  field: string;
  message: string;
};

export type ValidationResult = {
  isValid: boolean;
  errors: ValidationError[];
};

// Basic validators
export const validators = {
  required: (value: any, fieldName: string): ValidationError | null => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return {
        field: fieldName,
        message: `${fieldName} is required`,
      };
    }
    return null;
  },

  email: (value: string, fieldName: string): ValidationError | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return {
        field: fieldName,
        message: 'Please enter a valid email address',
      };
    }
    return null;
  },

  minLength: (value: string, fieldName: string, min: number): ValidationError | null => {
    if (value.length < min) {
      return {
        field: fieldName,
        message: `${fieldName} must be at least ${min} characters long`,
      };
    }
    return null;
  },

  password: (value: string, fieldName: string): ValidationError | null => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumbers = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar || value.length < 8) {
      return {
        field: fieldName,
        message: 'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters',
      };
    }
    return null;
  },

  arrayMinLength: (value: any[], fieldName: string, min: number): ValidationError | null => {
    if (!Array.isArray(value) || value.length < min) {
      return {
        field: fieldName,
        message: `Please select at least ${min} ${fieldName}`,
      };
    }
    return null;
  },
};

// Step-specific validation
export const validateSignupStep = (step: string, data: any): ValidationResult => {
  const errors: ValidationError[] = [];

  switch (step) {
    case 'basics': {
      const emailError = validators.required(data.email, 'Email') || validators.email(data.email, 'Email');
      const passwordError = validators.required(data.password, 'Password') || validators.password(data.password, 'Password');
      const nameError = validators.required(data.name, 'Name') || validators.minLength(data.name, 'Name', 2);
      
      if (emailError) errors.push(emailError);
      if (passwordError) errors.push(passwordError);
      if (nameError) errors.push(nameError);
      break;
    }

    case 'interests': {
      const interestsError = validators.arrayMinLength(data.interests, 'interests', 1);
      if (interestsError) errors.push(interestsError);
      break;
    }

    case 'journey': {
      const pathError = validators.required(data.startingPath, 'starting path');
      const motivationError = validators.required(data.motivation, 'motivation') || 
                            validators.minLength(data.motivation, 'motivation', 10);
      
      if (pathError) errors.push(pathError);
      if (motivationError) errors.push(motivationError);
      break;
    }

    case 'confirm': {
      const termsError = data.agreeToTerms ? null : {
        field: 'terms',
        message: 'You must agree to the terms to continue',
      };
      
      if (termsError) errors.push(termsError);
      break;
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Custom hook for form validation
export const useFormValidation = (step: string, data: any) => {
  const validate = () => validateSignupStep(step, data);
  
  const getFieldError = (fieldName: string): string | null => {
    const result = validate();
    const error = result.errors.find(err => err.field === fieldName);
    return error ? error.message : null;
  };

  return {
    validate,
    getFieldError,
  };
};
