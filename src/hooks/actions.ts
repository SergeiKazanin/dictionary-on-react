import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actionsDiction } from "../store/slice";

const actions = {
  ...actionsDiction,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
