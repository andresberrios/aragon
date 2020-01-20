import { DateTime } from "luxon";
import { Booking, Unit } from "../interfaces";

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
      client: "Danica Vujosevic",
      stays: [
        {
          id: "1",
          unitId: "2",
          checkIn: DateTime.fromObject({ day: 3 }),
          checkOut: DateTime.fromObject({ day: 6 }),
          guests: [
            {
              firstName: "Danica",
              lastName: "Vujosevic",
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
    }
  ]
};

export default data;
