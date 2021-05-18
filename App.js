import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ScreenStackHeaderRightView } from "react-native-screens";
import * as SQLite from "expo-sqlite";
import NotesStack from "./screens/NotesStack";
import AddScreen from "./screens/AddScreen";
import UpdateScreen from "./screens/UpdateScreen";

/*const db = SQLite.openDatabase("notes.db"); moved to MotesScreen*/

const Stack = createStackNavigator();

function Update(route, navigation){
  console.log({route}, "update...");
  return(
    <View style= {{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Text> Here! {route.params}</Text>

          <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.button, styles.cancelButton]}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal" headerMode="none">
        <Stack.Screen
          name="Notes Stack"
          component={NotesStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Add Note" component={AddScreen} />
        <Stack.Screen name="Update Note" component={Update} />
      </Stack.Navigator>
    </NavigationContainer>
  );
 }
 
/*
export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen
         name="Notes"
         component={NotesScreen}
         options={{
           headerTitle: "Notes App",
           headerTitleStyle: {
             fontWeight: "bold",
             fontSize: 30,
           },
           headerStyle: {
             height: 120,
             backgroundColor: "green",
             borderBottomColor: "#ccc",
             borderBottomWidth: 1,
           },
         }}
       />
     </Stack.Navigator>
   </NavigationContainer>
 );
}
modal */

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#ffc",
   alignItems: "center",
   justifyContent: "center",
 },
});

