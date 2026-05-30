export interface SignupPayload {
  first_name: string;
  last_name?: string;
  email: string;
  home_state: string;
  current_city: string;
  spice_tolerance: string;
  food_pref: string;
  otp: string;
}

export interface LoginPayload {
  email: string;
  otp: string;
}

export interface OtpPayload {
  email: string;
}
