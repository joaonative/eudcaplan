import { ChangeEvent, useState } from "react";
import { Plan as IPlan } from "../interfaces/Plan";

import { CalendarMinus, CalendarPlus, NotebookPen, Trash2 } from "lucide-react";
import Button from "../components/Button";
import { deletePlan, editPlan, getPlan } from "../services/Plan";
import { Navigate, useParams } from "react-router-dom";
import PlanToPdf from "../components/PlanToPdf";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ariaLabels } from "../constants";

const Plan = () => {
  const { id } = useParams();

  const [plan, setPlan] = useState<IPlan | undefined>(getPlan(id || ""));
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);

  if (!id || confirmation || !plan) {
    return <Navigate to={"/"} replace />;
  }

  const handleDelete = () => {
    const ask = confirm(
      `Tem certeza que deseja excluir o planejamento ${plan?.name}? O processo não pode ser revertido!`
    );
    deletePlan(id);
    setConfirmation(ask);
  };

  const isDisabled: boolean =
    !plan.color ||
    !plan.details ||
    !plan.name ||
    !plan.initialDate ||
    !plan.endDate ||
    !plan.id;

  const handleEdit = () => {
    if (isDisabled) {
      return setIsEditing(false);
    }
    editPlan(id, plan);
    setIsEditing(false);
  };

  const handleScheduleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: keyof (typeof plan.schedules)[0]
  ) => {
    const { value } = e.target;
    const updatedPlan: IPlan = { ...plan };
    updatedPlan.schedules[index][field] = value;
    setPlan(updatedPlan);
  };

  const addEmptySchedule = () => {
    const updatedPlan = {
      ...plan,
      schedules: [...plan.schedules, { hour: "", activity: "" }],
    };
    setPlan(updatedPlan);
  };

  const handleRemoveSchedule = (indexToRemove: number) => {
    const updatedPlan = { ...plan };
    updatedPlan.schedules.splice(indexToRemove, 1);
    setPlan(updatedPlan);
  };

  const handleDetailChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: keyof (typeof plan.details)[0]
  ) => {
    const { value } = e.target;
    const updatedPlan: IPlan = { ...plan };
    updatedPlan.details[index][field] = value;
    setPlan(updatedPlan);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: keyof (typeof plan.schedules)[0] | keyof (typeof plan.details)[0]
  ) => {
    if (field === "hour" || field === "activity") {
      handleScheduleChange(e, index, field);
    } else if (
      field === "day" ||
      field === "experienceField" ||
      field === "objectives" ||
      field === "development"
    ) {
      handleDetailChange(e, index, field);
    }
  };

  return (
    <section className="flex flex-col gap-5 px-5 lg:px-20">
      <div className="w-full flex flex-col gap-5 rounded-xl p-5 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <NotebookPen
              aria-label={ariaLabels.plan}
              className="text-primary"
            />
            <h1 className="lg:text-2xl text-xl font-bold">{plan.name}</h1>
          </div>
          <button onClick={handleDelete}>
            <Trash2 color="red" />
          </button>
        </div>
        <div className="flex lg:flex-row flex-col lg:items-center gap-5 lg:justify-between">
          <div className="flex items-center gap-1">
            <CalendarPlus
              aria-label={ariaLabels.date}
              className="text-primary"
            />
            <h2 className="font-medium lg:text-xl">
              Data inicial: {plan.initialDate.toLocaleString().split("T")[0]}
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <CalendarMinus
              aria-label={ariaLabels.date}
              className="text-primary"
            />
            <h2 className="font-medium lg:text-xl">
              Data final: {plan.endDate.toLocaleString().split("T")[0]}
            </h2>
          </div>
        </div>

        <PDFViewer className="w-full h-96 lg:block hidden">
          <PlanToPdf plan={plan} title={`Preview Planejamento ${plan.name}`} />
        </PDFViewer>

        <div className="flex items-center lg:gap-5 gap-2">
          <Button
            full
            onclick={() => setIsEditing(!isEditing)}
            bgColor={isEditing ? "red" : ""}
          >
            {isEditing ? "Cancelar" : "Editar"}
          </Button>
          {isEditing ? (
            <Button full bgColor={plan.color} onclick={() => handleEdit()}>
              Salvar
            </Button>
          ) : (
            <PDFDownloadLink
              document={
                <PlanToPdf title={`planejamento-${plan.name}`} plan={plan} />
              }
              className="w-full h-full"
            >
              {({ loading }) =>
                loading ? (
                  <Button full disabled={true}>
                    Carregando...
                  </Button>
                ) : (
                  <Button full bgColor={plan.color}>
                    Exportar
                  </Button>
                )
              }
            </PDFDownloadLink>
          )}
        </div>
      </div>

      <div className="w-full rounded-xl overflow-x-scroll p-5 bg-white">
        <div className="flex items-center justify-between my-4">
          <h1 className="font-bold lg:text-2xl text-xl">Horários</h1>
          {isEditing && (
            <Button onclick={addEmptySchedule}>Adicionar Horário</Button>
          )}
        </div>
        <table
          className="w-full text-base font-medium text-center border-b-4 bg-white"
          style={{ borderColor: plan.color }}
        >
          <thead
            className="uppercase text-white"
            style={{ background: plan.color }}
          >
            <tr>
              <th className="py-3 px-5">Horario</th>
              <th className="py-3 px-5">Atividade</th>
              {isEditing && plan.schedules.length !== 0 && (
                <th className="py-3 px-5">Deletar</th>
              )}
            </tr>
          </thead>
          <tbody>
            {plan.schedules.map((sch, index) => (
              <tr className="odd:bg-slate-200" key={index}>
                <td className="py-3 px-5">
                  <input
                    className={`text-center border`}
                    style={
                      isEditing
                        ? { borderColor: plan.color }
                        : { borderColor: "transparent" }
                    }
                    disabled={!isEditing}
                    value={sch.hour}
                    onChange={(e) => handleChange(e, index, "hour")}
                  />
                </td>
                <td className="py-3 px-5">
                  <input
                    className={`text-center border`}
                    style={
                      isEditing
                        ? { borderColor: plan.color }
                        : { borderColor: "transparent" }
                    }
                    disabled={!isEditing}
                    value={sch.activity}
                    onChange={(e) => handleChange(e, index, "activity")}
                  />
                </td>
                {isEditing && (
                  <td>
                    <button onClick={() => handleRemoveSchedule(index)}>
                      <Trash2 aria-label={ariaLabels.delete} color="red" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl overflow-x-scroll p-5 bg-white">
        <div className="flex items-center justify-between my-4">
          <h1 className="font-bold lg:text-2xl text-xl">Detalhes</h1>
        </div>
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
              <th className="py-3 px-5">Observações</th>
            </tr>
          </thead>
          <tbody>
            {plan.details.map((dtl, index) => (
              <tr className="odd:bg-slate-200" key={index}>
                <td className="py-3 px-5">
                  <input
                    className={`text-center`}
                    style={{ borderColor: plan.color }}
                    disabled={true}
                    value={dtl.day}
                    onChange={(e) => handleChange(e, index, "day")}
                  />
                </td>
                <td className="py-3 px-5">
                  <input
                    className={`text-center border`}
                    style={
                      isEditing
                        ? { borderColor: plan.color }
                        : { borderColor: "transparent" }
                    }
                    disabled={!isEditing}
                    value={dtl.experienceField}
                    onChange={(e) => handleChange(e, index, "experienceField")}
                  />
                </td>
                <td className="py-3 px-5">
                  <input
                    className={`text-center border`}
                    style={
                      isEditing
                        ? { borderColor: plan.color }
                        : { borderColor: "transparent" }
                    }
                    disabled={!isEditing}
                    value={dtl.objectives}
                    onChange={(e) => handleChange(e, index, "objectives")}
                  />
                </td>
                <td className="py-3 px-5">
                  <textarea
                    className={`text-start border w-80`}
                    style={
                      isEditing
                        ? { borderColor: plan.color }
                        : { borderColor: "transparent" }
                    }
                    disabled={!isEditing}
                    value={dtl.development}
                    onChange={(e) => handleChange(e, index, "development")}
                  />
                </td>
                <td className="py-3 px-5">
                  <input
                    className={`text-center border`}
                    style={
                      isEditing
                        ? { borderColor: plan.color }
                        : { borderColor: "transparent" }
                    }
                    disabled={!isEditing}
                    value={dtl.observations}
                    onChange={(e) => handleChange(e, index, "observations")}
                  />
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
