// src/utils/models.ts

export interface User {
  id: number;
  phoneNumber: string;
  country: string;
  loggedIn: boolean;
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  category: POLL_TYPE;
  scope: POLL_SCOPE;
  questions: Question[];
  participants: number;
  endDate: string;
  displayUntil: string;
  participated: boolean;
}

export interface PollResult {
  poll_id: string;
  poll_result_verticals: PollResultVertical[];
}

export interface PollResultVertical {
  id: string;
  name: string;
  description: string;
  votes: number;
}

export interface Question {
  id: number;
  title: string;
  description: string;
  options: Option[];
}

export interface OptionVerticalImpact {
  option_vertical: PollResultVertical[];
  option_vertical_weight: number[];
}

export interface Option {
  id: number;
  text: string;
  option_vertical_impact: OptionVerticalImpact[];
}

export enum POLL_SCOPE {
  WORLD,
  COUNTRY,
}

export enum POLL_TYPE {
  DAILY,
  TRENDING,
}

export interface Filter {
  scope: POLL_SCOPE;
  type: POLL_TYPE;
}
