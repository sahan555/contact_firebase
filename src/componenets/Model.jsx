import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

const Model = ({ isOpen, onClose, childern }) => {
  return createPortal(
    <>
      {isOpen && (
        <>
          <div className="absolute z-50 max-w-[320px] h-max m-auto inset-0 bg-white">
            <IoMdClose onClick={onClose} />
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" />
            </div>
          </div>
          <div onClick={onClose} className="absolute backdrop-blur overflow-hidden inset-0 z-40"></div>
        </>
      )}
    </>
  ,document.getElementById("modal-root"));
};

export default Model;
