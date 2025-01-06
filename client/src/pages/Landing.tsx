// imports
import GetStarted from "./landing/GetStart";
import Domain from "./landing/Domain";
import CreateWeb from "./landing/CreateWeb";
import ExploreTemp from "./landing/ExploreTemp";
import Selling from "./landing/Selling";
import Scheduling from "./landing/Scheduling";
import Invoicing from "./landing/Invoicing";
import Promote from "./landing/Promote";
import Guide from "./landing/Guide";
import Helper from "./landing/Helper";

function Landing() {
  return (
    <div>
      <GetStarted />
      <Domain />
      <CreateWeb />
      <ExploreTemp />
      <Selling />
      <Scheduling />
      <Invoicing />
      <Promote />
      <Guide />
      <Helper />
    </div>
  );
}

export default Landing;
