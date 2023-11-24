import { useEffect, useState } from "react";
import Navbar from "./componenets/Navbar";
import { IoMdAddCircle, IoMdSearch } from "react-icons/io";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./componenets/ContactCard";
import Model from "./componenets/Model";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [isOpen, setOpen] = useState(false);
  // const [close, setClose] = useState([]);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const contactsSnapshot = await getDocs(contactsRef);
        const contactsList = contactsSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactsList);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  return (
    <>
      <div className="max-w-[360px] mx-auto pt-2 relative">
        <Navbar />
        <div className="search flex mt-3 relative">
          <IoMdSearch className="absolute mt-1 ml-1 text-3xl text-white pointer-events-none" />
          <input
            type="text"
            className="border bg-transparent border-white p-4 pl-10 h-10 text-white rounded-lg flex-grow outline-none"
          />
          <IoMdAddCircle
            onClick={onOpen}
            className="text-white text-4xl ml-2 cursor-pointer"
          />
        </div>
        <div className="contact-list pt-3 flex flex-col gap-3">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
        <Model isOpen={isOpen} onClose={onClose}>
          HI asdas
        </Model>
      </div>
    </>
  );
}
