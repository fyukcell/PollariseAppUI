// src/utils/sample_data.ts

import {
  User,
  Poll,
  Question,
  Option,
  OptionVerticalImpact,
  PollResult,
  PollResultVertical,
  POLL_SCOPE,
  POLL_TYPE,
} from "./models";

const sampleUsers: User[] = [
  {
    id: 1,
    phoneNumber: "1234567890",
    country: "US",
    loggedIn: true,
  },
  {
    id: 2,
    phoneNumber: "0987654321",
    country: "UK",
    loggedIn: false,
  },
];

const samplePollResultsVerticals: PollResultVertical[] = [
  {
    id: "v1",
    name: "Vertical 1",
    votes: 100,
  },
  {
    id: "v2",
    name: "Vertical 2",
    votes: 200,
  },
];

const sampleOptionVerticalImpact: OptionVerticalImpact[] = [
  {
    option_vertical: samplePollResultsVerticals,
    option_vertical_weight: [0.5, 0.5],
  },
  {
    option_vertical: samplePollResultsVerticals,
    option_vertical_weight: [0.7, 0.3],
  },
];

const sampleOptionVerticalImpact2: OptionVerticalImpact[] = [
  {
    option_vertical: samplePollResultsVerticals,
    option_vertical_weight: [0.3, 0.3],
  },
  {
    option_vertical: samplePollResultsVerticals,
    option_vertical_weight: [0.7, 0.3],
  },
];

const sampleOptions: Option[] = [
  {
    id: 1,
    text: "Option 1",
    option_vertical_impact: sampleOptionVerticalImpact,
  },
  {
    id: 2,
    text: "Option 2",
    option_vertical_impact: sampleOptionVerticalImpact2,
  },
];

const sampleQuestions: Question[] = [
  {
    id: 1,
    title: "Question 1",
    description: "This is a sample question 1.",
    options: sampleOptions,
  },
  {
    id: 2,
    title: "Question 2",
    description: "This is a sample question 2.",
    options: sampleOptions,
  },
];

const samplePolls: Poll[] = [
  {
    id: "1",
    title: "Sample Poll 1",
    description: "This is a sample poll 1.",
    category: POLL_TYPE.DAILY,
    scope: POLL_SCOPE.WORLD,
    questions: sampleQuestions,
    participants: 300,
    endDate: "2023-05-01",
    displayUntil: "2023-05-07",
    participated: false,
  },
  {
    id: "2",
    title: "Sample Poll 2",
    description: "This is a sample poll 2.",
    category: POLL_TYPE.TRENDING,
    scope: POLL_SCOPE.COUNTRY,
    questions: sampleQuestions,
    participants: 200,
    endDate: "2023-05-10",
    displayUntil: "2023-05-15",
    participated: true,
  },
];

const samplePollResults: PollResult[] = [
  {
    poll_id: "1",
    poll_result_verticals: samplePollResultsVerticals,
  },
  {
    poll_id: "2",
    poll_result_verticals: samplePollResultsVerticals,
  },
];

export {
  sampleUsers,
  samplePolls,
  sampleQuestions,
  sampleOptions,
  samplePollResults,
};
