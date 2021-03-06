import React, { useState, useEffect } from "react";
import {
 StyleSheet,
 Text,
 View,
 FlatList,
 TouchableOpacity,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { NavigationContainer } from "@react-navigation/native";

const db = SQLite.openDatabase("notes.db");
console.log(FileSystem.documentDirectory);
let count = 0;

export default function NotesScreen({ navigation, route }) {
 const [notes, setNotes] = useState([]);
 
  function refreshNotes() {
  console.log("inside refreshNotes()", count++, route.params);
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM notes order by done, id",
        null,
        (txObj, { rows: {_array } }) => setNotes(_array),
        (txObj, error) => console.log("Error ", error)
      ); 
    })
  };

 useEffect( () => {
      db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS
        notes
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        done INT);`
      );
    }, null, refreshNotes);
  }, []
  );

  useEffect(() => {
    console.log("inside useeffect insert", count++, route.params);
    if (route.params?.text) {
      db.transaction((tx) => {
        tx.executeSql("INSERT INTO notes (done, title) VALUES (0, ?)", [
          route.params.text,
        ]);
      },
      null,
      refreshNotes,
      );
    }     
  }, [route.params?.text]);

 useEffect(() => {
  console.log("inside useeffect touchable",  count++, route.params);
   navigation.setOptions({
     headerRight: () => (
       <TouchableOpacity onPress={addNote}>
         <Entypo
           name="new-message"
           size={24}
           color="black"
           style={{ marginRight: 20 }}
         />
       </TouchableOpacity>
     ),
   });
 });

 //console.log("in notescreen", count++, route.params);
 
 /*
 useEffect(() => {
    if (route.params?.text) {
      const newNote = {
        title: route.params.text,
        done: false,
        id: notes.length.toString(),
      };
      setNotes([...notes, newNote]);
    }
  }, [route.params?.text]);
*/
 function addNote() {
   navigation.navigate("Add Note");
 };

 function updateNote(id, text) {
    db.transaction((tx) => {tx.executeSql(`UPDATE notes SET title=${text} WHERE id=${id}`);
  },
  null,
  refreshNotes,
  );
  };

 function deleteNote(id) {
   console.log("Deleting ", id, count++);
  db.transaction((tx) => {
    tx.executeSql(`DELETE FROM notes WHERE id =${id}`);
  },
  null,
  refreshNotes,
  );
 };

 function doneNote(id) {
  console.log("In done id=", id, count++);
  db.transaction((tx) => {
    tx.executeSql(`UPDATE notes set done=${1} WHERE id =${id}`);
  },
  null,
  refreshNotes,
  );
 };
 

 let iconName;

 function renderItem({ item }) {
    iconName = item.done ? 'checkbox-outline' : 'checkbox' ;
    return (
     <View
       style={{
         padding: 10,
         paddingTop: 20,
         paddingBottom: 20,
         borderBottomColor: "#ccc",
         borderBottomWidth: 1,
         flexDirection: "row-reverse",
         justifyContent: "space-between",
       }}
     >
       <TouchableOpacity onPress={ () => doneNote(item.id)}>
         <Ionicons
           name={iconName} 
           size={16}
           color="red" 
           style={{ marginLeft: 20 }}
         />
       </TouchableOpacity>
       <Text onPress={ () => navigation.navigate("Update Note", {item})} style={{ textAlign: "left", fontSize: 16 }}>{item.title}</Text>

       <TouchableOpacity onPress={ () => deleteNote(item.id)}>
         <Entypo
           name="trash" 
           size={16}
           color="black" 
           style={{ marginRight: 20 }}
         />
       </TouchableOpacity>

     </View>
   );
 };

/*
 function UpdateScreen({ route }) {
  console.log("UpdateScreen route", count++, {route});
 // Destructure this object so we don't have to type route.params.red etc
 const { red, green, blue } = route.params;

 return (
   <View
     style={[
       styles.container,
       { backgroundColor: `rgb(${red}, ${green}, ${blue})` },
     ]}
   >
     <View style={{ padding: 30 }}>
       <Text style={styles.detailText}>Red: {red}</Text>
       <Text style={styles.detailText}>Green: {green}</Text>
       <Text style={styles.detailText}>Blue: {blue}</Text>
     </View>
   </View>
 );
}
*/

 /* these codes will delete all
        <Text style={{ textAlign: "left", fontSize: 16 }}>{item.title}</Text>
         <TouchableOpacity onPress={deleteNote(item.id)}>
         <Entypo
           name="trash" 
           size={16}
           color="black" 
           style={{ marginRight: 20 }}
         />
       </TouchableOpacity>
 */

 return (
   <View style={styles.container}>
     <FlatList
       style={{ width: "100%" }}
       data={notes}
       renderItem={renderItem}
       keyExtractor={(item) => item.id.toString()}
     />
   </View>
 /*  <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name="Update Note" component={UpdateScreen} />
     </Stack.Navigator>
   </NavigationContainer> */
   
   );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#ffc",
   alignItems: "center",
   justifyContent: "center",
 },
});




