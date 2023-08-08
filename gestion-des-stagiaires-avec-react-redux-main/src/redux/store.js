import { legacy_createStore } from "redux";
import stagiaireReducer from "./reducers/stagiaireReducer";

const store = legacy_createStore(stagiaireReducer)

export default store