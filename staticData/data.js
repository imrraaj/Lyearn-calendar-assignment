import image_1 from "../assets/images/image_1.png";
import image_2 from "../assets/images/image_2.png";
import image_3 from "../assets/images/image_3.png";
import image_4 from "../assets/images/image_4.png";
import image_5 from "../assets/images/image_5.png";

// Only used for local images that can't be dynamically imported using path in the data object

const data = [
  {
    date: new Date("Fri, 12 December 2021 12:00"),
    events: [
      {
        img_url: image_1,
        title: "3 Dimensional Connections",
        time: "8:30 AM - 12:00 PM IST",
        duration: "30 min",
        status: "Finished",
      },
      {
        img_url: image_2,
        title:
          "The Next Billion and the Rise of Irrational Design by Payal Arora",
        time: "6:00 PM - 13 Feb, 9:30 PM IST",
        duration: "2 days",
        status: "Registered",
      },
      {
        img_url: image_3,
        title: "Designing your life",
        time: "1:30 - 2:30 PM IST",
        duration: "45 min",
        status: "Upcoming",
        registered: 112,
        seats_left: 22,
      },
    ],
  },
  {
    date: new Date("Sat, 27 December 2021 12:00 "),
    events: [
      {
        img_url: image_4,
        title: "The Accidental Design Leader",
        time: "4:30 - 5:30 PM IST",
        duration: "40 min",
        status: "Booked",
      },
      {
        img_url: image_5,
        title: "Sprinklr Gold Deck",
        time: "3:00 PM - 5:30 PM IST",
        duration: "20 min",
        status: "Upcoming",
        registered: 112,
        seats_left: 3,
      },
    ],
  },
];

export default data;
