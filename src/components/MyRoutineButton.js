import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const MyRoutineButton = ({ routine }) => {

  const navigation = useNavigation();
  const Title = routine.title;

  const toSeconds = (time) => {
    const parts = time.split(":");

    return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60;
  };

  const calculate = () => {
    const difference = Math.abs(
      toSeconds(routine.startTime) - toSeconds(routine.endTime)
    );
    const h = Math.floor(difference / 3600);
    const m = Math.floor((difference % 3600) / 60);

    if (isNaN(h) || isNaN(m)) {
      return `${routine.startTime}시 시작`;
    }

    if (h > 0) {
      if (m == 0) {
        return `${h}시간`;
      }

      return `${h}시간 \n ${m}분`;
    } else {
      return `${m}분`;
    }
  };

  const post_no = routine.post_no;

  const goTodoPage = () => {
    //  console.log(id)
    navigation.navigate("Mines", { post_no });
  };

  return (
    <Pressable style={styles.container} onPress={goTodoPage}>
      <LinearGradient
        // Button Linear Gradient
        colors={[
          "rgba(184, 181, 255, 0.97) ",
          "rgba(210, 171, 217, 0.85) ",
          "rgba(248, 204, 187, 0.94) ",
          "rgba(255, 249, 179, 0.82) ",
        ]}
        style={styles.button}
      >
        <View
          style={{
            height: 110,
            width: 140,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 16,
          }}
        >
          <Text style={styles.innertext}>{calculate()}</Text>
        </View>
      </LinearGradient>

      
      <View >
       
        <Text style={styles.routineName}>{Title}</Text>
    
        <Text style={styles.routineName}>🤍 100</Text>
        <Text style={styles.routineName}>💚 100</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},

  button: {
    justifyContent: "center",
    alignItems: "center",
    margin: 25,
    borderRadius: 20,
    width: 160,
    height: 130,
  },
  innertext: {
    fontSize: 30,
    color: "black",
    fontFamily: "Cafe24Ohsquareair",
  },
  routineName: {
    left: 35,
    fontSize: 16,
    fontWeight: "500",
    bottom: 15,
  },
});
export default MyRoutineButton;