import { getDataById } from "@/models";
import { useFormik } from "formik";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";

const singleOrder = {
  phoneNumber: "",
  clientName: "",
  id: "",
  orderGroupId: "",
  bookingDate: moment().format(),
  deliveryDate: null,
  shop: "dm",
  status: "Received",
  ammount: 0,
  isPaid: false,
  isDelivered: false,
};

export default function useAddOrder({ handleOrdersUpload, measurements }) {
  const initialValues = {
    orders: [singleOrder],
  };
  const {
    handleSubmit,
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    touched,
    errors,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      const data = values;
      // set order ids and measurements in handleOrdersUpload function
      // measurements are in array now and need to add accordingly in every order
      await handleOrdersUpload(data, measurements);
    },
  });

  const handleAddOrders = useCallback(() => {
    setFieldValue("orders", [...values.orders, singleOrder]);
  }, [values.orders, setFieldValue]);

  const handleRemoveOrders = useCallback(
    (orderNumber) => {
      if (values.orders.length < 2) return;
      const previouseOrders = [...values.orders];
      const newOrders = previouseOrders
        .map((i, index) => {
          if (index !== orderNumber) {
            return i;
          } else return null;
        })
        .filter((i) => i !== null);
      setFieldValue("orders", newOrders);
    },
    [values.orders, setFieldValue]
  );

  const handleSetData = useCallback(
    (field, data, orderNumber) => {
      const previouseOrders = [...values.orders];
      const newOrders = previouseOrders.map((obj, index) => {
        if (index === orderNumber) {
          const newObj = { ...obj, [field]: data };
          return newObj;
        } else {
          return obj;
        }
      });
      setFieldValue("orders", newOrders);
    },
    [setFieldValue, values.orders]
  );

  return {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    handleAddOrders,
    handleRemoveOrders,
    handleSetData,
  };
}
