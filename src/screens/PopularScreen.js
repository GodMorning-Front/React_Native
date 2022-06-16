import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  ScrollView,
} from "react-native";

import todos from "../../assets/data/todos";
import { useNavigation } from "@react-navigation/native";
import RoutineButton from "../components/RoutineButton";

function PopularScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.routine}>
        <View style={styles.column1}>
          {todos
            .filter(
              (routine, index) =>
                (routine.startTime.charAt(0) == 6 ||
                  routine.endTime.substring(0, 2) == 6) &&
                index % 2 == 0
            )
            .map((routine) => (
              <RoutineButton routine={routine} key={routine.id} />
            ))}
        </View>
        <View style={styles.column2}>
          {todos
            .filter(
              (routine, index) =>
                (routine.startTime.charAt(0) == 6 ||
                  routine.endTime.substring(0, 2) == 6) &&
                index % 2 == 1
            )
            .map((routine) => (
              <RoutineButton routine={routine} key={routine.id} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  todo: {
    borderWidth: 1,
  },
  container: {
    paddingTop: 10,
    flex: 1,
    height: "100%",
    backgroundColor: "white",
  },
  routine: {
    top: -10,
    flexDirection: "row",
    justifyContent: "center",
  },

  column1: { left: 15 },
  column2: { right: 15 },
});

export default PopularScreen;
