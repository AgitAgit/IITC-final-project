import DesignCon from "./templates/Designs";

function TemplatesPage() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between px-14 mt-20">
        <h1 className="text-6xl pr-40">Make any template yours with ease.</h1>
        <h2 className="text-lg">
          Whether you need a portfolio website, an online store, or a personal
          blog, you can use Squarespace's customizable and responsive website
          templates to get started.
        </h2>
      </div>
      <div>
        <DesignCon />
      </div>
    </div>
  );
}

export default TemplatesPage;
