import { Class, Page } from "./class.interface";

export interface SearchResponseMembership {
  _embedded: Embedded;
  _links:    SearchResponseLinks;
  page:      Page;
}

export interface Embedded {
  membership: Membership[];
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
  image?:     string;
}


export interface MembershipLinks {
  self:       Profile;
  membership: Profile;
}

export interface Profile {
  href: string;
}

export interface SearchResponseLinks {
  self:    Profile;
  profile: Profile;
  search:  Profile;
}

export interface ResponseMembershipAndClasses {
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
