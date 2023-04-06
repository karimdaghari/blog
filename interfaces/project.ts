import type { IShared } from './shared';

export interface IProject extends IShared {
  startDate: string;
  endDate?: string;
  links?: {
    website?: string;
    github?: string;
  };
  tagline: string;
  problem: string;
  solution: string;
  tools: Record<string, string | undefined>;
  logo: string;
  screenshots: string[];
}
