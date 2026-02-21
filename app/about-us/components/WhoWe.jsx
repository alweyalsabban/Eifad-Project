import Card from "./Card";
import { WhoWeInfo } from "../info";
function WhoWe() {
  return (
    <>
      <div className="cusContaner m-auto my-5">
        <div className="flex gap-2 justify-center">
          <Card whoWe={WhoWeInfo[0]} />
          <Card whoWe={WhoWeInfo[1]} />
        </div>
      </div>
    </>
  );
}

export default WhoWe;
