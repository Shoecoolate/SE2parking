import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setModalId, clearModalId } from "../redux/slices/modal-slice";
import { RootState } from "../redux/store";
import { ModalIds } from "../types";

const useModalState = () => {
  const dispatch = useAppDispatch();
  const modals = useAppSelector((state: RootState) => state.modals);

  /**
   * Handles opening of modals
   */
  const openModal = (modalId: ModalIds) => dispatch(setModalId({ modalId }));

  /**
   * Handles closing of modals
   */
  const closeModal = () => dispatch(clearModalId());

  /**
   * Checks wether a modal is open
   */
  const isOpen = (modalId: ModalIds) => modals.modalId === modalId;

  return { openModal, closeModal, isOpen };
};

export default useModalState;
