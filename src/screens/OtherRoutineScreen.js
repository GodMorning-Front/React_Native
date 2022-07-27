import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

const OtherRoutineScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [fettodo, setFetchTodo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  const [heart, addHeart] = useState(0);
  const [scrap, addScrap] = useState(0);

  const [scraped, setScraped] = useState(false);
  const [hearted, setHearted] = useState(false);

  const post_no = route.params.post_no;
  const heartCount = route.params.heartCount;
  const scrapCount = route.params.scrapCount;

  useEffect(() => {
    const fetching = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setFetchTodo(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
          `http://3.38.14.254/newRoutine/list/${route.params?.post_no}`
        );
        setFetchTodo(response.data); // 데이터는 response.data 안에 들어있습니다
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetching();
  }, []);

  const letScrap = () => {
    setScraped(!scraped);
    if (scraped) {
      addScrap(scrap++);
      console.log("scrap: ", scrap);
    }
  };

  const letHeart = () => {
    setHearted(!hearted);
    if (hearted) {
      addHeart(heart++);
      console.log("heart: ", heart);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const onDelete = () => {
    Alert.alert("삭제됨");
    axios
      .delete(`http://3.38.14.254/routine/delete?post_no=${post_no}`)
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
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
      {fettodo !== null ? (
        <>
          <View style={styles.topbar}>
            <FontAwesome onPress={() => goBack()} name="angle-left" size={40} />
            <Text style={styles.title}>{fettodo["title"]}</Text>

            <TouchableOpacity onPress={letScrap}>
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
              <Button
                onPress={onDelete}
                style={{ width: 30, height: 15 }}
                title=" 삭제 "
              ></Button>
            </View>

            <View style={styles.timePick}>
              <View
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
                <Text style={{ fontSize: 20, color: "white" }}>
                  {fettodo["startTime"]}
                </Text>
                <Text style={{ fontSize: 20, color: "white" }}> ~ </Text>
                <Text style={{ fontSize: 20, color: "white" }}>
                  {fettodo["endTime"]}
                </Text>
              </View>
              <TouchableOpacity onPress={letHeart}>
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
            {Object.values(fettodo["todo_list"]).map((id, index) => (
              <View style={styles.todocontainer} key={index}>
                <Text style={styles.content}>{id.content}</Text>
              </View>
            ))}
          </ScrollView>
        </>
      ) : (
        <Text>로딩중</Text>
      )}
    </LinearGradient>
  );
};
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
