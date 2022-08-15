import React from "react";
import { Spinner } from "react-bootstrap";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  isLoading: boolean;
  loadingView?: React.ReactNode;
}

function LoadingArea({ isLoading, children, loadingView, ...rest }: Props) {
  const loadingArea = (
    <div
      {...rest}
      className={rest.className}
      style={{
        ...rest.style,
        height: "100%",
        width: "100%",
        minHeight: "150px",
        display: "grid",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {loadingView || (
        <div className="text-center">
          <Spinner style={{ margin: "auto" }} animation="border" />
          <p className="mt-1">Daten werden geladen...</p>
        </div>
      )}
    </div>
  );
  return <>{isLoading ? loadingArea : children}</>;
}

export default LoadingArea;
