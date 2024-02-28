import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles";
import { getDataById } from "@/models";
export default function HomePage() {
  const [order, setOrder] = useState(null);
  const [orderId, setOrderId] = useState(null);

  async function getOrder() {
    const res = await getDataById("Orders", orderId);
    delete res.measurement;
    setOrder(res);
  }

  console.log({ order });

  return (
    <main>
      <div className="main">asdasd</div>
      <div>
        <input
          type="text"
          onChange={(e) => {
            setOrderId(e.target.value);
          }}
        />
        <button
          onClick={() => {
            getOrder();
          }}
        >
          Get Order
        </button>
      </div>
      <div>
        {order &&
          Object.keys(order).map((i) => (
            <div key={i.id} style={{display: 'flex'}}>
              <div>{i}</div>{" "}|{" "}
              <div>{order[i]}</div>
            </div>
          ))}
      </div>

      <style jsx>{styles}</style>
    </main>
  );
}
