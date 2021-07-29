import { COLUMNS } from "../utils/constants";
import { SET_APPS, SET_COLUMNS, SET_TABLEDATA } from "./ActionType"

const initialState ={
  apps:[],
  tableData:[],
  columns: COLUMNS
}

export const RootReducers =(state=initialState, action)=>{
  switch(action.type){
    case SET_APPS:
      return { ...state, apps: action.apps };
    case SET_TABLEDATA:
      return { ...state, tableData: action.tableData };
    case SET_COLUMNS:
      return { ...state, columns: action.columns };
    default:
      return state;  
  }
}