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

export function createPlan(plan: Plan) {
  const localPlans = localStorage.getItem("plans");

  if (!localPlans) {
    const plans = JSON.stringify([plan]);
    return localStorage.setItem("plans", plans);
  }

  let plans: Plan[] = JSON.parse(localPlans);
  plans.push(plan);
  const newPlans = JSON.stringify(plans);
  return localStorage.setItem("plans", newPlans);
}

export function editPlan(id: string, plan: Plan) {
  const planToEdit = getPlan(id);

  if (!planToEdit) {
    return;
  }

  const localPlans = localStorage.getItem("plans");

  if (!localPlans) {
    return;
  }

  let plans = JSON.parse(localPlans);
  plans.push(plan);
  const newPlans = JSON.stringify(plans);
  return localStorage.setItem("plans", newPlans);
}

export function deletePlan(id: string) {
  const localPlans = localStorage.getItem("plans");

  if (!localPlans) {
    return;
  }

  let plans: Plan[] = JSON.parse(localPlans);
  const index = plans.findIndex((p) => p.id === id);

  if (index === -1) {
    return;
  }

  plans.splice(index, 1);
  return localStorage.setItem("plans", JSON.stringify(plans));
}
