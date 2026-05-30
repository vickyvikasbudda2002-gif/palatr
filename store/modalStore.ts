import { create } from "zustand";

type ModalName =
  | "city"
  | "waitlist"
  | "signup"
  | "login"
  | "profile"
  | "newToCity"
  | "top3"
  | "review"
  | "watchReviews"
  | "report"
  | "addRestaurant"
  | "addHiddenGem"
  | null;

interface ModalState {
  activeModal: ModalName;
  modalData: Record<string, unknown>;
  openModal: (modal: ModalName, data?: Record<string, unknown>) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  modalData: {},
  openModal: (modal, data = {}) => set({ activeModal: modal, modalData: data }),
  closeModal: () => set({ activeModal: null, modalData: {} }),
}));
