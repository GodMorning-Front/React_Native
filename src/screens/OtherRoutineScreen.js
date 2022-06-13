import { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import TimePick from "../components/TimePick";
import todos from "../../assets/data/todos";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

function OtherRoutineScreen() {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  const navigation = useNavigation();
  const route = useRoute();
  const TodoId = route.params?.id;

  const Todo_list = todos[TodoId].todo_list;

  ///heart
  let countHeart = 0;
  let countScrap = 0;
  const [scraped, setScraped] = useState(false);
  const [hearted, setHearted] = useState(false);

  const addScrap = () => {
    setScraped(!scraped);
    countScrap++;
    console.log("scrap: ", scraped);
  };
  const addHeart = () => {
    setHearted(!hearted);
    countHeart++;
    console.log("heart: ", countHeart);
  };

  const [hoursRange, setHoursRange] = useState({
    1: { id: "1", text: todos[TodoId].timezone1 },
    2: { id: "2", text: todos[TodoId].timezone2 },
  });

  const goBack = () => {
    navigation.goBack();
  };

  return (
      <LinearGradient
        colors={[
          "rgba(184, 181, 255, 0.97) ",
          "rgba(210, 171, 217, 0.85) ",
          "rgba(248, 204, 187, 0.94) ",
          "rgba(255, 249, 179, 0.82) ",
        ]}
        style={{
          width: width,
          height: height,
          paddingTop: 70,
          alignItems: "center",
        }}
      >
        <View style={styles.topbar}>
          <FontAwesome onPress={() => goBack()} name="angle-left" size={40} />
          <Text style={styles.title}>{todos[TodoId].title}</Text>

          <TouchableOpacity onPress={addScrap}>
            {scraped ? (
              <FontAwesome name="bookmark" size={30} color="black" />
            ) : (
              <FontAwesome name="bookmark" size={30} color="white" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.userInfo}>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="user" size={30} />
            <Text style={styles.user}>게시자</Text>
          </View>

          <View style={styles.timePick}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              {Object.values(hoursRange).map((item) => (
                <TimePick key={item.id} item={item} />
              ))}
            </View>
            <TouchableOpacity onPress={addHeart}>
              {hearted ? (
                <FontAwesome
                  name="heart"
                  size={30}
                  color="rgb(255, 127, 127)"
                />
              ) : (
                <FontAwesome name="heart" size={30} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          {Object.values(Todo_list).map((id, index) => (
            <View style={styles.todocontainer} key={index}>
              <Text style={styles.content}>{id.content}</Text>
            </View>
          ))}
        </ScrollView>
      </LinearGradient>
  );
  {
    /*데이터 받아오는거
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     {Todo_list.map((id) => (
        <Text style={{ fontSize: 30 }}>{id['content']}</Text>
      ))}
      <Text>Details Screen</Text>
    </View>
  
  */
  }
}
const styles = StyleSheet.create({
  todo: {
    justifyContent: "center",
    alignItems: "center",
  },
  timePick: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 10,
    justifyContent: "space-between",
  },
  topbar: {
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 15,
  },
  user: {
    marginLeft: 13,
    fontSize: 25,
    fontWeight: "400",
    marginBottom: 15,
    fontFamily: "NanumSquareRoundR",
  },
  content: { fontSize: 17, fontFamily: "Cafe24Ohsquareair" },
  title: { fontSize: 35, fontFamily: "NanumSquareRoundB" },

  userInfo: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    width: "100%",
  },
  todocontainer: {
    margin: 5,
    height: 45,
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "rgba(210, 171, 217, 0.85) ",
    borderRadius: 20,
    flexDirection: "row",
    width: Dimensions.get("window").width - 50,
    marginLeft: 7,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
export default OtherRoutineScreen;
