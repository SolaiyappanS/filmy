import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const MovieForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <h1>Movie Form - {params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => navigate(-1, { replace: true })}
      >
        Home
      </button>
    </React.Fragment>
  );
};

export default MovieForm;
