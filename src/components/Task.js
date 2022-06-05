import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import IconButton from "./IconButton";
import { images } from "../../images";
import Input from "./Input";

IconButton.defaultProps = {
  onPressOut: () => {},
};
const Task = ({ item, deleteTask, toggleTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);
  const _handleUpdateButtonPress = () => {
    setIsEditing(true);
  };
  const _onSubmitEditing = () => {
    if (isEditing) {
      const editedTask = Object.assign({}, item, { text });
      setIsEditing(false);
      updateTask(editedTask);
    }
  };

  return isEditing ? (
    <Input
      value={text}
      onChangeText={(text) => setText(text)}
      onSubmitEditing={_onSubmitEditing}
    />
  ) : (
    <View style={styles.container}>
      <IconButton
        type={item.completed ? images.completed : images.uncompleted}
        id={item.id}
        onPressOut={toggleTask}
      />
      <Text style={item.completed ? styles.completed : styles.text}>
        {item.text}
      </Text>
      {item.completed || (
        <IconButton type={images.edit} onPressOut={_handleUpdateButtonPress} />
      )}
      <IconButton type={images.delete} id={item.id} onPressOut={deleteTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "rgba(210, 171, 217, 0.85) ",
    borderRadius: 20,
    flexDirection: "row",
    width: Dimensions.get("window").width - 40,
    marginLeft: 7,
    alignItems: "center",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 17,
    flex: 1,
    color: "black",
    fontFamily: "Cafe24Ohsquareair",
  },
  completed: {
    fontSize: 20,
    flex: 1,
    color: "gray",
    textDecorationLine: "line-through",
  },
});

export default Task;
