import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  full?: boolean;
  sumbit?: boolean;
  shadow?: boolean;
  bgColor?: string;
  disabled?: boolean;
  onclick?: () => void;
}

const Button = ({
  children,
  full,
  shadow,
  bgColor,
  onclick,
  sumbit,
  disabled,
}: Props) => {
  return (
    <button
      onClick={onclick}
      type={sumbit ? "submit" : "button"}
      className={`
      ${full ? "w-full" : "w-max"}
      ${shadow && "my-shadow"} 
      ${!bgColor && "bg-primary"}
      px-3 py-2 text-white rounded-lg text-xl capitalize font-medium disabled:bg-slate-400`}
      style={{ backgroundColor: bgColor }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
