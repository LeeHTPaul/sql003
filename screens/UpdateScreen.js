import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import {TextInput} from "react-native";

export default function UpdateScreen( {route} , navigation) {
    const text1 = route.params.title;
    const id1 = route.params.id;
    let countUs = 0;
    console.log("Inside updatescreen=", {route}, route.length, "count=", countUs++);

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.label}>Update your todo</Text>
        <TextInput
          style={styles.textInput}
          value={text1}
          onChangeText={(newText) => setText(newText)}
        ></TextInput>
         <Text style={{ marginTop: 40, color: "grey" }}>
          This is what you typed:
        </Text>
        <Text style={{ color: "#333", marginTop: 10 }}>{text1}</Text>

        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.button, styles.cancelButton]}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

      </View>
    );
   }
   
   
   const styles = StyleSheet.create({
    label: {
      fontWeight: "bold",
      fontSize: 24,
    },
    textInput: {
      margin: 20,
      borderWidth: 1,
      width: "80%",
      padding: 10,
      borderColor: "#ccc",
    },
    buttons: {
      flexDirection: "row",
    },
    button: {
      padding: 10,
      margin: 5,
    },
    buttonText: {
      fontWeight: "bold",
      color: "white",
    },
    submitButton: {
      backgroundColor: "orange",
    },
    cancelButton: {
      backgroundColor: "red",
    },
   });
   
   
/*        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notes", {text})}
            style={[styles.button, styles.submitButton]}
          >
*/