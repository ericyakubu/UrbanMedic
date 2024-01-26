interface ModalState {
  showModal: boolean;
  modalType: "create" | "update";
}

interface ShowModalAction {
  type: typeof SHOW_MODAL;
  payload: "create" | "update";
}

interface HideModalAction {
  type: typeof HIDE_MODAL;
}

type ModalActionTypes = ShowModalAction | HideModalAction;

const defaultStore: ModalState = {
  showModal: false,
  modalType: "create",
};

const SHOW_MODAL = "CREATE_MODAL";
const HIDE_MODAL = "UPDATE_MODAL";

export const modalReducer = (
  state = defaultStore,
  action: ModalActionTypes
) => {
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
