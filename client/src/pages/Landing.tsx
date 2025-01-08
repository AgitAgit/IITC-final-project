// imports
import GetStarted from "./landing/GetStart";
import Domain from "./landing/Domain";
import CreateWeb from "./landing/CreateWeb";
import ExploreTemp from "./landing/ExploreTemp";
import Selling from "./landing/Selling";
import Guide from "./landing/Guide";
import Helper from "./landing/Helper";
import Promote from "./landing/Promote";

function Landing() {
  return (
    <div>
      <GetStarted />
      <Domain />
      <CreateWeb />
      <ExploreTemp />
      <Selling />
      <Promote />
      <Guide />
      <Helper />
    </div>
  );
}

export default Landing;
