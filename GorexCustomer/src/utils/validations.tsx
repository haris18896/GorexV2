import * as yup from 'yup';

const isEmailValid = (email: any) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const RegisterFormFields = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
};

export const loginFormFields = {
  phoneNumber: '',
  password: '',
};
export const changePasswordFormFields = {
  password: '',
  confirmPassword: '',
};
export const forgotFormFields = {
  phoneNumber: '',
};
export const updatePasswordFormFields = {
  password: '',
  currentPassword: '',
  confirmPassword: '',
};

export const LoginVS = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d{9}$/, 'Please provide a valid phone number'),
  password: yup
    .string()
    .min(4, 'Password must be at least 4 characters')
    .required('Password Required'),
});

export const RegisterVS = yup.object().shape({
  firstName: yup.string().required('First Name Required'),
  lastName: yup.string().required('Last Name Required'),
  email: yup
    .string()
    .email('Please Enter Valid Email')
    .test('email', 'Invalid Email Address', value => isEmailValid(value))
    .required('Email Address Required')
    .label('email'),
  phoneNumber: yup
    .string()
    .required('Phone Number Required')
    .matches(/^\d{9}$/, 'Please provide a valid phone number'),
  password: yup
    .string()
    .min(4, 'Password must be at least 4 characters')
    .required('New Password Required'),
  confirmPassword: yup
    .string()
    .min(4, 'Password must be at least 4 characters')
    .required('Confirm New Password Required')
    .oneOf([yup.ref('password'), null], 'New Passwords do not match'),
});

export const ChangePasswordVS = yup.object().shape({
  password: yup
    .string()
    .min(4, 'Password must be at least 4 characters')
    .required('New Password Required'),

  confirmPassword: yup
    .string()
    .min(4, 'Password must be at least 4 characters')
    .required('Confirm New Password Required')
    .oneOf([yup.ref('password'), null], 'New Passwords do not match'),
});

export const UpdatePasswordVS = yup.object().shape({
  password: yup
    .string()
    .min(4, 'Password must be at least 4 characters')
    .required('New Password Required'),

  currentPassword: yup
    .string()
    .min(4, 'Password must be at least 4 characters')
    .required('Current Password Required'),

  confirmPassword: yup
    .string()
    .min(4, 'Password must be at least 4 characters')
    .required('Confirm New Password Required')
    .oneOf([yup.ref('password'), null], 'New Passwords do not match'),
});

export const ForgotPasswordVS = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Phone Number Required')
    .matches(/^\d{9}$/, 'Please provide a valid phone number'),
});
