import { useState } from "react";
import Login from "../../components/signin";
import Signup from "../../components/signup";

const Auth = () => {
  const [currPage, setCurrPage] = useState("login");

  return (
    <div>
      {currPage === "login" ? (
        <Login setCurrPage={setCurrPage} />
      ) : (
        <Signup setCurrPage={setCurrPage} />
      )}
    </div>
  );
};

export default Auth;
