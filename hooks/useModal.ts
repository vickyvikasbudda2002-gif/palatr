"use client";

import { useModalStore } from "@/store/modalStore";

export function useModal() {
  const { activeModal, modalData, openModal, closeModal } = useModalStore();

  return {
    activeModal,
    modalData,
    openModal,
    closeModal,
    isOpen: (name: string) => activeModal === name,
  };
}
