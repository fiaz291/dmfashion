import React from "react";
import styles from "./styles";
import { Field, FieldArray, Form, Formik } from "formik";
import { writeData } from "@/models";
import { toast } from "react-toastify";

export default function AddClientPage() {
  async function handleUserUpload(data) {
    const res = await writeData("Users", data);
    if (!res?.error) {
      toast("User Added");
    }
  }
  return (
    <main>
      <div className="main">Add New Client</div>
      <Formik
        initialValues={{
          name: "",
          contacts: [
            {
              phoneNumber: "",
            },
          ],
        }}
        onSubmit={async (values) => {
          handleUserUpload(values);
        }}
      >
        {({ values }) => (
          <Form>
            <div className="col">
              <label htmlFor="name">Name</label>
              <Field
                id="name"
                name="name"
                placeholder="Name"
                className="formik-input"
              />
            </div>

            <FieldArray name="contacts">
              {({ remove, push }) => (
                <div>
                  {values.contacts.length > 0 &&
                    values.contacts.map((friend, index) => (
                      <div
                        className="row"
                        style={{ alignItems: "flex-end" }}
                        key={index}
                      >
                        <div className="col w100">
                          <label htmlFor={`contacts.${index}.name`}>
                            Phone Number {index + 1}
                          </label>
                          <Field
                            name={`contacts.${index}.phoneNumber`}
                            placeholder="Jane Doe"
                            type="text"
                            className="formik-input"
                          />
                        </div>
                        <div className="col">
                          <button
                            type="button"
                            className="button clickable"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="add-button clickable"
                    onClick={() => push({ phoneNumber: "" })}
                  >
                    + Phone Number
                  </button>
                </div>
              )}
            </FieldArray>
            <div className="row justify-center w100">
              <button className="submit-button clickable" type="submit">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <style jsx>{styles}</style>
    </main>
  );
}
