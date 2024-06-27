import React, { useState } from "react";
import styles from "./styles";
import { Field, Form, Formik } from "formik";
import {
  editData,
  fetchMeasurementsWithPhoneNumber,
  fetchUserWithPhoneNumber,
  writeData,
} from "@/models";
import { toast } from "react-toastify";

const initialValues = {
  ShopName: "dm",
  phoneNumber: "",
  clientName: "",
  name: "",
  length: "",
  shoulder: "",
  armMuscle: "",
  armsLength: "",
  gala: "",
  chest1: "",
  chest2: "",
  waist1: "",
  waist2: "",
  hip1: "",
  hip2: "",
  silaiType: "سنگل",
  resham: false,
  design: false,
  gheeraType: "گھیرا گول",
  kafNumber: "",
  kafWidth: "",
  kafLength: "",
  kafType: "گول",
  pocketNumber: "",
  pattiLength: "",
  pattingWidth: "",
  sidePocket: "",
  frontPocket: "",
  colar: "",
  ben: "",
  shalwarType: "شلوار",
  shalwarGhera: "",
  zipPocket: "",
  shalwarWaist: "",
  shalwarLength: "",
  panchaNumber: "",
  panchaSize: "",
  asin: "",
  pocketDetails: "",
};

export default function AddNewMeasurementTemplate({}) {
  const [noUserFound, setNoUserFound] = useState(false);
  const [measurementId, setMeasurementId] = useState(false);
  const [isError, setIsError] = useState(false);

  async function handleUserUpload(data) {
    let res;
    if (noUserFound) {
      await writeData("Users", {
        contacts: [{ phoneNumber: data.phoneNumber }],
        name: data.clientName,
      });
    }
    if (measurementId) {
      res = await editData("Measurements", data, measurementId);
    } else {
      res = await writeData("Measurements", data);
    }
    return res;
  }

  return (
    <main>
      <div className="main urdu" style={{ textAlign: "center" }}>
        نیا ناپ
      </div>
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { resetForm }) => {
            if (
              values.phoneNumber === "" ||
              values.clientName === "" ||
              values.name === ""
            ) {
              setIsError(true);
              toast.error("Add Fields");
              return;
            }
            const res = await handleUserUpload(values);
            if (!res?.error) {
              toast("Measurement Added");
              resetForm();
            }
          }}
        >
          {({ setFieldValue, resetForm, values }) => (
            <Form>
              <div>
                <div
                  className="main urdu"
                  style={{ textAlign: "center", fontSize: 24 }}
                >
                  قمیض ناپ
                </div>
                <div
                  className="main urdu"
                  style={{ textAlign: "center", fontSize: 24, lineHeight: 0 }}
                >
                  ----------
                </div>

                <div
                  className="row justify-center"
                  style={{ marginTop: 20, gap: 20 }}
                >
                  <div className="col">
                    <label htmlFor="ShopName" className="urdu">
                      DM Fashion
                    </label>
                    <div className="col align-center">
                      <Field
                        style={{ width: 30 }}
                        type="radio"
                        id="ShopName"
                        name="ShopName"
                        placeholder="ShopName"
                        className="formik-input"
                        value="dm"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="ShopName" className="urdu">
                      Tailors
                    </label>
                    <div className="col align-center">
                      <Field
                        style={{ width: 30 }}
                        type="radio"
                        id="ShopName"
                        name="ShopName"
                        placeholder="ShopName"
                        className="formik-input"
                        value="tailors"
                      />
                    </div>
                  </div>
                </div>
                <div className="row justify-between">
                  <div className="col">
                    <label htmlFor="phoneNumber" className="urdu">
                      گاہک کا فون نمبر
                    </label>
                    <Field
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Client Phone Number"
                      className="formik-input"
                      onBlur={async (e) => {
                        const res = await fetchMeasurementsWithPhoneNumber(
                          e.target.value
                        );
                        const clientName = await fetchUserWithPhoneNumber(
                          e.target.value
                        );
                        if (res) {
                          Object.keys(initialValues).forEach((i) => {
                            if (res[i]) {
                              setFieldValue(i, res[i]);
                            }
                          });
                          setMeasurementId(res.id);
                          setNoUserFound(false);
                        } else if (clientName) {
                          setFieldValue("clientName", clientName);
                          setNoUserFound(false);
                          setMeasurementId(false);
                        } else {
                          setNoUserFound(true);
                          const phoneNumber = values.phoneNumber;
                          resetForm();
                          setMeasurementId(false);
                          setFieldValue("phoneNumber", phoneNumber);
                        }
                      }}
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="clientName" className="urdu">
                      {" "}
                      گاہک کا نام
                    </label>
                    <Field
                      id="clientName"
                      name="clientName"
                      placeholder="Client Name"
                      className="formik-input"
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="name" className="urdu">
                      ناپ کا نمبر
                    </label>
                    <Field
                      id="name"
                      name="name"
                      placeholder="Naap Number"
                      className="formik-input"
                    />
                  </div>
                </div>
                <div
                  className="row justify-between"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <div className="col">
                    <label htmlFor="length" className="urdu">
                      لمبائی
                    </label>
                    <Field
                      id="length"
                      name="length"
                      placeholder="length"
                      className="formik-input"
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="shoulder" className="urdu">
                      تیرا
                    </label>
                    <Field
                      id="shoulder"
                      name="shoulder"
                      placeholder="shoulder"
                      className="formik-input"
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="armsLength" className="urdu">
                      بازو
                    </label>
                    <Field
                      id="armsLength"
                      name="armsLength"
                      placeholder="Arms Length"
                      className="formik-input"
                    />
                  </div>
                </div>

                <div
                  className="row justify-between"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <div className="col">
                    <label htmlFor="gala" className="urdu">
                      گلا
                    </label>
                    <Field
                      id="gala"
                      name="gala"
                      placeholder="Gala"
                      className="formik-input"
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="chest1" className="urdu">
                      چھاتی
                    </label>
                    <div className="col align-center">
                      <Field
                        id="chest1"
                        name="chest1"
                        placeholder="Chest"
                        className="formik-input"
                      />
                      <Field
                        id="chest2"
                        name="chest2"
                        placeholder="Chest Half"
                        className="formik-input"
                        style={{ width: "50%", marginTop: 0 }}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="waist1" className="urdu">
                      کمر
                    </label>
                    <div className="col align-center">
                      <Field
                        id="waist1"
                        name="waist1"
                        placeholder="Waist"
                        className="formik-input"
                      />
                      <Field
                        id="waist2"
                        name="waist2"
                        placeholder="Waist Half"
                        className="formik-input"
                        style={{ width: "50%", marginTop: 0 }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="row justify-between"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <div className="col">
                    <label htmlFor="hip1" className="urdu">
                      ہپ
                    </label>
                    <div className="col align-center">
                      <Field
                        id="hip1"
                        name="hip1"
                        placeholder="Hip"
                        className="formik-input"
                      />
                      <Field
                        id="hip2"
                        name="hip2"
                        placeholder="Hip Half"
                        className="formik-input"
                        style={{ width: "50%", marginTop: 0 }}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="armMuscle" className="urdu">
                      موڈھا
                    </label>
                    <div className="col align-center">
                      <Field
                        id="armMuscle"
                        name="armMuscle"
                        placeholder="Arm Muscle"
                        className="formik-input"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="row justify-between"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <div className="col">
                    <label htmlFor="silaiType" className="urdu">
                      سنگل
                    </label>
                    <div className="col align-center">
                      <Field
                        style={{ width: 30 }}
                        type="radio"
                        id="silaiType"
                        name="silaiType"
                        placeholder="silaiType"
                        className="formik-input"
                        value="سنگل"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="silaiType" className="urdu">
                      ڈبل
                    </label>
                    <div className="col align-center">
                      <Field
                        style={{ width: 30 }}
                        type="radio"
                        id="silaiType"
                        name="silaiType"
                        placeholder="silaiType"
                        className="formik-input"
                        value="ڈبل"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="silaiType" className="urdu">
                      ٹرپل
                    </label>
                    <div className="col align-center">
                      <Field
                        style={{ width: 30 }}
                        type="radio"
                        id="silaiType"
                        name="silaiType"
                        placeholder="silaiType"
                        className="formik-input"
                        value="ٹرپل"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <label htmlFor="resham" className="urdu">
                      ریشم
                    </label>
                    <div className="col align-center">
                      <Field
                        style={{ width: 30 }}
                        type="checkbox"
                        id="resham"
                        name="resham"
                        placeholder="resham"
                        className="formik-input"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="design" className="urdu">
                      ڈیزائین
                    </label>
                    <div className="col align-center">
                      <Field
                        style={{ width: 30 }}
                        type="checkbox"
                        id="design"
                        name="design"
                        placeholder="design"
                        className="formik-input"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="row justify-between"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <div className="col">
                    <label htmlFor="gheeraType" className="urdu">
                      گھیرا گول
                    </label>
                    <Field
                      style={{ width: 30 }}
                      type="radio"
                      id="gheeraType"
                      name="gheeraType"
                      placeholder="gheeraType"
                      className="formik-input"
                      value="گھیرا گول"
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="gheeraType" className="urdu">
                      گھیرا سیدھا
                    </label>
                    <div className="col align-center">
                      <Field
                        style={{ width: 30 }}
                        type="radio"
                        id="gheeraType"
                        name="gheeraType"
                        placeholder="gheeraType"
                        className="formik-input"
                        value="گھیرا سیدھا"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="kafNumber" className="urdu">
                      کف نمبر
                    </label>
                    <div className="col align-center">
                      <Field
                        id="kafNumber"
                        name="kafNumber"
                        placeholder="Num"
                        className="formik-input"
                        style={{ width: 50 }}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="kafWidth" className="urdu">
                      چوڑائی
                    </label>
                    <div className="col align-center">
                      <Field
                        id="kafWidth"
                        name="kafWidth"
                        placeholder="width"
                        className="formik-input"
                        style={{ width: 50 }}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="kafLength" className="urdu">
                      لمبائی
                    </label>
                    <div className="col align-center">
                      <Field
                        id="kafLength"
                        name="kafLength"
                        placeholder="Lng"
                        style={{ width: 50 }}
                        className="formik-input"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="kafType" className="urdu">
                      کٹ
                    </label>
                    <div className="col align-center">
                      <Field
                        style={{ width: 30 }}
                        type="radio"
                        id="kafType"
                        name="kafType"
                        placeholder="kafType"
                        className="formik-input"
                        value="کٹ"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <label htmlFor="kafType" className="urdu">
                      گول
                    </label>
                    <Field
                      style={{ width: 30 }}
                      type="radio"
                      id="kafType"
                      name="kafType"
                      placeholder="kafType"
                      className="formik-input"
                      value="گول"
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="kafType" className="urdu">
                      سیدھا
                    </label>
                    <div className="col align-center">
                      <Field
                        style={{ width: 30 }}
                        type="radio"
                        id="kafType"
                        name="kafType"
                        placeholder="kafType"
                        className="formik-input"
                        value="سیدھا"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="row justify-between"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <div className="col">
                    <label htmlFor="pocketNumber" className="urdu">
                      فرنٹ پاکٹ نمبر
                    </label>
                    <div className="col align-center">
                      <Field
                        id="pocketNumber"
                        name="pocketNumber"
                        placeholder="Pocket Number"
                        className="formik-input"
                        style={{ width: 100 }}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="frontPocket" className="urdu">
                      فرنٹ پاکٹ
                    </label>
                    <div className="col align-center">
                      <Field
                        id="frontPocket"
                        name="frontPocket"
                        placeholder="Front Pocket"
                        style={{ width: 50 }}
                        className="formik-input"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="sidePocket" className="urdu">
                      سائیڈ پاکٹ
                    </label>
                    <div className="col align-center">
                      <Field
                        id="sidePocket"
                        name="sidePocket"
                        placeholder="Side Pocket"
                        style={{ width: 50 }}
                        className="formik-input"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <label htmlFor="pattiLength" className="urdu">
                      پٹی لمبائی
                    </label>
                    <div className="col align-center">
                      <Field
                        id="pattiLength"
                        name="pattiLength"
                        placeholder="Patti Length"
                        className="formik-input"
                        style={{ width: 50 }}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="pattingWidth" className="urdu">
                      پٹی چوڑائی
                    </label>
                    <div className="col align-center">
                      <Field
                        id="pattingWidth"
                        name="pattingWidth"
                        placeholder="Patti Width"
                        style={{ width: 50 }}
                        className="formik-input"
                      />
                    </div>
                  </div>

                  <div className="col">
                    <label htmlFor="colar" className="urdu">
                      کالر
                    </label>
                    <div className="col align-center">
                      <Field
                        id="colar"
                        name="colar"
                        placeholder="Colar"
                        style={{ width: 50 }}
                        className="formik-input"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="ben" className="urdu">
                      بین
                    </label>
                    <div className="col align-center">
                      <Field
                        id="ben"
                        name="ben"
                        placeholder="Ben"
                        style={{ width: 50 }}
                        className="formik-input"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="main urdu"
                  style={{ textAlign: "center", fontSize: 24 }}
                >
                  شلوار ناپ
                </div>
                <div
                  className="main urdu"
                  style={{ textAlign: "center", fontSize: 24 }}
                >
                  ----------
                </div>

                <div
                  className="row justify-center"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <div className="col" style={{ marginLeft: 20 }}>
                    <label htmlFor="shalwarType" className="urdu">
                      شلوار
                    </label>
                    <div className="col align-center">
                      <Field
                        id="shalwarType"
                        name="shalwarType"
                        placeholder="shalwarType"
                        style={{ width: 30 }}
                        type="radio"
                        className="formik-input"
                        value="شلوار"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="shalwarType" className="urdu">
                      ٹراوزر
                    </label>
                    <div className="col align-center">
                      <Field
                        id="shalwarType"
                        name="shalwarType"
                        placeholder="shalwarType"
                        style={{ width: 30 }}
                        type="radio"
                        className="formik-input"
                        value="ٹراوزر"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="row justify-between"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <div className="col">
                    <label htmlFor="shalwarLength" className="urdu">
                      لمبائی
                    </label>
                    <div className="col align-center">
                      <Field
                        id="shalwarLength"
                        name="shalwarLength"
                        placeholder="Length"
                        className="formik-input"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="panchaSize" className="urdu">
                      پانچا سائز
                    </label>
                    <div className="col align-center">
                      <Field
                        id="panchaSize"
                        name="panchaSize"
                        placeholder="Pancha Size"
                        className="formik-input"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="shalwarGhera" className="urdu">
                      گھیرا
                    </label>
                    <div className="col align-center">
                      <Field
                        id="shalwarGhera"
                        name="shalwarGhera"
                        placeholder="Ghera"
                        className="formik-input"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="row justify-between"
                  style={{ flexDirection: "row-reverse" }}
                >
                  <div className="col">
                    <label htmlFor="asin" className="urdu">
                      آسن
                    </label>
                    <div className="col align-center">
                      <Field
                        id="asin"
                        name="asin"
                        placeholder="Asin"
                        className="formik-input"
                      />
                    </div>
                  </div>
                  {values.shalwarType !== "ٹراوزر" && (
                    <>
                      <div className="col">
                        <label htmlFor="zipPocket" className="urdu">
                          زپ پاکٹ
                        </label>
                        <div className="col align-center">
                          <Field
                            id="zipPocket"
                            name="zipPocket"
                            placeholder="Zip Pocket"
                            className="formik-input"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <label htmlFor="panchaNumber" className="urdu">
                          پانچا نمبر
                        </label>
                        <div className="col align-center">
                          <Field
                            id="panchaNumber"
                            name="panchaNumber"
                            placeholder="Pancha Number"
                            className="formik-input"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {values.shalwarType === "ٹراوزر" && (
                    <div className="col">
                      <label htmlFor="shalwarWaist" className="urdu">
                        ہپ
                      </label>
                      <div className="col align-center">
                        <Field
                          onChange={() => {
                            if (isError) {
                              setIsError(false);
                            }
                          }}
                          id="shalwarWaist"
                          name="shalwarWaist"
                          placeholder="Hip size"
                          className="formik-input"
                        />
                      </div>
                    </div>
                  )}
                  {values.shalwarType === "ٹراوزر" && (
                    <div className="col">
                      <label htmlFor="pocketDetails" className="urdu">
                        کراس پاکٹ
                      </label>
                      <div className="col align-center">
                        <Field
                          onChange={() => {
                            if (isError) {
                              setIsError(false);
                            }
                          }}
                          id="pocketDetails"
                          name="pocketDetails"
                          placeholder="Cross Pocket"
                          className="formik-input"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="row justify-between w100">
                  <button className="submit-button clickable" type="submit">
                    {measurementId ? "Edit" : "Submit"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <style jsx>{styles}</style>
    </main>
  );
}
