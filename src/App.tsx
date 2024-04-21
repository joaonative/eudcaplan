import { useState } from "react";
import Hero from "./components/Hero";
import { Plan, PlanDetail } from "./interfaces/Plan";
import { createPlan, getPlans } from "./services/Plan";
import PlanCard from "./components/PlanCard";
import { Plus, X } from "lucide-react";
import Button from "./components/Button";
import { COLORS } from "./constants";

function App() {
  const [plans, setPlans] = useState<Plan[]>(getPlans());

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState<Plan>({
    id: "",
    name: "",
    color: "",
    details: [
      {
        day: "",
        experienceField: "",
        objectives: "",
        development: "",
      },
    ],
    initialDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    schedule: "",
    links: [],
    schedules: [],
  });

  const isDisabled: boolean =
    !formData.color ||
    !formData.details ||
    !formData.name ||
    !formData.schedule ||
    !formData.initialDate ||
    !formData.endDate ||
    !formData.links ||
    !formData.id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "initialDate" || name === "endDate") {
      const dateValue = new Date(value);
      if (!isNaN(dateValue.getTime())) {
        setFormData({ ...formData, [name]: dateValue });

        const initialDate = formData.initialDate.getTime();
        const endDate =
          name === "endDate" ? dateValue.getTime() : formData.endDate.getTime();
        const differenceInDays = Math.ceil(
          (endDate - initialDate) / (1000 * 60 * 60 * 24)
        );

        const newDetails: PlanDetail[] = [];
        for (let i = 0; i <= differenceInDays; i++) {
          const currentDay = new Date(initialDate + i * 24 * 60 * 60 * 1000);
          const dayOfWeek = [
            "Domingo",
            "Segunda-feira",
            "Terça-feira",
            "Quarta-feira",
            "Quinta-feira",
            "Sexta-feira",
            "Sábado",
          ][currentDay.getDay()];
          const formattedDate = `${currentDay.getDate()}/${
            currentDay.getMonth() + 1
          } ${dayOfWeek}`;
          const detail: PlanDetail = {
            day: formattedDate,
            experienceField: "",
            objectives: "",
            development: "",
          };
          newDetails.push(detail);
        }

        setFormData((prevFormData) => ({
          ...prevFormData,
          details: newDetails,
        }));
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
              className="col-span-1 flex justify-center py-12 bg-primary rounded-lg my-shadow"
            >
              <Plus color="#FFF" />
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
                onClick={() => setIsOpen(false)}
                className="bg-red-500 p-2 rounded-full"
              >
                <X color="#FFF" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex lg:flex-row flex-col items-center gap-4">
                <label>
                  Nome:
                  <input
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
                    {COLORS.map((color) => (
                      <button
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
                    className="form"
                    type="date"
                    name="endDate"
                    value={formData.endDate.toISOString().split("T")[0]}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <label>
                Links úteis:
                {formData.links.map((link, index) => (
                  <div className="form flex items-center justify-between">
                    <input
                      className="w-full"
                      key={index}
                      type="text"
                      value={link}
                      onChange={(e) => {
                        const newLinks = [...formData.links];
                        newLinks[index] = e.target.value;
                        setFormData({ ...formData, links: newLinks });
                      }}
                    />
                    <button
                      onClick={() => {
                        const links = [...formData.links.splice(index, 1)];
                        setFormData({ ...formData, links });
                      }}
                    >
                      <X />
                    </button>
                  </div>
                ))}
                <Button
                  full
                  onclick={() =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      links: [...prevFormData.links, ""],
                    }))
                  }
                >
                  Adicionar Link
                </Button>
              </label>
              <label className="flex flex-col">
                Detalhes:
                {formData.details.map((detail, index) => (
                  <div
                    key={index}
                    className="w-full flex flex-col border-2 border-primary p-2"
                  >
                    <div className="flex lg:flex-row flex-col items-center gap-4">
                      <label>
                        Dia:
                        <input
                          className="form"
                          type="text"
                          value={detail.day}
                          onChange={(e) => {
                            const newDetails = [...formData.details];
                            newDetails[index].day = e.target.value;
                            setFormData({ ...formData, details: newDetails });
                          }}
                        />
                      </label>
                      <label>
                        Campo de Experiência:
                        <input
                          className="form"
                          type="text"
                          value={detail.experienceField}
                          onChange={(e) => {
                            const newDetails = [...formData.details];
                            newDetails[index].experienceField = e.target.value;
                            setFormData({ ...formData, details: newDetails });
                          }}
                        />
                      </label>
                    </div>
                    <div className="flex lg:flex-row flex-col items-center gap-4">
                      <label>
                        Objetivos:
                        <input
                          className="form"
                          type="text"
                          value={detail.objectives}
                          onChange={(e) => {
                            const newDetails = [...formData.details];
                            newDetails[index].objectives = e.target.value;
                            setFormData({ ...formData, details: newDetails });
                          }}
                        />
                      </label>
                      <label>
                        Desenvolvimento:
                        <input
                          className="form"
                          type="text"
                          value={detail.development}
                          onChange={(e) => {
                            const newDetails = [...formData.details];
                            newDetails[index].development = e.target.value;
                            setFormData({ ...formData, details: newDetails });
                          }}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </label>
              <label>
                Horários:
                {formData.schedules.map((schedule, index) => (
                  <div key={index}>
                    <label>
                      Atividade:
                      <input
                        className="form"
                        type="text"
                        value={schedule.activity}
                        onChange={(e) => {
                          const newSchedules = [...formData.schedules];
                          newSchedules[index].activity = e.target.value;
                          setFormData({ ...formData, schedules: newSchedules });
                        }}
                      />
                    </label>
                    <label>
                      Hora:
                      <div className="form">value={schedule.hour}</div>
                    </label>
                  </div>
                ))}
              </label>
              <Button disabled={isDisabled} full>
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
