import { Plan } from "../interfaces/Plan";

export const APP_NAME = "EducaPlan";

export const COLORS = [
  "#1F7FD7",
  "#830A48",
  "#724E91",
  "#32936F",
  "#2D3142",
  "#EFCB68",
];

export const ariaLabels = {
  close: "ícone de X simbolo de fechar",
  open: "ícone de abrir, simbolo de abrir",
  delete: "ícone de lixeira simbolo de deletar",
  create: "ícone de adicionar, simbolo de criar",
  date: "ícone de calendário, simbolo de data",
  menu: "ícone de três barras, simbolo de abrir menu",
  plan: "ícone de caderno com lápis, simbolo de planejamento",
};

export const defaultPlan: Plan = {
  id: "123",
  name: "Plano de Exemplo",
  color: "#000",
  initialDate: new Date("2024-05-01"),
  endDate: new Date("2024-05-02"),
  details: [
    {
      day: "2024-05-01",
      experienceField: "Corpo, Gestos e Movimentos",
      objectives:
        "Participar do cuidado do seu corpo e da promoção do seu bem-estar",
      development:
        "Cantar a música 'escovar os dentes' e ensinar a escovação dos dentes.",
      observations:
        "É importante incentivar a participação ativa dos alunos durante a atividade.",
    },
    {
      day: "2024-05-02",
      experienceField: "Corpo, Gestos e Movimentos",
      objectives:
        "Participar do cuidado do seu corpo e da promoção do seu bem-estar",
      development:
        "Cantar a música 'escovar os dentes' e ensinar a escovação dos dentes.",
      observations:
        "É importante incentivar a participação ativa dos alunos durante a atividade.",
    },
  ],
  schedules: [
    {
      hour: "08:00",
      activity: "Boas-vindas e apresentação do tema do dia",
    },
    {
      hour: "08:30",
      activity: "Discussão sobre a importância da higiene bucal",
    },
    {
      hour: "09:00",
      activity: "Atividade prática: escovação dos dentes",
    },
  ],
};
