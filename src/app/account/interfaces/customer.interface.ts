// export interface Customer {
//   id:             number;
//   firstName:      string;
//   lastName:       string;
//   email:          string;
//   active:         boolean;
//   phone:          number;
//   address:        Address;
//   userMembership: UserMembership;
//   bookings:       Booking[];
// }

import { Timeslot } from "src/app/gym/interfaces/class.interface";

// export interface Address {
//   id:       number;
//   street:   string;
//   city:     string;
//   country:  string;
//   postCode: string;
// }

// export interface Booking {
//   id:          number;
//   value:       number;
//   dateCreated: Date;
//   classes:     Classes;
// }

// export interface Classes {
//   id:         number;
//   code:       string;
//   name:       string;
//   value:      number;
//   startTime:  Date;
//   endTime:    Date;
//   location:   Location;
//   classTypes: ClassTypes;
// }

// export interface ClassTypes {
//   id:   number;
//   name: string;
// }

// export interface Location {
//   id:        number;
//   direction: string;
//   postcode:  string;
//   city:      string;
//   phone:     string;
// }

// export interface UserMembership {
//   id:         number;
//   active:     boolean;
//   paid:       boolean;
//   renew:      boolean;
//   membership: Membership;
// }

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

export interface Customer {
  id:             number;
  firstName:      string;
  lastName:       string;
  email:          string;
  active:         boolean;
  phone:          number;
  address:        Address;
  userMembership: UserMembership;
  bookings:       Booking[];
  image?:         string;
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
  endDate:    number;
  renew:      boolean;
  membership: Membership;
  reference:  string;
}

export interface FieldsErrorsShort {
  firstName:  string;
  lastName:   string;
  email:      string;
  phone:      string;
}

// sdsd
