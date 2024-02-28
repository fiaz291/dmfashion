import Head from "next/head";
import React, { useEffect, useState } from "react";
import DrawerLayout from "@/components/app/DrawerLayout";
import NewOrderPage from "@/components/pages/NewOrderPage";
import {
  IncrementGroupId,
  fetchUserObjectWithPhoneNumber,
  getDataById,
  placeOrder,
} from "@/models";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function NewOrder() {
  const [currentOrderNumber, setCurrentOrderNumber] = useState(null);
  const router = useRouter();
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

  async function handleOrdersUpload(data, measurements) {
    let orderGroupId;
    let totalGroupAmount = 0;
    let totalSuites = 0;
    let deliveryDate;
    let orderIds = [];
    let phoneNumber;
    let bookingDate;
    let numbers = [];
    let shopName;

    const ordersWithMeasurementAndId = data.orders.map((order, index) => {
      totalSuites += 1;
      deliveryDate = order.deliveryDate;
      totalGroupAmount += parseInt(order.ammount);
      const obj = { ...order };
      const shop =
        order.shop === "dm" ? currentOrderNumber.dm : currentOrderNumber.tt;
      shopName = order.shop === "dm" ? "dmFashion" : "tailors";
      orderGroupId = IncrementGroupId(shop);
      bookingDate = order.bookingDate;
      const orderId = orderGroupId + "-" + (index + 1);
      if (!phoneNumber) {
        phoneNumber = order.phoneNumber;
      }
      orderIds.push(orderId);
      if (!numbers.includes(order.name)) {
        numbers.push(order.name);
      }
      obj.id = orderId;
      obj.orderGroupId = orderGroupId;
      obj.measurement = measurements[index];
      obj.clientName = measurements[index].clientName;
      return obj;
    });

    const user = await fetchUserObjectWithPhoneNumber(phoneNumber);
    let userObject = { ...user };

    const groupOrderObj = {
      id: orderGroupId,
      totalAmount: totalGroupAmount,
      totalSuites: totalSuites,
      deliveryDate: deliveryDate,
      orderIds: orderIds,
      phoneNumber: phoneNumber,
      bookingDate: bookingDate,
      shopName: shopName,
    };

    if (user && !!user.orders) {
      const userOrders = { ...user.orders, [orderGroupId]: groupOrderObj };
      userObject = { ...userObject, orders: userOrders };
    } else {
      userObject = {
        ...userObject,
        orders: { [orderGroupId]: groupOrderObj },
      };
    }

    const res = await placeOrder(
      ordersWithMeasurementAndId,
      userObject,
      shopName,
      orderGroupId
    );
    if (!res?.error) {
      toast("Order Placed");
      router.push('/')
    }
  }
  return (
    <DrawerLayout>
      <Head>
        <title>Place New Order</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NewOrderPage handleOrdersUpload={handleOrdersUpload} />
    </DrawerLayout>
  );
}
