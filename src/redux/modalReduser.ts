interface storeType {
  showModal: boolean;
  modalType: "create" | "update";
}

const defaultStore: storeType = {
  showModal: false,
  modalType: "create",
};

const SHOW_MODAL = "CREATE_MODAL";
const HIDE_MODAL = "UPDATE_MODAL";

export const modalReducer = (state = defaultStore, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, showModal: true, modalType: action.payload };
    case HIDE_MODAL:
      return { ...state, showModal: false };
    default:
      return state;
  }
};

export const displayModal = (payload: "create" | "update") => ({
  type: SHOW_MODAL,
  payload,
});

export const hideModals = () => ({ type: HIDE_MODAL });
