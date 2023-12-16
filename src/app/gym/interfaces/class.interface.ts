export interface SearchResponse {
  _embedded: Embedded;
  _links:    SearchResponseLinks;
  page:      Page;
}

export interface Embedded {
  classes: Class[];
}

export interface Class {
  id:         number;
  code:       string;
  name:       string;
  value:      number;
  startTime:  Date;
  endTime:    Date;
  location:   Location;
  description?:string;
  classTypes: ClassTypes;
  timeslots?: Timeslot[];
  image?:     string;
  // _links:     ClassLinks;
}

export interface Timeslot {
  id:        number;
  startTime: string;
  endTime:   string;
  open:      boolean;
}

export interface ClassLinks {
  self:       Profile;
  classes:    Profile;
  instructor: Profile;
}

export interface Profile {
  href: string;
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

export interface SearchResponseLinks {
  self:    Profile;
  profile: Profile;
  search:  Profile;
}

export interface Page {
  size:          number;
  totalElements: number;
  totalPages:    number;
  number:        number;
}
