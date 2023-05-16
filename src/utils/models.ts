// src/utils/models.ts

import { COUNTRY, POLL_CATEGORY, POLL_SCOPE } from "./constants";

export interface User {
  id: number;
  phoneNumber: string;
  selectedCountry: COUNTRY;
  originCountry: COUNTRY;
  participatedPolls: string[];
  votedOptions: string[];
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  category: POLL_CATEGORY;
  scope: POLL_SCOPE;
  questions: Question[];
  participants: number;
  endDate: string;
  displayUntil: string;
  allowReparticipate: boolean;
  displayedCountries: COUNTRY[];
  allowedCountries: COUNTRY[];
}

export interface Question {
  id: string;
  title: string;
  description: string;
  options: Option[];
}

export interface Option {
  id: string;
  question_id: string;
  text: string;
  votes: number;
}

export interface PollFilter {
  scope: POLL_SCOPE;
  type: POLL_CATEGORY;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: POLL_CATEGORY;
  scope: POLL_SCOPE;
  questions: QuizQuestion[];
  participants: number;
  endDate: string;
  displayUntil: string;
  participated: boolean;
  displayedCountries: COUNTRY[];
}

export interface QuizQuestion {
  id: string;
  title: string;
  description: string;
  options: QuizOption[];
}

export interface QuizResult {
  quiz_id: string;
  user_id: string;
  quiz_result_verticals_user: QuizResultVertical[];
  quiz_result_verticals: QuizResultVertical[];
}

export interface QuizResultVertical {
  id: string;
  name: string;
  description: string;
  votes: number;
}

export interface QuizOptionVerticalImpact {
  option_vertical: QuizResultVertical[];
  option_vertical_weight: number[];
}

export interface QuizOption {
  id: string;
  text: string;
  option_vertical_impact: QuizOptionVerticalImpact[];
}
