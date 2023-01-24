export enum EventTag {
  IMPORTANT = "important",
  WORKSHOP = "workshop",
  SIDE_EVENT = "side event",
  GAME = "game",
  FOOD = "food",
  COMPANY_EVENT = "company event",
  SUBMISSION_EXPO = "submission expo",
  CEREMONY = "ceremony",
}

export interface Event {
  name: string;
  startTime: string;
  endTime: string;
  tag: EventTag;
  location: string;
  description: string;
}

export interface ScheduleList {
  start: string;
  eventList: Event[];
}

//
export const fridaySchedule = [
  {
    start: "5:00 PM",
    eventList: [
      {
        name: "Check-In",
        startTime: "5:00 PM",
        endTime: "6:30 PM",
        tag: EventTag.IMPORTANT,
        location: "MLC",
        description: "Check in to UGA Hacks 8",
      },
    ],
  },
  {
    start: "6:30 PM",
    eventList: [
      {
        name: "Opening Ceremony",
        startTime: "6:30 PM",
        endTime: "8:00 PM",
        tag: EventTag.CEREMONY,
        location: "MLC",
        description:
          "Introduction to our event and challenges! See what prizes you can win!",
      },
    ],
  },
  {
    start: "8:00 PM",
    eventList: [
      {
        name: "Dinner",
        startTime: "8:00 PM",
        endTime: "9:00 PM",
        tag: EventTag.FOOD,
        location: "MLC",
        description: "Come eat dinner!", // what food?
      },
    ],
  },
  {
    start: "9:00 PM",
    eventList: [
      {
        name: "BlackRock",
        startTime: "9:00 PM",
        endTime: "10:00 PM",
        tag: EventTag.COMPANY_EVENT,
        location: "MLC",
        description: "Learn about BlackRock and its challenges!",
      },
      {
        name: "Centered Speaker",
        startTime: "9:00 PM",
        endTime: "10:00 PM",
        tag: EventTag.COMPANY_EVENT,
        location: "MLC",
        description: "Speaker",
      },
    ],
  },
  {
    start: "10:00 PM",
    eventList: [
      {
        name: "HPCC",
        startTime: "10:00 PM",
        endTime: "11:00 PM",
        tag: EventTag.COMPANY_EVENT,
        location: "MLC",
        description: "Learn about HPCC and its challenges!",
      },
      {
        name: "State Farm",
        startTime: "10:00 PM",
        endTime: "11:00 PM",
        tag: EventTag.COMPANY_EVENT,
        location: "MLC",
        description: "Learn about State Farm and its challenges!",
      },
    ],
  },
  {
    start: "11:00 PM",
    eventList: [
      {
        name: "First Time Hacker",
        startTime: "11:00 PM",
        endTime: "12:00 AM",
        tag: EventTag.WORKSHOP,
        location: "MLC",
        description: "Learn about hackathons!",
      },
    ],
  },
];
