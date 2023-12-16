import { Class, Page } from "./class.interface";

export interface SearchResponseInstructor {
  _embedded: Embedded;
  _links:    SearchResponseLinks;
  page:      Page;
}

export interface Embedded {
  instructor: Instructor[];
}

export interface Instructor {
  id:        number;
  firstName: string;
  lastName:  string;
  email:     string;
  bios:      string;
  image:     string;
  _links:    InstructorLinks;
}

export interface InstructorLinks {
  self:       Profile;
  instructor: Profile;
  classes:    Profile;
}

export interface Profile {
  href: string;
}

export interface SearchResponseLinks {
  self:    Profile;
  profile: Profile;
}

export interface SearchResponse {
    _embedded: Embedded;
    _links:    SearchResponseLinks;
}

export interface Embedded {
    classes: Class[];
}

export interface ClassLinks {
    self:       Self;
    classes:    Self;
    instructor: Self;
}

export interface Self {
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
    self: Self;
}
