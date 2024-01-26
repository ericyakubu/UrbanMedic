import { createStore, combineReducers } from "redux";
import { modalReducer } from "./modalReduser";
import { usersReducer } from "./usersReducer";

interface ModalState {
  showModal: boolean;
  modalType: "create" | "update";
}

interface User {
  email: string;
  gender: "male" | "female";
  new?: boolean;
  name: {
    first: string;
    last: string;
    title?: string;
  };
}

interface UsersState {
  users: User[];
  userSelected: number;
}

export interface RootState {
  modal: ModalState;
  users: UsersState;
}

const rootReducer = combineReducers({
  modal: modalReducer,
  users: usersReducer,
});

export const store = createStore(rootReducer);
