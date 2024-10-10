import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Tasks = (props) => {

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity onPress={props.onToggle}>
          <View style={[styles.square, props.completed && styles.checked]}></View>
        </TouchableOpacity>
        <Text style={[styles.itemText, props.completed && styles.itemTextCompleted]}>
          {props.text}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={props.onEdit} style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={props.onDelete} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#550000',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  checked: {
    backgroundColor: '#00ff00',
    opacity: 1,
  },
  itemText: {
    maxWidth: '80%',
    color: 'white'
  },
  itemTextCompleted: {
    textDecorationLine: 'line-through', //studyhan
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#FFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#FF5555',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  }
});

export default Tasks;
