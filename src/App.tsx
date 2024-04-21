import { useState } from "react";
import Hero from "./components/Hero";
import { Plan } from "./interfaces/Plan";
import { getPlans } from "./services/Plan";
import PlanCard from "./components/PlanCard";

function App() {
  const [plans, setPlans] = useState<Plan[]>(getPlans());

  return (
    <>
      <section className="flex flex-col gap-5 px-5 lg:px-20">
        <Hero />
        <h1 className="font-bold text-2xl">Seus Planejamentos</h1>
        {plans && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-4">
            {plans.map((plan) => (
              <PlanCard plan={plan} key={plan.id} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default App;
