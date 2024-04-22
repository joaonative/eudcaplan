import { APP_NAME } from "../constants";

const Hero = () => {
  return (
    <section className="flex items-center">
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-5xl">
          Transforme sua sala de aula com o{" "}
          <span className="text-primary">{APP_NAME}</span>
        </h1>
        <p className="font-medium text-xl lg:text-2xl">
          Com o {APP_NAME}, você tem tudo o que precisa para criar horários
          claros e planos de aula envolventes em um só lugar.
        </p>
      </div>
      <img
        src="hero.png"
        alt="Imagem de uma criança sorrindo"
        width={512}
        height={"100%"}
        className="object-cover hidden lg:block"
      />
    </section>
  );
};

export default Hero;
