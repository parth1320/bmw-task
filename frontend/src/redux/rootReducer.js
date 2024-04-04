import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import ChartReducer from "./features/ChartService";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const rootReducer = combineReducers({
  charts: ChartReducer,
});

export { rootPersistConfig, rootReducer };
