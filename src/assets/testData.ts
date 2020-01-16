import { DateTime } from "luxon";

export default {
  units: [
    {
      id: 1,
      name: "501"
    },
    {
      id: 2,
      name: "502"
    },
    {
      id: 3,
      name: "503"
    },
    {
      id: 4,
      name: "601"
    },
    {
      id: 5,
      name: "602"
    },
    {
      id: 6,
      name: "603"
    }
  ],
  bookings: [
    {
      id: 1,
      checkIn: DateTime.fromObject({ day: 3 }),
      checkOut: DateTime.fromObject({ day: 6 }),
      units: [2, 4],
      client: "Danica Vujosevic"
    }
  ]
};
