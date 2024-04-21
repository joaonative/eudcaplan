import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  full?: boolean;
  shadow?: boolean;
  bgColor?: string;
}

const Button = ({ children, full, shadow, bgColor }: Props) => {
  return (
    <button
      className={`
      ${full ? "w-full" : "w-max"}
      ${shadow && "my-shadow"} 
      ${!bgColor && "bg-primary"}
      px-3 py-2 text-white rounded-lg text-xl capitalize font-medium`}
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </button>
  );
};

export default Button;
