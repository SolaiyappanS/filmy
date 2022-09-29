import React from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <WrappedComponent
      {...props}
      navigate={navigate}
      params={params}
      searchParams={searchParams}
    />
  );
};

export default withRouter;
