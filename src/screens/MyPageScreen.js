import React, { useState } from "react";
import { Image, Text, StyleSheet, View, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MyPageScreen = ({ navigation }) => {
  const inset = useSafeAreaInsets();

  const onMinePressed = () => {
    navigation.navigate("Mine");
  };
  const onScrapPressed = () => {
    navigation.navigate("Scrap");
  };

  const [isReady, setIsReady] = useState(false);

  const getFonts = async () => {
    await Font.loadAsync({
      NanumSquareRoundB: require("../../assets/fonts/NanumSquareRoundB.ttf"),
    });
  };

  return isReady ? (
    <View
      style={{ flex: 1, paddingTop: inset.top, paddingBottom: inset.bottom }}
    >
      <Image
        style={styles.logo}
        source={require("../../assets/images/logo.png")}
      />
      <View style={styles.first}>
        <Text style={styles.title}>마이페이지</Text>
      </View>
      <View
        style={{
          borderBottomColor: "#C4C4C4",
          borderBottomWidth: 1,
          marginBottom: 5,
        }}
      />
      <View style={styles.profile}>
        <FontAwesome name="user" size={50} />
        <Text style={styles.name}>OOO 님</Text>
      </View>

      <View style={styles.second}>
        <Text style={styles.menu}>나의 루틴</Text>
        <Pressable onPress={onMinePressed}>
          <Icon name="chevron-right" size={23} style={styles.icon} />
        </Pressable>
      </View>

      <View style={styles.second}>
        <Text style={styles.menu}>스크랩한 모닝 루틴</Text>
        <Pressable onPress={onScrapPressed}>
          <FontAwesome name="chevron-right" size={23} style={styles.icon} />
        </Pressable>
      </View>
      <View
        style={{
          borderBottomColor: "#C4C4C4",
          borderBottomWidth: 1,
          marginTop: 10,
          marginBottom: 10,
        }}
      />

      {/*<Text style={{ fontSize: 20, left: 30, top: 20 }}>기타</Text>*/}

      <Text
        style={{
          fontSize: 20,
          left: 30,
          top: 20,
          fontFamily: "NanumSquareRoundB",
          marginBottom: 30,
        }}
      >
        기타
      </Text>
      <View style={styles.second}>
        <Text style={styles.menu}>로그아웃</Text>
        <Pressable>
          <FontAwesome name="chevron-right" size={23} style={styles.icon} />
        </Pressable>
      </View>
      <View style={styles.second}>
        <Text style={styles.menu}>회원탈퇴</Text>
        <Pressable>
          <FontAwesome name="chevron-right" size={23} style={styles.icon} />
        </Pressable>
      </View>
    </View>
  ) : (
    // 앱 구성 컴포넌트
    <AppLoading
      startAsync={getFonts}
      onFinish={() => setIsReady(true)}
      onError={() => {}}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    //width: 280,
    height: 290,
    left: 60,
    top: 270,
    opacity: 0.5,
  },
  title: {
    color: "black",
    fontSize: 25,
    fontFamily: "NanumSquareRoundB",
    left: 20,
  },
  profile: {
    flexDirection: "row",
    //alignItems: "center",
    margin: 30,
  },
  menu: {
    fontFamily: "NanumSquareRoundB",
    fontSize: 20,
  },
  name: {
    color: "black",
    fontSize: 25,
    fontFamily: "NanumSquareRoundB",
    marginLeft: 20,
    top: 10,
  },
  first: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
  },
  second: {
    flexDirection: "row",
    padding: 20,

    alignItems: "center",
    justifyContent: "space-between",
  },

  icon: {
    //right: 15,
    color: "#757575",
    padding: 20,
  },
});

export default MyPageScreen;
