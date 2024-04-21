import { CalendarMinus, CalendarPlus, NotebookPen } from "lucide-react";
import { Plan } from "../interfaces/Plan";
import Button from "./Button";
import { Link } from "react-router-dom";
import { formatDate } from "../helpers";

interface Props {
  plan: Plan;
}

const PlanCard = ({ plan }: Props) => {
  return (
    <div className="col-span-1 flex flex-col gap-4 p-4 rounded-lg bg-white my-shadow">
      <div className="flex items-center gap-2 ">
        <NotebookPen
          size={48}
          color="#FFF"
          className="p-3 rounded-full"
          style={{ backgroundColor: plan.color }}
        />
        <h1 className="text-xl font-medium">{plan.name}</h1>
      </div>
      <div className="flex items-center justify-between text-base font-medium">
        <div className="flex items-center gap-2">
          <CalendarPlus size={24} color={plan.color} />
          <h2>{formatDate(plan.initialDate)}</h2>
        </div>
        <p className="font-medium">até</p>
        <div className="flex items-center gap-2">
          <CalendarMinus size={24} color={plan.color} />
          <h2>{formatDate(plan.endDate)}</h2>
        </div>
      </div>
      <Link to={`/planejamento/${plan.id}`}>
        {" "}
        <Button full bgColor={plan.color}>
          Ver mais
        </Button>
      </Link>
    </div>
  );
};

export default PlanCard;
