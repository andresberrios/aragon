import { DateTime } from "luxon";
import { Booking, Unit } from "../interfaces/hotel";

const data: { units: Unit[]; bookings: Booking[] } = {
  units: [
    {
      id: "1",
      name: "501"
    },
    {
      id: "2",
      name: "502"
    },
    {
      id: "3",
      name: "503"
    },
    {
      id: "4",
      name: "601"
    },
    {
      id: "5",
      name: "602"
    },
    {
      id: "6",
      name: "603"
    }
  ],
  bookings: [
    {
      id: "1",
      client: "Danica Vujošević",
      stays: [
        {
          id: "1",
          unitId: "2",
          checkIn: DateTime.fromObject({ day: 3 }),
          checkOut: DateTime.fromObject({ day: 6 }),
          guests: [
            {
              firstName: "Danica",
              lastName: "Vujošević",
              idType: "passport",
              id: "123456789",
              birthDate: DateTime.fromObject({ day: 9, month: 5, year: 1990 }),
              nationality: "Serbia",
              residence: {
                city: "Barcelona",
                country: "Spain"
              }
            }
          ]
        },
        {
          id: "2",
          unitId: "4",
          checkIn: DateTime.fromObject({ day: 3 }),
          checkOut: DateTime.fromObject({ day: 6 }),
          guests: [
            {
              firstName: "Andrés",
              lastName: "Berríos",
              idType: "passport",
              id: "123456789",
              birthDate: DateTime.fromObject({ day: 9, month: 5, year: 1990 }),
              nationality: "Serbia",
              residence: {
                city: "Barcelona",
                country: "Spain"
              }
            }
          ]
        }
      ]
    },
    {
      id: "2",
      client: "Jorge Berríos",
      stays: [
        {
          id: "3",
          unitId: "2",
          checkIn: DateTime.fromObject({ day: 18 }),
          checkOut: DateTime.fromObject({ day: 22 }),
          guests: [
            {
              firstName: "Jorge",
              lastName: "Berríos",
              idType: "passport",
              id: "123456789",
              birthDate: DateTime.fromObject({ day: 5, month: 10, year: 1960 }),
              nationality: "Chile",
              residence: {
                city: "Santiago",
                country: "Chile"
              }
            }
          ]
        }
      ]
    }
  ]
};

export default data;
