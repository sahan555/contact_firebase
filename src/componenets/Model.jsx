import { createPortal } from "react-dom";

import { IoMdClose } from "react-icons/io";

const Model = ({ isOpen, onClose, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <>
          <div className="absolute p-5 rounded-lg z-50 max-w-[320px] h-max m-auto inset-0 bg-white">
            <div className="relative">
              
              <IoMdClose onClick={onClose} className="absolute -top-9 -right-9 bg-red-600 text-white rounded-full text-3xl p-1" />
              {children}
            </div>
          </div>
          <div
            onClick={onClose}
            className="absolute backdrop-blur overflow-hidden inset-0 z-40"
          ></div>
        </>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Model;
