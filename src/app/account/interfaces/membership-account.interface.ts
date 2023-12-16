export interface ResponseMembership {
  id:         number;
  name:       string;
  code:       string;
  startDate:  Date;
  expireDate: Date;
  value:      number;
  renew:      boolean;
  active:     boolean;
  classes:    Class[];
}

export interface Class {
  id:         number;
  code:       string;
  name:       string;
  value:      number;
  startTime:  Date;
  endTime:    Date;
  location:   Location;
  classTypes: ClassTypes;
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
