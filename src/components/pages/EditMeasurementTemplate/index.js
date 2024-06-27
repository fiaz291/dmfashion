import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles";
import { Field, Form, Formik } from "formik";
import {
  fetchMeasurementsWithPhoneNumber,
  fetchUserWithPhoneNumber,
  getDataById,
  writeData,
} from "@/models";
import { toast } from "react-toastify";

export default function EditMeasurementTemplate({
  isEdit = false,
  id = null,
  disabled = false,
  fetchData = null,
}) {
  const [measurement, setMeasurement] = useState(null);
  const [noUserFound, setNoUserFound] = useState(false);
  useEffect(() => {
    async function getMeasurements() {
      const res = await getDataById("Measurements", id);
      if (res) {
        setMeasurement(res);
      }
    }
    if (isEdit) {
      getMeasurements();
    }
  }, [isEdit, id]);

  useEffect(() => {
    if (fetchData) {
      setMeasurement(fetchData);
    }
  }, [fetchData]);

  async function handleUserUpload(data) {
    if (disabled) return;
    const res = await writeData("Measurements", data);
    if (noUserFound) {
      await writeData("Users", {
        conctact: [{ phoneNumber: data.phoneNumber }],
        name: data.clientName,
      });
    }
    return res;
  }

  const getInitialValues = useCallback(() => {
    return {
      ShopName: measurement?.ShopName || "",
      phoneNumber: measurement?.phoneNumber || "",
      clientName: measurement?.clientName || "",
      name: measurement?.name || "",
      length: measurement?.length || "",
      shoulder: measurement?.shoulder || "",
      armsLength: measurement?.armsLength || "",
      gala: measurement?.gala || "",
      chest1: measurement?.chest1 || "",
      chest2: measurement?.chest2 || "",
      waist1: measurement?.waist1 || "",
      waist2: measurement?.waist2 || "",
      hip1: measurement?.hip1 || "",
      hip2: measurement?.hip2 || "",
      silaiType: measurement?.silaiType || "سنگل",
      resham: measurement?.resham || false,
      design: measurement?.design || false,
      gheeraType: measurement?.gheeraType || "گھیرا گول",
      kafNumber: measurement?.kafNumber || "",
      kafWidth: measurement?.kafWidth || "",
      kafLength: measurement?.kafLength || "",
      kafType: measurement?.kafType || "گول",
      pocketNumber: measurement?.pocketNumber || "",
      pattiLength: measurement?.pattiLength || "",
      pattingWidth: measurement?.pattingWidth || "",
      sidePocket: measurement?.sidePocket || "",
      frontPocket: measurement?.frontPocket || "",
      colar: measurement?.colar || "",
      ben: measurement?.ben || "",
      shalwarType: measurement?.shalwarType || "شلوار",
      shalwarGhera: measurement?.shalwarGhera || "",
      zipPocket: measurement?.zipPocket || "",
      shalwarWaist: measurement?.shalwarWaist || "",
      shalwarLength: measurement?.shalwarLength || "",
      panchaNumber: measurement?.panchaNumber || "",
      panchaSize: measurement?.panchaSize || "",
      asin: measurement?.asin || "",
      pocketDetails: measurement?.pocketDetails || "",
      armMuscle: measurement?.armMuscle || "",
    };
  }, [measurement]);

  return (
    <main>
      {!disabled && (
        <div className="main urdu" style={{ textAlign: "center" }}>
          نیا ناپ
        </div>
      )}
      <div key={measurement}>
        <Formik
          initialValues={getInitialValues()}
          onSubmit={async (values, { resetForm }) => {
            const res = await handleUserUpload(values);
            if (!res?.error) {
              toast("Measurement Added");
              resetForm();
            }
          }}
        >
          {({ values, setFieldValue }) => (
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
                <div className="row">
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
                      disabled={disabled}
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Name"
                      className="formik-input"
                      onBlur={async (e) => {
                        const res = await fetchMeasurementsWithPhoneNumber(
                          e.target.value
                        );
                        const phoneNumber = await fetchUserWithPhoneNumber(
                          e.target.value
                        );
                        if (res) {
                          setMeasurement(res[0]);
                        }
                        if (phoneNumber) {
                          setFieldValue("clientName", phoneNumber);
                        } else {
                          // setNoUserFound(true);
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
                      disabled={disabled}
                      id="clientName"
                      name="clientName"
                      placeholder="Client Name"
                      className="formik-input"
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="name" className="urdu">
                      ناپ کا نام
                    </label>
                    <Field
                      disabled={disabled}
                      id="name"
                      name="name"
                      placeholder="Name"
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
                      disabled={disabled}
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
                      disabled={disabled}
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
                      disabled={disabled}
                      id="armsLength"
                      name="armsLength"
                      placeholder="armsLength"
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
                      disabled={disabled}
                      id="gala"
                      name="gala"
                      placeholder="gala"
                      className="formik-input"
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="chest1" className="urdu">
                      چھاتی
                    </label>
                    <div className="col align-center">
                      <Field
                        disabled={disabled}
                        id="chest1"
                        name="chest1"
                        placeholder="chest1"
                        className="formik-input"
                      />
                      <Field
                        disabled={disabled}
                        id="chest2"
                        name="chest2"
                        placeholder="chest2"
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
                        disabled={disabled}
                        id="waist1"
                        name="waist1"
                        placeholder="waist1"
                        className="formik-input"
                      />
                      <Field
                        disabled={disabled}
                        id="waist2"
                        name="waist2"
                        placeholder="waist2"
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
                        disabled={disabled}
                        id="hip1"
                        name="hip1"
                        placeholder="hip1"
                        className="formik-input"
                      />
                      <Field
                        disabled={disabled}
                        id="hip2"
                        name="hip2"
                        placeholder="hip2"
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
                        placeholder="armMuscle"
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
                        disabled={disabled}
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
                        disabled={disabled}
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
                        disabled={disabled}
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
                        disabled={disabled}
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
                        disabled={disabled}
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
                      disabled={disabled}
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
                        disabled={disabled}
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
                        disabled={disabled}
                        id="kafNumber"
                        name="kafNumber"
                        placeholder="kafNumber"
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
                        disabled={disabled}
                        id="kafWidth"
                        name="kafWidth"
                        placeholder="kafWidth"
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
                        disabled={disabled}
                        id="kafLength"
                        name="kafLength"
                        placeholder="kafLength"
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
                        disabled={disabled}
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
                      disabled={disabled}
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
                        disabled={disabled}
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
                      پاکٹ نمبر
                    </label>
                    <div className="col align-center">
                      <Field
                        disabled={disabled}
                        id="pocketNumber"
                        name="pocketNumber"
                        placeholder="pocketNumber"
                        className="formik-input"
                        style={{ width: 100 }}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="pattiLength" className="urdu">
                      پٹی لمبائی
                    </label>
                    <div className="col align-center">
                      <Field
                        disabled={disabled}
                        id="pattiLength"
                        name="pattiLength"
                        placeholder="pattiLength"
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
                        disabled={disabled}
                        id="pattingWidth"
                        name="pattingWidth"
                        placeholder="pattingWidth"
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
                        disabled={disabled}
                        id="sidePocket"
                        name="sidePocket"
                        placeholder="sidePocket"
                        style={{ width: 50 }}
                        className="formik-input"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="frontPocket" className="urdu">
                      فرنٹ پاکٹ
                    </label>
                    <div className="col align-center">
                      <Field
                        disabled={disabled}
                        id="frontPocket"
                        name="frontPocket"
                        placeholder="frontPocket"
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
                        disabled={disabled}
                        id="colar"
                        name="colar"
                        placeholder="colar"
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
                        disabled={disabled}
                        id="ben"
                        name="ben"
                        placeholder="ben"
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
                        disabled={disabled}
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
                        disabled={disabled}
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
                    <label htmlFor="shalwarGhera" className="urdu">
                      گھیرا
                    </label>
                    <div className="col align-center">
                      <Field
                        disabled={disabled}
                        id="shalwarGhera"
                        name="shalwarGhera"
                        placeholder="shalwarGhera"
                        className="formik-input"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="zipPocket" className="urdu">
                      زپ پاکٹ
                    </label>
                    <div className="col align-center">
                      <Field
                        disabled={disabled}
                        id="zipPocket"
                        name="zipPocket"
                        placeholder="zipPocket"
                        className="formik-input"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="shalwarWaist" className="urdu">
                      کمر
                    </label>
                    <div className="col align-center">
                      <Field
                        disabled={disabled}
                        id="shalwarWaist"
                        name="shalwarWaist"
                        placeholder="shalwarWaist"
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
                    <label htmlFor="shalwarLength" className="urdu">
                      لمبائی
                    </label>
                    <div className="col align-center">
                      <Field
                        disabled={disabled}
                        id="shalwarLength"
                        name="shalwarLength"
                        placeholder="shalwarLength"
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
                        disabled={disabled}
                        id="panchaNumber"
                        name="panchaNumber"
                        placeholder="panchaNumber"
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
                        disabled={disabled}
                        id="panchaSize"
                        name="panchaSize"
                        placeholder="panchaSize"
                        className="formik-input"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="row justify-between"
                  style={{
                    flexDirection: "row-reverse",
                  }}
                >
                  <div className="col">
                    <label htmlFor="asin" className="urdu">
                      آسن
                    </label>
                    <div className="col align-center">
                      <Field
                        disabled={disabled}
                        id="asin"
                        name="asin"
                        placeholder="asin"
                        className="formik-input"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor="pocketDetails" className="urdu">
                      پاکٹ لگائیں
                    </label>
                    <div className="col align-center">
                      <Field
                        disabled={disabled}
                        id="pocketDetails"
                        name="pocketDetails"
                        placeholder="pocketDetails"
                        className="formik-input"
                      />
                    </div>
                  </div>
                </div>

                {!disabled && (
                  <div className="row justify-between w100">
                    <button className="submit-button clickable" type="submit">
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <style jsx>{styles}</style>
    </main>
  );
}
