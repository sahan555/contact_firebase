import { useEffect, useState } from "react";
import Navbar from "./componenets/Navbar";
import { IoMdAddCircle, IoMdSearch } from "react-icons/io";

import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./componenets/ContactCard";
import AddAndUpdateContact from "./componenets/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundContact from "./componenets/NotFoundContact";
export default function App() {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclouse();
  const [filter,setFilter] = useState(null);
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapsnot) => {
          const contactsList = snapsnot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactsList);
          setFilter(contactsList);
          return contactsList;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

const searchContact = (e) => {
  const searchValue = e.target.value;
  console.log(searchValue);
   if(searchValue === ""){
    setFilter(null);
   }
   const contactfilter = contacts?.filter((contact)=>contact.name.toLowerCase().includes(searchValue.toLowerCase()));
   setFilter(contactfilter);
}

  return (
    <>
      <div className="max-w-[360px] mx-auto pt-2 relative">
        <Navbar />
        <div className="search flex mt-3 relative">
          <IoMdSearch className="absolute mt-1 ml-1 text-3xl text-white pointer-events-none" />
          <input
            type="text" onChange={searchContact}
            className="border bg-transparent border-white p-4 pl-10 h-10 text-white rounded-lg flex-grow outline-none"
          />
          <IoMdAddCircle
            onClick={onOpen} 
            className="text-white text-4xl ml-2 cursor-pointer"
          />
        </div>
        <div className="contact-list pt-3 flex flex-col gap-3">
          {contacts.length <= 0 ? <NotFoundContact/> :filter.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
        <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      </div>
      <ToastContainer position="bottom-center" />
    </>
  );
}
