interface defaultStoreType {
  users: UsersType[];
  userSelected: number;
}

const defaultStore: defaultStoreType = {
  users: [],
  userSelected: 0,
};

export interface UsersType {
  email: string;
  gender: "male" | "female";
  new?: boolean;
  name: {
    first: string;
    last: string;
    title?: string;
  };
}

const ADD_USERS = "ADD_USERS";
const SET_USERS = "SET_USERS";
const DELETE_USER = "DELETE_USER";
const ADD_NEW_USER = "ADD_NEW_USER";
const SELECT_USER = "SELECT_USER";
const UPDATE_USER = "UPDATE_USER";

export const usersReducer = (state = defaultStore, action) => {
  switch (action.type) {
    case ADD_USERS:
      return { ...state, users: [...state.users, ...action.payload] };
    case SET_USERS:
      return { ...state, users: [...action.payload] };
    case ADD_NEW_USER:
      return { ...state, users: [action.payload, ...state.users] };
    case SELECT_USER:
      return { ...state, userSelected: action.payload };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user, index) =>
          index === state.userSelected ? action.payload : user
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(
          (user, index) => index !== state.userSelected
        ),
      };
    default:
      return state;
  }
};

export const addUsers = (payload: UsersType[]) => ({
  type: ADD_USERS,
  payload,
});
export const setUsers = (payload: UsersType[]) => ({
  type: SET_USERS,
  payload,
});

export const addNewUser = (payload: UsersType) => ({
  type: ADD_NEW_USER,
  payload,
});

export const selectUser = (payload: number) => ({
  type: SELECT_USER,
  payload,
});

export const deleteUser = () => ({
  type: DELETE_USER,
});

export const updateUser = (payload: UsersType) => ({
  type: UPDATE_USER,
  payload,
});
