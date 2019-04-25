import React, { useReducer, useEffect } from "react";
import { getCandidateInfo, getTechnologies } from "./api";
import { List } from "./list";
import * as queryString from "query-string";
import "antd/dist/antd.css";

const initialState = {
  filters: {},
  data: [],
  isLoading: false,
  availableTechnologies: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setCandidateInfo":
      return { ...state, data: action.payload };
    case "setAvailableTechnologies":
      return { ...state, availableTechnologies: action.payload };
    case "changeFilter":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "clearAllFilters":
      return { ...state, inputUserName: action.payload };
    case "isLoading":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const CandidatesPage = props => {
  const [{ data, isLoading, availableTechnologies }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    getCandidateInfo(dispatch);
    getTechnologies(dispatch);
  }, []);

  const onFilterChange = filter => {
    dispatch({ type: "changeFilter", payload: filter });
    getCandidateInfo(dispatch, `?${queryString.stringify(filter)}`);
  };

  return (
    <div>
      {data && (
        <List
          data={data}
          onFilterChange={onFilterChange}
          isLoading={isLoading}
          availableTechnologies={availableTechnologies}
        />
      )}
    </div>
  );
};

export default CandidatesPage;
