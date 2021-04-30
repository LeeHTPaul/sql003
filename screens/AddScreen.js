import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import {TextInput} from "react-native";

/* before text input
export default function AddScreen({ navigation }) {
 return (
   <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
     <Text>This is the add screen</Text>
     <TouchableOpacity
       onPress={() => navigation.goBack()}
       style={{ padding: 10 }}
     >
       <Text style={{ color: "orange" }}>Dismiss</Text>
     </TouchableOpacity>
   </View>
 );
}
*/

export default function AddScreen({ route, navigation }) {
    const [text, setText] = useState("");
    let countas = 0;
    console.log("addscreen=", {text}, text.length, "count=", countas++);

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.label}>Add your todo</Text>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={(newText) => setText(newText)}
        ></TextInput>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notes", {text})}
            style={[styles.button, styles.submitButton]}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.button, styles.cancelButton]}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
   
        <Text style={{ marginTop: 40, color: "grey" }}>
          This is what you typed:
        </Text>
        <Text style={{ color: "#333", marginTop: 10 }}>{text}</Text>
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
   
   
      