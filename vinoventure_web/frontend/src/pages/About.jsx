import Navbar from "../components/MainComponents/Navbar";
import AboutMain from "../components/AboutComponents/AboutMain"

function About() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <AboutMain />
      </div>
    </>
  );
}

export default About;
