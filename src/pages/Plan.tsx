import { useState } from "react";
import { Plan as IPlan, myPlan } from "../interfaces/Plan";
import {
  CalendarMinus,
  CalendarPlus,
  NotebookPen,
  Pencil,
  Trash2,
} from "lucide-react";
import Button from "../components/Button";

const Plan = () => {
  const [plan, setPlan] = useState<IPlan | undefined>(myPlan);

  if (!plan) {
    return null;
  }

  return (
    <section className="flex flex-col gap-5 px-5 lg:px-20">
      <div className="w-full flex flex-col gap-5 rounded-xl p-5 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <NotebookPen color={plan.color} />
            <h1 className="lg:text-xl font-medium">{plan.name}</h1>
          </div>
          <button>
            <Trash2 color="red" />
          </button>
        </div>
        <div className="flex lg:flex-row flex-col lg:items-center gap-5 lg:justify-between">
          <div className="flex items-center gap-1">
            <CalendarPlus color={plan.color} />
            <h2 className="font-medium lg:text-xl">
              Data inicial: {plan.initialDate.toLocaleDateString()}
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <CalendarMinus color={plan.color} />
            <h2 className="font-medium lg:text-xl">
              Data final: {plan.endDate.toLocaleDateString()}
            </h2>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col lg:items-center gap-2">
          <h2 className="lg:text-xl font-medium">Links úteis: </h2>
          {plan.links.map((link, index) => (
            <a key={index} href={link} className="lg:text-xl text-blue-500">
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center lg:gap-5 gap-2">
          <Button full>Editar Planejamento</Button>
          <Button full bgColor={plan.color}>
            Exportar Planejamento
          </Button>
        </div>
      </div>

      <div className="w-full rounded-xl overflow-x-scroll p-5 bg-white">
        <table
          className="lg:w-full w-max text-base font-medium text-center border-b-4 bg-white"
          style={{ borderColor: plan.color }}
        >
          <thead
            className="uppercase text-white"
            style={{ background: plan.color }}
          >
            <tr>
              <th className="py-3 px-5">Horario</th>
              <th className="py-3 px-5">Atividade</th>
              <th className="py-3 px-5">Controle</th>
            </tr>
          </thead>
          <tbody>
            {plan.schedules.map((sch, index) => (
              <tr className="odd:bg-slate-200" key={index}>
                <td className="py-3 px-5">{sch.hour}</td>
                <td className="py-3 px-5">{sch.activity}</td>
                <td className="py-3 px-5 flex justify-center">
                  <Pencil size={24} color={plan.color} className="" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl overflow-x-scroll p-5 bg-white">
        <table
          className="lg:w-full w-max text-base font-medium text-center border-b-4 bg-white"
          style={{ borderColor: plan.color }}
        >
          <thead
            className="uppercase text-white"
            style={{ background: plan.color }}
          >
            <tr>
              <th className="py-3 px-5">Data</th>
              <th className="py-3 px-5">Campos de experiencia</th>
              <th className="py-3 px-5">Objetivos de aprendizagem</th>
              <th className="py-3 px-5">Desenvolvimento</th>
              <th className="py-3 px-5">Controle</th>
            </tr>
          </thead>
          <tbody>
            {plan.details.map((dtl, index) => (
              <tr className="odd:bg-slate-200" key={index}>
                <td className="py-3 px-5">{dtl.day}</td>
                <td className="py-3 px-5">{dtl.experienceField}</td>
                <td className="py-3 px-5">{dtl.objectives}</td>
                <td className="py-3 px-5">{dtl.development}</td>
                <td className="py-3 px-5 flex justify-center">
                  <Pencil size={24} color={plan.color} className="" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Plan;
