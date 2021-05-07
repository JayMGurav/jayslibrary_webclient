import { useEffect, useState } from "react";

export default function useError(){
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");


  useEffect(() => {
    let intervalId;
    if(isError && errorMsg){
      intervalId = setInterval(() => {
        setIsError(() => {
          setErrorMsg("");
          return false;
        });
      }, 4000);
    }
    return () => intervalId ? clearInterval(intervalId) : false;
  }, [isError, errorMsg]);

  
  const setError = (msg) => {
    setIsError(() => {
      setErrorMsg(msg);
      return true;
    });
  }

  return { isError, errorMsg, setError};
}