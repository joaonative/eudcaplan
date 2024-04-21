export interface Plan {
  id: string;
  name: string;
  color: string;
  initialDate: Date;
  endDate: Date;
  schedule: string;
  details: {
    day: string;
    experienceField: string;
    objectives: string;
    development: string;
  }[];
  schedules: {
    hour: string;
    activity: string;
  }[];
}

export const myPlan: Plan = {
  id: "1",
  name: "teste 1",
  schedule: "08:00/12:30",
  color: "#E16036",
  initialDate: new Date("2024-04-22"),
  endDate: new Date("2024-04-26"),
  details: [
    {
      day: "Segunda 22/04",
      experienceField: "raciocínio logico",
      objectives: "melhorar o raciocínio geral dos alunos",
      development: "tabuadas dos numeros 2 ate o 4",
    },
    {
      day: "Terca 23/04",
      experienceField: "raciocínio logico",
      objectives: "melhorar o raciocínio geral dos alunos",
      development: "tabuada do numero 5",
    },
    {
      day: "Quarta 24/04",
      experienceField: "raciocínio logico",
      objectives: "melhorar o raciocínio geral dos alunos",
      development: "tabuada do numero 6",
    },
    {
      day: "Quinta 25/04",
      experienceField: "raciocínio logico",
      objectives: "melhorar o raciocínio geral dos alunos",
      development: "tabuadas do numero 7",
    },
    {
      day: "Sexta 2/04",
      experienceField: "raciocínio logico",
      objectives: "melhorar o raciocínio geral dos alunos",
      development: "tabuadas do numero 8",
    },
  ],
  schedules: [
    { activity: "explicacao teorica", hour: "08:00" },
    { activity: "explicacao teorica", hour: "08:30" },
    { activity: "explicacao teorica", hour: "09:00" },
    { activity: "explicacao teorica", hour: "09:30" },
    { activity: "atividade pratica", hour: "10:00" },
    { activity: "atividade pratica", hour: "10:30" },
    { activity: "atividade pratica", hour: "11:00" },
    { activity: "atividade pratica", hour: "11:30" },
    { activity: "correcao", hour: "12:00" },
    { activity: "correcao", hour: "12:30" },
  ],
};
