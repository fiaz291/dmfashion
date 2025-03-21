import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import DrawerLayout from "@/components/app/DrawerLayout";
import AddNewMeasurementTemplate from "@/components/pages/AddNewMeasurementTemplate";

export default function AddNewMeasurement() {
  return (
    <DrawerLayout>
      <Head>
        <title>Add New Measurement</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AddNewMeasurementTemplate />
    </DrawerLayout>
  );
}
