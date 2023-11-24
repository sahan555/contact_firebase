import { ErrorMessage, Field, Form, Formik } from "formik";
import { FaRegUser } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

import Model from "./Model";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("* Name is required"),
  email: Yup.string().email("* Invalid email").required("* Email is required"),
});

const AddAndUpdateContact = ({ contact, isOpen, onClose, isUpdate }) => {
  const addContact = async (contact) => {
    try {
      const contentRef = collection(db, "contacts");
      await addDoc(contentRef, contact);
      onClose();
      toast.success("Contact Added Sucessfully");
    } catch (error) {
      console.log(error);
    }
  };
  const updateContact = async (contact, id) => {
    try {
      const contentRef = doc(db, "contacts", id);
      await updateDoc(contentRef, contact);
      onClose();
      toast.success("Contact Updated Sucessfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Model isOpen={isOpen} onClose={onClose}>
      <Formik
        validationSchema={contactSchemaValidation}
        initialValues={
          isUpdate
            ? {
                name: contact.name,
                email: contact.email,
              }
            : {
                name: "",
                email: "",
              }
        }
        onSubmit={(values) => {
          {
            isUpdate ? updateContact(values, contact.id) : addContact(values);
          }
        }}
      >
        <Form className="flex flex-wrap flex-col">
          <div className="form-group flex flex-col gap-2">
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <div className="relative">
              <FaRegUser className="absolute top-2.5 left-1 text-xl pointer-events-none" />
              <Field
                type="text"
                name="name"
                id="name"
                className="p-3 border outline-none h-10 w-full border-gray-400 pl-8"
              />
              <div className="text-xs text-red-500">
                <ErrorMessage name="name" />
              </div>
            </div>
          </div>
          <div className="form-group flex flex-col mt-4 gap-2">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <div className="relative">
              <CiMail className="absolute top-2.5 left-1 text-xl pointer-events-none" />
              <Field
                type="email"
                name="email"
                id="email"
                className="p-3 border outline-none h-10 w-full border-gray-400 pl-8"
              />
              <div className="text-xs text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white p-2 mt-3 self-end"
          >
            {isUpdate ? "Update" : "Add"} Contact
          </button>
        </Form>
      </Formik>
    </Model>
  );
};

export default AddAndUpdateContact;
