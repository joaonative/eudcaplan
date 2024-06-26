import { Link } from "react-router-dom";
import { APP_NAME, ariaLabels } from "../constants";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <header className="py-6 px-5 lg:px-20 flex items-center justify-between">
        <Link to={"/"} className="flex items-center gap-1">
          <img
            src="/logo.svg"
            alt={`${APP_NAME} logo`}
            width={32}
            height={32}
          />
          <h1 className="font-bold text-primary text-xl">{APP_NAME}</h1>
        </Link>
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-6 text-xl font-medium">
            <li>
              <a href="https://github.com/joaonative/eudcaplan" target="_blank">
                GitHub
              </a>
            </li>
          </ul>
        </nav>

        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <X
              size={32}
              className="text-primary"
              aria-label={ariaLabels.close}
            />
          ) : (
            <Menu
              size={32}
              className="text-primary"
              aria-label={ariaLabels.menu}
            />
          )}
        </button>
      </header>
      {isOpen && (
        <nav>
          <ul className="lg:hidden flex flex-col items-center px-5 gap-3 mb-6 text-xl font-medium">
            <li>
              <a href="https://github.com/joaonative/eudcaplan" target="_blank">
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Header;
