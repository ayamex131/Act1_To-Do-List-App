import { StatusBar } from 'expo-status-bar';
import { Platform, KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Tasks from './components/Tasks';
import React, { useState } from 'react';

export default function App() {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [search, setSearch] = useState(""); 
  const [editIndex, setEditIndex] = useState(null); 

  // Add or update task
  const handleAddTask = () => {
    Keyboard.dismiss();
    if (editIndex !== null) {
      let itemsCopy = [...taskItems];
      itemsCopy[editIndex].text = task;
      setTaskItems(itemsCopy);
      setEditIndex(null);
    } else {
      setTaskItems([...taskItems, { text: task, completed: false }]); 
    }
    setTask(null);
  };

  // Edit task
  const handleEditTask = (index) => {
    setTask(taskItems[index].text);
    setEditIndex(index);
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  //sa pag mark as done
  const toggleCompletion = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index].completed = !itemsCopy[index].completed; 
    setTaskItems(itemsCopy);
  };

  // Filter tasks based on search query
  const filteredTasks = taskItems.filter(item => 
    item.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.taskContainer}>
          <Text style={styles.taskHeader}>
            TO DO LIST (HAHAYS KAPOY)
          </Text>

          <TextInput 
            style={styles.searchInput} 
            placeholder='Search tasks' 
            value={search} 
            onChangeText={text => setSearch(text)} 
          />

          <View style={styles.taskName}>
            {
              filteredTasks.map((item, index) => {
                return (
                  <View key={index}>
                    <Tasks 
                      text={item.text}
                      completed={item.completed}
                      onToggle={() => toggleCompletion(index)}
                      onEdit={() => handleEditTask(index)} 
                      onDelete={() => completeTask(index)} 
                    />
                  </View>
                )
              })
            }
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" || "android" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput 
          style={styles.input} 
          placeholder={editIndex !== null ? 'Edit the task' : 'Write a task'} 
          value={task} 
          onChangeText={text => setTask(text)} 
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>{editIndex !== null ? '✓' : '+'}</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  taskContainer: {
    backgroundColor: '#550000',
    borderBottomColor: "white",
    borderWidth: 0.5,
    paddingTop: 80,
    paddingHorizontal: 20
  },
  taskHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: "white",
    alignContent: "center",
    marginBottom: 20,
    textAlign: "center",
  },
  taskName: {
    marginTop: 30,
    color: 'white'
  },
  searchInput: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 30,
    marginBottom: 20,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    color: 'black'
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
