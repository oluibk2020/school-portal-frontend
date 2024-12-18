import { set } from "lodash";
import { useState, useEffect } from "react";
function Spinner() {

  const [count, setCount] = useState(60);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (count === 0) {
        setCount(20);
      } else if (count > 0){
        setCount(count - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="loadingSpinnerContainer">
      <div className="loadingSpinner"></div>
      <p className=" pl-8"> Fetching data in less than {count} secs...</p>
    </div>
  );
}
export default Spinner;
