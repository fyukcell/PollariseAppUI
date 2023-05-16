import { COUNTRY, POLL_CATEGORY, POLL_SCOPE } from "./constants";
import { Poll, User } from "./models";

export const sampleData: {
  user: User;
  polls: Poll[];
} = {
  user: {
    id: 1,
    phoneNumber: "+1234567890",
    selectedCountry: COUNTRY.UNITED_STATES,
    originCountry: COUNTRY.UNITED_STATES,
    participatedPolls: ["p1"],
    votedOptions: ["o1", "o4"],
  },
  polls: [
    {
      id: "p1",
      title: "Poll 1",
      description: "This is the first sample poll.",
      category: POLL_CATEGORY.DAILY,
      scope: POLL_SCOPE.WORLD,
      questions: [
        {
          id: "q1",
          title: "Question 1",
          description: "This is question 1.",
          options: [
            { id: "o1", question_id: "q1", text: "Option 1", votes: 100 },
            { id: "o2", question_id: "q1", text: "Option 2", votes: 200 },
          ],
        },
        {
          id: "q2",
          title: "Question 2",
          description: "This is question 2.",
          options: [
            { id: "o3", question_id: "q2", text: "Option 1", votes: 300 },
            { id: "o4", question_id: "q2", text: "Option 2", votes: 400 },
          ],
        },
      ],
      participants: 500,
      endDate: "2023-05-01",
      displayUntil: "2023-05-02",
      allowReparticipate: false,
      displayedCountries: [COUNTRY.UNITED_STATES],
      allowedCountries: [COUNTRY.UNITED_STATES],
    },
    {
      id: "p2",
      title: "Poll 2",
      description: "This is the second sample poll.",
      category: POLL_CATEGORY.TIMED,
      scope: POLL_SCOPE.COUNTRY,
      questions: [
        {
          id: "q3",
          title: "Question 1",
          description: "This is question 1.",
          options: [
            { id: "o5", question_id: "q3", text: "Option 1", votes: 100 },
            { id: "o6", question_id: "q3", text: "Option 2", votes: 200 },
          ],
        },
        {
          id: "q4",
          title: "Question 2",
          description: "This is question 2.",
          options: [
            { id: "o7", question_id: "q4", text: "Option 1", votes: 300 },
            { id: "o8", question_id: "q4", text: "Option 2", votes: 400 },
          ],
        },
      ],
      participants: 600,
      endDate: "2023-05-01",
      displayUntil: "2023-05-02",
      allowReparticipate: true,
      displayedCountries: [COUNTRY.UNITED_STATES],
      allowedCountries: [COUNTRY.UNITED_STATES],
    },
  ],
};
