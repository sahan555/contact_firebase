import { useState } from "react";

const useDisclouse = () => {
    const [isOpen, setOpen] = useState(false);
    // const [close, setClose] = useState([]);
  
    const onOpen = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };
  return {isOpen,onOpen,onClose}
}

export default useDisclouse
