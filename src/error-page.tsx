import { useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

const style: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  height: "90vh",
};

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div id="error-page" style={style}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message || "Unknown error"}</i>
      </p>
    </div>
  );
}
