import ComponentStyles from './ComponentStyles';

export const ALERT_TYPE = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
};

export const ALERT_COLOR = {
  ERROR: ComponentStyles.COLORS.RED,
  SUCCESS: ComponentStyles.COLORS.ALERT_GREEN,
  WARNING: ComponentStyles.COLORS.ORANGE,
};

export const SIGN_UP_SUCCESS_MSG = {
  SIGN_UP_SUCCESS: 'Signup Success',
};
export const SIGN_UP_ERROR_MSG = {
  USER_NAME_EMPTY: 'User name cannot be empty',
  PASSWORD_EMPTY: 'Password cannot be empty',
  RE_PASSWORD_EMPTY: 'Re-type password cannot be empty',
  NAME_EMPTY: 'Name cannot be empty',
  EMAIL_EMPTY: 'Email cannot be empty',
  PHONE_NUMBER_EMPTY: 'Phone number cannot be empty',

  ALL_FIELDS_EMPTY: 'All fields cannot be empty',
  PASSWORD_UNMATCHED: 'Password and Re-type password is not matched',
  PASSWORD_VALIDATION: 'Password should be at least 8 charactors',
  CITY_EMPTY: 'City cannot be empty',

  EMAIL_ALREADY_USER: 'Email already in use',
  INVALID_EMAIL: 'Invalid email',
};

export const REGISTER_VEHICLE_ERROR_MSG = {
  VEHICLE_NAME_EMPTY: 'Vehicle name cannot be empty',
  CITY_EMPTY: 'City cannot be empty',
  IMAGE_VALIDATION: 'Please select 5 images',
  YEAR_EMPTY: 'Year cannot be empty',
  EXPERIENCE_EMPTY: 'Experience cannot be empty',
  DESCRIPTION_EMPTY: 'Description cannot be empty',
};

export const LOGIN_SUCCESS_MSG = {
  LOGIN_SUCCESS: 'Login Success',
};
export const GEAR_TYPES = ['Any', 'Auto', 'Mannual'];

export const FUELS_TYPES = [
  'Any',
  'Petrol',
  'Disel',
  'Electric',
  'Hydbrid',
  'Gas',
];

export const VEHICAL_TYPES = [
  'Car',
  'Van',
  // 'SUV / Jeep',
  // 'Motocycle',
  // 'Crew Cab',
  'Bus',
  // 'Lorry',
  // 'Threewheel',
  // 'Other',
  // 'Tractor',
  // 'Bicycle',
];

export const COMPANY_NAME = 'Hyda';

export const MODAL_TYPES = {
  FUEL_MODAL: 'FUEL_MODAL',
  CITY_MODAL: 'CITY_MODAL',
  GEAR_MODAL: 'GEAR_MODAL',
  VEHICAL_TYPE_MODAL: 'VEHICAL_TYPE_MODAL',
};
