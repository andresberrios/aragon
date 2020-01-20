import { DateTime } from "luxon";

export interface Unit {
  id: string;
  name: string;
}

export interface Guest {
  firstName: string;
  lastName: string;
  idType: string;
  id: string;
  birthDate: DateTime;
  nationality: string;
  residence: {
    city: string;
    country: string;
  };
}

export interface Stay {
  id: string;
  unitId: string;
  checkIn: DateTime;
  checkOut: DateTime;
  guests: Guest[];
}

export interface Booking {
  id: string;
  client: string;
  stays: Stay[];
}
