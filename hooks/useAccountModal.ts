import {create} from "zustand";

interface useAccountModal {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useAccountModal = create<useAccountModal>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export default useAccountModal;