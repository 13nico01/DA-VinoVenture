import backgroundHero from "../../assets/Images/image21.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative">
      <div
        className="bg-cover bg-center w-full h-dvh fixed top-0 left-0 brightness-50"
        style={{
          backgroundImage: `url(${backgroundHero})`,
        }}
      ></div>

      <div className="relative px-2 z-10 mx-auto max-w-6xl py-40 sm:py-40 md:py-50 lg:py-50">
        <div className="text-center">
          <h1 className="text-white font-bold tracking-tight text-5xl md:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-green-600 to-green-800 text-transparent bg-clip-text">
              VinoVenture
            </span>{" "}
            dein Weinerlebnis
          </h1>
          <p
            className="mt-6 text-white"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.5rem)", // Dynamische Anpassung der Fontgröße
              lineHeight: "1.5",
            }}
          >
            Willkommen bei Vino Venture – Ihrem Begleiter für unvergessliche
            Weinverkostungen!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="."
              className="rounded-md bg-gradient-to-r from-green-600 to-green-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Shop
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-white">
              Über uns <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
