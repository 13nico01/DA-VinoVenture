import FooterMain from "../MainComponents/Footer";

function AboutMain() {
  return (
    <div className="">
      <div className="relative w-full h-28">
        <div className="absolute inset-0 opacity-50"></div>
        <div className="relative z-10 flex justify-center items-center w-full h-full text-center text-white">
          <h1 className="text-5xl font-bold tracking-wide uppercase">
            Über uns
          </h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Unser Team
          </h2>
          <div className="text-center text-gray-600 mb-6">
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
              diam nonumy eirmod tempor invidunt ut labore et dolore magna
              aliquyam erat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero eros et accumsan et iusto odio
              dignissim qui blandit praesent luptatum zzril delenit augue duis
              dolore te feugait nulla facilisi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-800">Name 1</h3>
              <p className="text-gray-500">Position</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-800">Name 2</h3>
              <p className="text-gray-500">Position</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-800">Name 3</h3>
              <p className="text-gray-500">Position</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Unsere Vision
            </h3>
            <p className="text-lg text-gray-600">
              Wir sind leidenschaftlich daran interessiert, eine unvergessliche
              Erfahrung für Weinliebhaber zu schaffen. Unser Ziel ist es, Ihnen
              die besten Weine aus aller Welt zu bieten und Ihre Sinne auf eine
              Reise zu schicken.
            </p>
          </div>
        </div>
      </div>

      <FooterMain />
    </div>
  );
}

export default AboutMain;
