import { useModalState } from "../../hooks";
import EntryFormModal from "./entry-form-modal";

const RootModals = () => {
  const { isOpen } = useModalState();

  return <>{isOpen("ADD_ENTRY_FORM_MODAL") && <EntryFormModal />}</>;
};

export default RootModals;
