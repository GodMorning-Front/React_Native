import { StyleSheet, Text, Pressable, Image, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LoginScreen = ({ navigation }) => {
  const inset = useSafeAreaInsets();


  const login = () => {
    navigation.navigate("BottomTab");
  };

  return (
    <LinearGradient
      colors={[
        "#9DC0FF",
        "rgba(184, 181, 255, 0.97) ",
        "rgba(210, 171, 217, 0.85) ",
        "rgba(248, 204, 187, 0.94) ",
        "rgba(255, 249, 179, 0.82) ",
      ]}
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          position: "absolute",
          width: 550,
          height: 550,
        }}
        source={require("../../assets/images/title.png")}
      />
      <Pressable
        onPress={login}
        style={{
          top: 130,
          height: 50,
          width: 250,
          borderRadius: 10,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "gray",
            fontSize: 20,
            fontFamily: "NanumSquareRoundB",
          }}
        >
          Google
        </Text>
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  appLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 130,
    height: 100,
    borderRadius: 30,
  },
  container: {},
});

export default LoginScreen;
