export interface UserCred {
  email: string;
  password: string;
}

export interface User {
  firstName:      string;
  email:          string;
}

export interface LoginError {
  code:           string;
  message:        string;
}

export interface UserResponse {
  id:             number;
  firstName:      string;
  lastName:       string;
  email:          string;
  phone:          number;
  active:         boolean;
  privileges:     boolean;
  userMembership: UserMembership;
  image?:         string;
  bookings:       Booking[];
  _links:         SearchResponseLinks;
}

export interface SearchResponseLinks {
  self:     CustomerReference;
  customer: CustomerReference;
}

export interface CustomerReference {
  href: string;
}

export interface Booking {
  id:          number;
  value:       number;
  dateCreated: Date;
  _links:      BookingLinks;
}

export interface BookingLinks {
  customer: CustomerReference;
  classes:  CustomerReference;
}

export interface UserMembership {
  id:     number;
  active: boolean;
  paid:   boolean;
  renew:  boolean;
  _links: UserMembershipLinks;
}

export interface UserMembershipLinks {
  membership: CustomerReference;
}

export interface UserRegister {
  firstName:  string;
  lastName:   string;
  email:      string;
  password:   string;
  phone:      number;
  postcode:   string;
  country:    string;
  city:       string;
  address:    string;
}


//
