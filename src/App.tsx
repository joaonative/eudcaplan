import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Hero from "./components/Hero";
import { Plan } from "./interfaces/Plan";
import { createPlan, getPlans } from "./services/Plan";
import PlanCard from "./components/PlanCard";
import { Plus, X } from "lucide-react";
import Button from "./components/Button";
import { ariaLabels, COLORS } from "./constants";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState<Plan[]>(getPlans());

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState<Plan>({
    id: uuidv4(),
    name: "",
    color: "",
    details: [],
    initialDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    schedules: [],
  });

  const isDisabled: boolean =
    !formData.color ||
    !formData.name ||
    !formData.initialDate ||
    !formData.endDate ||
    !formData.id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "initialDate" || name === "endDate") {
      const dateValue = new Date(value);
      if (!isNaN(dateValue.getTime())) {
        setFormData({ ...formData, [name]: dateValue });
      }
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) {
      return;
    }
    createPlan(formData);
    setPlans([...plans, formData]);
    setIsOpen(false);
    navigate(`/planejamento/${formData.id}`);
  };

  return (
    <>
      <section className="flex flex-col gap-5 px-5 lg:px-20">
        <Hero />
        <h1 className="font-bold text-2xl">
          {plans.length >= 1 ? "Seus Planejamentos" : "Crie um Planejamento"}
        </h1>
        {plans && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-4">
            {plans.map((plan) => (
              <PlanCard plan={plan} key={plan.id} />
            ))}
            <button
              onClick={() => setIsOpen(true)}
              className="col-span-1 flex justify-center items-center h-full bg-primary rounded-lg my-shadow"
            >
              <Plus aria-label={ariaLabels.create} color="#FFF" size={48} />
            </button>
          </div>
        )}
      </section>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center lg:px-52 px-2 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg my-shadow flex flex-col gap-5 w-full max-h-screen overflow-y-scroll">
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-xl text-primary">
                Criar Planejamento
              </h1>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bg-red-500 p-2 rounded-full"
              >
                <X aria-label={ariaLabels.close} color="#FFF" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex lg:flex-row flex-col items-center gap-4">
                <label>
                  Nome:
                  <input
                    autoComplete="off"
                    className="form"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </label>
                <div className="w-full">
                  <h2 className="text-xl font-medium">Cor:</h2>
                  <div className="flex items-center justify-between lg:justify-normal lg:gap-2">
                    {COLORS.map((color, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setFormData({ ...formData, color })}
                        className={`h-8 w-8 ${
                          formData.color === color && "border-4 border-black"
                        }`}
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex lg:flex-row flex-col items-center gap-4">
                <label>
                  Data de início:
                  <input
                    autoComplete="off"
                    className="form"
                    type="date"
                    name="initialDate"
                    value={formData.initialDate.toISOString().split("T")[0]}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Data final:
                  <input
                    autoComplete="off"
                    className="form"
                    type="date"
                    name="endDate"
                    value={formData.endDate.toISOString().split("T")[0]}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <Button full shadow sumbit disabled={isDisabled}>
                Salvar Planejamento
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
