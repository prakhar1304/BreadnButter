import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const First = () => {
  return <Redirect href={"/splash"} />;
};

export default First;

const styles = StyleSheet.create({});
