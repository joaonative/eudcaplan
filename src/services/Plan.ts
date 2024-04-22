import { Plan, PlanDetail } from "../interfaces/Plan";

export function getPlans(): Plan[] {
  const localPlans = localStorage.getItem("plans");

  if (!localPlans) {
    return [];
  }

  const plans: Plan[] = JSON.parse(localPlans);
  plans.forEach((plan) => {
    plan.initialDate = new Date(plan.initialDate);
    plan.endDate = new Date(plan.endDate);
  });
  return plans;
}

export function getPlan(id: string): Plan | undefined {
  const localPlans = localStorage.getItem("plans");

  if (!localPlans) {
    return undefined;
  }

  const plans: Plan[] = JSON.parse(localPlans);

  const plan = plans.find((p) => p.id === id);

  return plan;
}

export function createPlan(plan: Plan) {
  const localPlans = localStorage.getItem("plans");

  if (!localPlans) {
    const plans = JSON.stringify([plan]);
    localStorage.setItem("plans", plans);
    return;
  }

  const plans: Plan[] = JSON.parse(localPlans);
  plans.push(plan);

  const days = getWeekdaysArray(plan.initialDate, plan.endDate);

  const planDetails: PlanDetail[] = days.map((day) => ({
    day: formatDay(day),
    experienceField: "",
    objectives: "",
    development: "",
    observations: "",
  }));

  const lastDay = new Date(plan.endDate);
  const nextMonday = new Date(
    lastDay.getFullYear(),
    lastDay.getMonth(),
    lastDay.getDate() + 1
  );
  if (!days.find((day) => isSameDay(day, nextMonday))) {
    planDetails.push({
      day: formatDay(nextMonday),
      experienceField: "",
      objectives: "",
      development: "",
      observations: "",
    });
  }

  plan.details = plan.details.concat(planDetails);

  const newPlans = JSON.stringify(plans);
  localStorage.setItem("plans", newPlans);
}

function getWeekdaysArray(start: Date, end: Date): Date[] {
  const daysArray = [];
  const currentDate = new Date(start);
  while (currentDate <= end) {
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      daysArray.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return daysArray;
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function formatDay(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    weekday: "long",
  };
  return new Intl.DateTimeFormat("pt-BR", options).format(date);
}

export function editPlan(id: string, plan: Plan) {
  const localPlans = localStorage.getItem("plans");

  if (!localPlans) {
    return;
  }

  const plans = JSON.parse(localPlans);

  const index = plans.findIndex((p: Plan) => p.id === id);

  if (index === -1) {
    return;
  }

  plans[index] = plan;
  return localStorage.setItem("plans", JSON.stringify(plans));
}

export function deletePlan(id: string) {
  const localPlans = localStorage.getItem("plans");

  if (!localPlans) {
    return;
  }

  const plans: Plan[] = JSON.parse(localPlans);
  const index = plans.findIndex((p) => p.id === id);

  if (index === -1) {
    return;
  }

  plans.splice(index, 1);
  return localStorage.setItem("plans", JSON.stringify(plans));
}
