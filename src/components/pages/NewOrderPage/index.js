import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles";
import { useFormik } from "formik";
import {
  fetchMeasurementsWithPhoneNumber,
  getDataById,
  writeData,
} from "@/models";
import { toast } from "react-toastify";
import { Box, Button, Stack, TextField } from "@mui/material";
import EditMeasurementTemplate from "../EditMeasurementTemplate";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import useAddOrder from "@/components/hooks/addOrders";

export default function NewOrderPage({ handleOrdersUpload }) {
  const [currentOrderNumber, setCurrentOrderNumber] = useState(null);
  const [measurements, setMeasurements] = useState(null);
  const {
    handleSubmit,
    values,
    handleSetData,
    handleChange,
    handleBlur,
    touched,
    errors,
    handleAddOrders,
    handleRemoveOrders,
  } = useAddOrder({
    handleOrdersUpload,
    measurements,
  });

  useEffect(() => {
    async function getMeasurements(phone) {
      const res = await fetchMeasurementsWithPhoneNumber(phone);
      if (res) {
        setMeasurements(res);
      }
    }
    const regex = /^\d{11}$/;

    if (regex.test(values.phoneNumber)) {
      getMeasurements(values.phoneNumber);
    }
  }, [values.phoneNumber]);

  useEffect(() => {
    async function getIds() {
      const dmFashionId = await getDataById("OrderCounts", "dmFashion");
      const tailorsId = await getDataById("OrderCounts", "tailors");
      setCurrentOrderNumber({
        dm: dmFashionId?.currentOrder,
        tt: tailorsId?.currentOrder,
      });
    }
    if (!currentOrderNumber) {
      getIds();
    }
  }, [currentOrderNumber]);

  return (
    <main>
      <div className="main">Place New Order</div>
      <Stack direction="row" gap={8} style={{ width: "100%" }}>
        <Box style={{ width: "50%", minWidth: 550 }}>
          <form onSubmit={handleSubmit}>
            {values.orders.map((order, index) => (
              <Stack key={index}>
                <Stack direction="row" spacing={2}>
                  <Box>
                    <label>Phone Number</label>
                    <TextField
                      fullWidth
                      id="phoneNumber"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                      hiddenLabel
                    />
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Box>
                    <label>Shop</label>
                    <TextField
                      fullWidth
                      id="shop"
                      name="shop"
                      value={values.shop}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.shop && Boolean(errors.shop)}
                      helperText={touched.shop && errors.shop}
                      hiddenLabel
                    />
                  </Box>
                  <Box>
                    <label>Current Status</label>
                    <TextField
                      fullWidth
                      id="status"
                      name="status"
                      type="status"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.status && Boolean(errors.status)}
                      helperText={touched.status && errors.status}
                    />
                  </Box>
                  <Box>
                    <label>Amount</label>
                    <TextField
                      fullWidth
                      id="Amount"
                      name="Amount"
                      label="Amount"
                      type="Amount"
                      value={values.Amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.Amount && Boolean(errors.Amount)}
                      helperText={touched.Amount && errors.Amount}
                    />
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Box>
                    <label>Paid?</label>
                    <TextField
                      fullWidth
                      id="isPaid"
                      name="isPaid"
                      value={values.isPaid}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.isPaid && Boolean(errors.isPaid)}
                      helperText={touched.isPaid && errors.isPaid}
                      hiddenLabel
                    />
                  </Box>
                  <Box>
                    <label>Delivered?</label>
                    <TextField
                      fullWidth
                      id="isDelivered"
                      name="isDelivered"
                      label="isDelivered"
                      type="isDelivered"
                      value={values.isDelivered}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.isDelivered && Boolean(errors.isDelivered)}
                      helperText={touched.isDelivered && errors.isDelivered}
                    />
                  </Box>
                  <Box>
                    <label>Delivery Date</label>
                    {/* <input
                      type="date"
                      onChange={(e) => {
                        // console.log({ abc: e.target.value.toISOString() });
                        // const date = moment(e.target.value).toISOString();
                        const selectedDate = e.target.value; // This is the selected date from the input
                        const browserTime = moment(selectedDate).format(); // Convert to browser's local time
                        console.log(browserTime);
                        // console.log({ date });
                        
                      }}
                    /> */}
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        onChange={(e) => {
                          const selectedDate = moment(e);
                          const newDate = selectedDate.format();
                          handleSetData("deliveryDate", newDate, index);
                          handleSetData(
                            "bookingDate",
                            moment().format(),
                            index
                          );
                        }}
                        value={moment(order.deliveryDate)}
                      />
                    </LocalizationProvider>
                  </Box>
                </Stack>
                <Button
                  sx={{ background: "red" }}
                  onClick={() => {
                    handleRemoveOrders(index);
                  }}
                >
                  Remove
                </Button>
              </Stack>
            ))}

            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={handleAddOrders}
            >
              Add New Order
            </Button>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Box>
        <Box>
          {measurements && (
            <EditMeasurementTemplate disabled fetchData={measurements} />
          )}
        </Box>
      </Stack>
      <style jsx>{styles}</style>
    </main>
  );
}
