import { useEffect, useState } from "react";
import { verifyEmail } from "./services";

const Verify = () => {
  const paths = window.location.pathname.split("/");
  const token = paths[paths.length - 1];
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    verifyEmail(token).then(() => {
      setStatus("success");
    }).catch((err) => {
      setStatus("faliure");
    })
  }, [token])
  if (status === "loading") {
    return (
      <div>
        Verifying Token
      </div>
    )
  }
  if (status === "success") {
    return (
      <div>
        Email verified successfully you can now login
      </div>
    )
  }
  if (status === "faliure") {
    return (
      <div>
        Couldn't verify token
      </div>
    )
  }
}
export default Verify;