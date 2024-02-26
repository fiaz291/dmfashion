import { useFormik } from "formik";
import moment from "moment";
import { useCallback } from "react";

const singleOrder = {
  phoneNumber: "",
  clientName: "",
  id: "",
  orderGroupId: "",
  bookingDate: null,
  deliveryDate: null,
  shop: "DMFashion",
  status: "received",
  ammount: 0,
  isPaid: false,
  isDelivered: "",
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
      const data = { ...values, measurement: measurements };
      // set order ids in handleOrdersUpload function
      await handleOrdersUpload(data);
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
      console.log({ newOrders });
      setFieldValue("orders", newOrders);
    },
    [values.orders, setFieldValue]
  );

  const handleSetData = useCallback(
    (field, data, orderNumber) => {
      const previouseOrders = [...values.orders];
      const newOrders = previouseOrders.map((i, index) => {
        if (index === orderNumber) {
            console.log()
          i[field] = data;
          return i;
        } else return i;
      });
      console.log({ newOrders });
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
