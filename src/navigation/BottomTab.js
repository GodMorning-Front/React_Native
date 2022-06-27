import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, Image } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import MyRoutineScreen from "../screens/MyRoutineScreen";
import MyPageScreen from "../screens/MyPageScreen";
import ScrapScreen from "../screens/ScrapScreen";
import { FontAwesome } from "@expo/vector-icons";
import MineScreen from "../screens/MineScreen";
import HomeTabNav from "./HomeTab";
import OtherRoutineScreen from "../screens/OtherRoutineScreen";
import MineRoutineScreen from "../screens/MineRoutineScreen";
import {useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
const MyPageStack = createNativeStackNavigator();

const MyPageStackNav = () => {
  return (
    <MyPageStack.Navigator screenOptions={{ headerShown: false }}>
      <MyPageStack.Screen name="MyPage" component={MyPageScreen} />
      <MyPageStack.Screen name="Scrap" component={ScrapScreen} />
      <MyPageStack.Screen name="Mine" component={MineScreen} />
      <MyPageStack.Screen name="Mines" component={MineRoutineScreen} />
    </MyPageStack.Navigator>
  );
};

//////홈스크린 탭
const MyHomeStack = createNativeStackNavigator();

const MyHomeStackNav = () => {

  return (
    <MyHomeStack.Navigator
    screenOptions={{
      //tabBarActiveTintColor: "white",
      tabBarIndicatorStyle: {
        backgroundColor: "white",
      },
      tabBarStyle: { 
      backgroundColor:'white'},
      
    }}
    >
      <MyHomeStack.Screen
        name="HomeTab"
        component={HomeTabNav}
        options={{
          headerTitle: () => (
            <View style={styles.container}>
              <Image
                style={{ height: 25, width: 25 }}
                source={require("../../assets/images/logo.png")}
              />
              <Text style={styles.title}>GOD[T] Morning</Text>
            </View>
          ),
          title: "GOD[T] Morning",
        }}
      />
      <MyHomeStack.Screen
        name="Others"
        component={OtherRoutineScreen}
        options={{ headerShown: false }}
      />
    </MyHomeStack.Navigator>
  );
};

/////////Bottom 탭
const BottomTab = createBottomTabNavigator();

const BottomTabNav = () => {

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "rgb(178, 171, 171)",
      }
    }
  
    >
      <BottomTab.Screen
        name="Home"
        component={MyHomeStackNav}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={30} color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="MyRoutine"
        component={MyRoutineScreen}
        options={{
          title: "MyRoutine",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="plus" size={30} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="MyPageScreen"
        component={MyPageStackNav}
        options={{
          title: "MyPage",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={30} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  title: {
    left: 10,
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "NanumSquareRoundB",
  },
});

export { MyHomeStackNav, BottomTabNav, MyPageStackNav };
