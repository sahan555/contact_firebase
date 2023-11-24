import { deleteDoc, doc } from "firebase/firestore";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const {isOpen,onClose,onOpen}  = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact deleted Sucessfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="bg-white rounded-lg p-4 flex items-center justify-between bg-yellow"
        key={contact.id}
      >
        <div className="flex items-center">
          <HiOutlineUserCircle className="text-3xl text-amber-500 " />
          <div className="contact-info ml-3">
            <h2 className="font-medium mb-0 text-xl">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="icons flex flex-wrap text-3xl gap-2">
          <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
          <IoMdTrash
            onClick={() => {
              deleteContact(contact.id);
            }}
            className="text-indigo-600 cursor-pointer"
          />
        </div>
      </div>
      < AddAndUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>
    </>
  );
};

export default ContactCard;
