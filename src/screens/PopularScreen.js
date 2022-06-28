import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Pressable,
  ScrollView,
} from "react-native";

import todos from "../../assets/data/todos";
import { useNavigation } from "@react-navigation/native";
import RoutineButton from "../components/RoutineButton";
import Spinner from "../../assets/spinner.gif";

function PopularScreen() {
  const navigation = useNavigation();
  const wisesaying = [
    "게으르지 않음은 영원한 삶의 집이요, 게으름의 죽음은 집이다",
    "명언2",
    "명언3",
    "명언4",
    "명언5",
  ];

  const getRandomIndex = function (length) {
    return parseInt(Math.random() * length);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <Image
          source={require("../../assets/images/wisesaying.png")}
          style={{ position: "absolute", width: "95%" }}
        />

        <Text style={{ fontWeight: "550", fontSize: 15 }}>
          {wisesaying[getRandomIndex(wisesaying.length)]}
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.routine}>
        <View style={styles.column1}>
          {todos
            .filter(
              (routine, index) =>
                (routine.startTime.charAt(0) == 6 ||
                  routine.startTime.substring(0, 2) == 6) &&
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
                  routine.startTime.substring(0, 2) == 6) &&
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
    //height: "100%",
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
