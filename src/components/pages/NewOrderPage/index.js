import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles";
import { useFormik } from "formik";
import {
  fetchMeasurementsWithPhoneNumber,
  fetchUserWithPhoneNumber,
} from "@/models";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Checkbox,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import EditMeasurementTemplate from "../EditMeasurementTemplate";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import useAddOrder from "@/components/hooks/addOrders";

const BRANCHES = [
  { name: "DM Fashion", key: "dm" },
  { name: "The Tailors", key: "tt" },
];

const STATUS = ["Received", "Cutting", "Stich", "Press", "Ready"];

export default function NewOrderPage({ handleOrdersUpload }) {
  const [measurements, setMeasurements] = useState([]);
  const [selectedMeasurement, setSelectedMeasurement] = useState(null);
  const {
    handleSubmit,
    values,
    handleSetData,
    handleAddOrders,
    handleRemoveOrders,
  } = useAddOrder({
    handleOrdersUpload,
    measurements,
  });

  const regex = /^\d{11}$/;
  const handleGetMeasurements = async (phone) => {
    if (regex.test(phone)) {
      const res = await fetchMeasurementsWithPhoneNumber(phone);
      if (res) {
        setMeasurements([...measurements, res]);
      }
    }
  };

  const handleRemoveMeasurement = (index) => {
    const preMeasurements = [...measurements];
    preMeasurements.splice(index, 1);
    setMeasurements(preMeasurements);
  };

  const today = new Date();
  return (
    <main>
      <div className="main">Place New Order</div>
      <Stack direction="row" gap={8} style={{ width: "100%" }}>
        <Box style={{ width: "50%", minWidth: 550 }}>
          <form onSubmit={handleSubmit}>
            {values.orders.map((order, index) => (
              <Stack key={index}>
                <Stack
                  direction="row"
                  sx={{ margin: "10px 0" }}
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Box>
                    <label>Phone Number</label>
                    <TextField
                      fullWidth
                      id="phoneNumber"
                      name="phoneNumber"
                      onChange={async (e) => {
                        // e.preventDefault();
                        handleSetData("phoneNumber", e.target.value, index);
                        if (regex.test(e.target.value)) {
                          await handleGetMeasurements(e.target.value);
                        }
                      }}
                      value={order.phoneNumber}
                      hiddenLabel
                    />
                  </Box>

                  <Box>
                    {measurements[index] && (
                      <>
                        <Box sx={{ marginBottom: 1 }}>
                          {measurements[index]
                            ? measurements[index].clientName
                            : ""}
                        </Box>
                        <Button
                          style={{ height: "100%" }}
                          variant="contained"
                          onClick={() => {
                            setSelectedMeasurement(null);
                            setTimeout(() => {
                              setSelectedMeasurement(measurements[index]);
                            }, 100);
                          }}
                        >
                          Measurement
                        </Button>
                      </>
                    )}
                  </Box>
                </Stack>
                <Stack
                  sx={{ margin: "10px 0" }}
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Box>
                    <label>Shop</label>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      hiddenLabel
                      value={order.shop}
                      onChange={(e) => {
                        handleSetData("shop", e.target.value, index);
                      }}
                    >
                      {BRANCHES.map((branch) => (
                        <MenuItem value={branch.key} key={branch.key}>
                          {branch.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box>
                    <label>Status</label>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      hiddenLabel
                      value={order.status}
                      onChange={(e) => {
                        handleSetData("status", e.target.value, index);
                      }}
                    >
                      {STATUS.map((i) => (
                        <MenuItem value={i} key={i}>
                          {i}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box>
                    <label>Amount</label>
                    <TextField
                      fullWidth
                      id="Amount"
                      name="Amount"
                      hiddenLabel
                      type="Amount"
                      value={order.ammount}
                      onChange={(e) => {
                        handleSetData("ammount", e.target.value, index);
                      }}
                    />
                  </Box>
                </Stack>
                <Stack
                  sx={{ margin: "10px 0" }}
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Box>
                    <label>Paid</label>
                    <Checkbox
                      fullWidth
                      id="isPaid"
                      name="isPaid"
                      checked={order.isPaid}
                      hiddenLabel
                      onChange={(e) => {
                        handleSetData("isPaid", e.target.checked, index);
                      }}
                    />
                  </Box>
                  <Box>
                    <label>Delivered</label>
                    <Checkbox
                      fullWidth
                      checked={order.isDelivered}
                      hiddenLabel
                      onChange={(e) => {
                        handleSetData("isDelivered", e.target.checked, index);
                      }}
                    />
                  </Box>
                  <Box>
                    <label>Delivery Date</label>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        onChange={(e) => {
                          const selectedDate = moment(e);
                          const newDate = selectedDate.format();
                          handleSetData("deliveryDate", newDate, index);
                        }}
                        value={moment(order.deliveryDate)}
                        minDate={moment(today)}
                        sx={{ width: "100%" }}
                      />
                    </LocalizationProvider>
                  </Box>
                </Stack>
                {values.orders.length > 1 && (
                  <Button
                    sx={{ background: "red", color: "#fff", marginBottom: 2 }}
                    onClick={() => {
                      handleRemoveOrders(index);
                      handleRemoveMeasurement(index);
                    }}
                  >
                    Remove
                  </Button>
                )}
              </Stack>
            ))}

            <Button
              color="primary"
              variant="contained"
              fullWidth
              sx={{ marginBottom: 2 }}
              onClick={handleAddOrders}
            >
              Add New Order
            </Button>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Box>
        <Box key={selectedMeasurement}>
          {selectedMeasurement && (
            <EditMeasurementTemplate disabled fetchData={selectedMeasurement} />
          )}
        </Box>
      </Stack>
      <style jsx>{styles}</style>
    </main>
  );
}
