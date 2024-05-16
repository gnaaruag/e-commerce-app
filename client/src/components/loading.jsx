import {BallTriangle} from "react-loader-spinner"
import "../App.css"

function Loading() {
  return (
    <div className="loading">
      <BallTriangle
        height={50}
        width={50}
        radius={5}
        color="#e65656"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}/>
      
    </div>
  );
}

export default Loading;
