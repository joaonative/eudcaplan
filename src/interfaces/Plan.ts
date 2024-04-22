export interface Plan {
  id: string;
  name: string;
  color: string;
  initialDate: Date;
  endDate: Date;
  details: PlanDetail[];
  schedules: {
    hour: string;
    activity: string;
  }[];
}

export interface PlanDetail {
  day: string;
  experienceField: string;
  objectives: string;
  development: string;
  observations: string;
}
