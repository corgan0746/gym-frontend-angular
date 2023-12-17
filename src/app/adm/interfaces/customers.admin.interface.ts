export interface Customer {
  id:             number;
  firstName:      string;
  lastName:       string;
  email:          string;
  active:         boolean;
  phone:          number;
  privileges:     boolean;
  address:        Address | null;
  userMembership: UserMembership | null;
  bookings:       Booking[];
}

export interface Timeslot {
  id:        number;
  startTime: string;
  endTime:   string;
  open:      boolean;
}

export interface Address {
  id:       number;
  street:   string;
  city:     string;
  country:  string;
  postCode: string;
}

export interface Booking {
  id:          number;
  value:       number;
  dateCreated: Date;
  active:      boolean;
  paid:        boolean;
  classes:     Classes;
  reference:   null | string;
  timeslot:    Timeslot;
}

export interface Classes {
  id:         number;
  code:       string;
  name:       string;
  value:      number;
  startTime:  Date;
  endTime:    Date;
  location:   Location;
  classTypes: ClassTypes;
  timeslots?: Timeslot[];
  description?:string;
}

export interface ClassTypes {
  id:   number;
  name: string;
}

export interface Location {
  id:        number;
  direction: string;
  postcode:  string;
  city:      string;
  phone:     string;
}

export interface UserMembership {
  id:         number;
  active:     boolean;
  paid:       boolean;
  endDate:    null;
  renew:      boolean;
  membership: Membership | null;
  reference:  string;
}

export interface Membership {
  id:         number;
  name:       string;
  code:       string;
  startDate:  Date;
  expireDate: Date;
  value:      number;
  renew:      boolean;
  active:     boolean;
}

export interface FieldsErrorsShort {
  firstName:  string;
  lastName:   string;
  email:      string;
  phone:      string;
}
