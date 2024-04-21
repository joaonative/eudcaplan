import { Plan } from "../interfaces/Plan";

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
