import { useState } from "react";
import { Plan as IPlan, myPlan } from "../interfaces/Plan";
import { Pencil, Trash2 } from "lucide-react";

const Plan = () => {
  const [plan, setPlan] = useState<IPlan | undefined>(myPlan);

  if (!plan) {
    return null;
  }

  return (
    <section className="flex flex-col gap-5 px-5 lg:px-20">
      <div className="flex lg:flex-row flex-col items-center gap-5">
        <div className="w-full flex flex-col gap-5 rounded-xl overflow-x-scroll p-5 bg-white">
          <div className="flex items-center justify-between">
            <h1>{plan.name}</h1>
            <Trash2 />
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
