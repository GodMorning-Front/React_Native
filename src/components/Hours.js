import {
    StyleSheet,
    Pressable,
    Text,
    View,
    Button,
    ScrollView,
    TouchableOpacity,
  } from "react-native";
  import { useNavigation } from "@react-navigation/native";
  import * as Font from "expo-font";
  import AppLoading from "expo-app-loading";
  import { useState } from "react";
  import { isWithinInterval } from "date-fns";
  
  const Hours = () => {
    const navigation = useNavigation();
    const [isReady, setIsReady] = useState(false);
  
    const time = ["4시", "5시", "6시", "7시", "8시", "9시", "10시"];
    const buttonStyle = [styles.button];
    const timeStyle = [styles.text];
  
    const onPress = () => {
      buttonStyle.push(styles.selectedButton);
      timeStyle.push(styles.selectedTime);
    };
  
    const getFonts = async () => {
      await Font.loadAsync({
        NanumSquareRoundB: require("../../assets/fonts/NanumSquareRoundB.ttf"),
      });
    };
  
    return isReady ? (
      <ScrollView contentContainerStyle={styles.container} horizontal={true}>
        <Pressable onPress={onPress} style={buttonStyle}>
          <Text style={timeStyle}>{time[0]}</Text>
        </Pressable>
  
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
          <Text style={timeStyle}>5시</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
          <Text style={timeStyle}>6시</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
          <Text style={timeStyle}>7시</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
          <Text style={timeStyle}>8시</Text>
        </TouchableOpacity>
      </ScrollView>
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
    container: {
      width: "100%",
      flexDirection: "row",
      marginTop: 20,
      paddingBottom: 2,
      height: 45,
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      width: 60,
      height: 35,
      //  backgroundColor: 'rgba(255, 249, 179, 0.82) 96.29%)',
      marginHorizontal: 10,
      borderRadius: 10,
    },
    selectedButton: {
      //   backgroundColor: 'rgba(255, 249, 179, 0.82) 96.29%)',
      backgroundColor: "#A4BDFF",
      borderRadius: 15,
    },
    selectedTime: {
      color: "white",
    },
    text: {
      fontSize: 20,
      color: "gray",
      fontFamily: "NanumSquareRoundB",
    },
  });
  
  export default Hours;
  