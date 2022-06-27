import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import todos from "./assets/data/todos";
import RoutineButton from "../components/RoutineButton";
//top tab네비게이터
function HomeScreen({ navigation }) {
  useEffect(() => {  
    
    setTimeTodos(
      todos.filter(
        (routine) =>
          routine.startTime.charAt(0) == timeId ||
          routine.startTime.substring(0, 2) == timeId
      )
    )
    
  }, [timeId,]);

 

  const timeTable = [
    { id: 4, title: "4시", isSelect: true },
    { id: 5, title: "5시", isSelect: false },
    { id: 6, title: "6시", isSelect: false },
    { id: 7, title: "7시", isSelect: false },
    { id: 8, title: "8시", isSelect: false },
    { id: 9, title: "9시", isSelect: false },
    { id: 10, title: "10시", isSelect: false },
    { id: 11, title: "11시", isSelect: false },
    { id: 12, title: "12시", isSelect: false },
  ];

  const [times, setTimes] = useState(timeTable);

  const [timeId, setTimeId] = useState(4);

  const [timeTodos, setTimeTodos] = useState(null);


  const ontimePress = (index) => {
   
    setTimeId(index);

    const newTable = times.map((time) => {
      if (time.id == index) {
        return { ...time, isSelect: true };
      } else {
        return { ...time, isSelect: false };
      }
    });
    setTimes(newTable);
  };

  return (
    <View style={styles.container}>
    <View style={styles.t_container}>
      <ScrollView style={{ flex: 1, paddingLeft: 10 }} horizontal={true}>
        {times.map((time, index) =>
          time.isSelect ? (
            <View key={index}>
              <TouchableOpacity
                onPress={() => ontimePress(time.id)}
                style={styles.selectedButton}
              >
                <Text style={styles.selectedTime}>{time.title}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View key={index}>
              <TouchableOpacity
                onPress={() => ontimePress(time.id)}
                style={styles.button}
              >
                <Text style={styles.time}>{time.title}</Text>
              </TouchableOpacity>
            </View>
          )
        )}
      </ScrollView>
    </View>

  


    <View style={styles.r_container}>
        <ScrollView contentContainerStyle={styles.routine}>
          <View style={styles.column1}>
            {timeTodos
              .filter((routine, index) => index % 2 == 0)
              .map((routine) => (
                <RoutineButton routine={routine} key={routine.id} />
              ))}
          </View>
          <View style={styles.column2}>
            {timeTodos
              .filter((routine, index) => index % 2 == 1)
              .map((routine) => (
                <RoutineButton routine={routine} key={routine.id} />
              ))}
          </View>
        </ScrollView>
      </View>
  </View>
  )
}

function PopularScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>인기 </Text>
    </View>
  )
}
function NewScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>New!</Text>
    </View>
  )
}






//마이페이지 스택 구현

function MyPage({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>MyPage!</Text>
      <Button
        title="go to my page setting "
        onPress={() => navigation.navigate('MyPageSetting')}
      ></Button>
    </View>
  )
}
function MyPageSetting({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>MyPageSetting!</Text>
    </View>
  )
}

const MyPageStack = createNativeStackNavigator()

function MyPageStackScreen() {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen name="MyPage" component={MyPage} />
      <MyPageStack.Screen name="MyPageSetting" component={MyPageSetting} />
    </MyPageStack.Navigator>
  )
}

//마이루틴
function MyRoutine() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>MyRoutine!</Text>
    </View>
  )
}

const topClock = createMaterialTopTabNavigator()

function TopClockNavigator() {
  return (
    <topClock.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          width: 100,
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'rgb(255, 173, 173)',
          height: 3,
        },
      }}
      sceneContainerStyle={{ backgroundColor: 'white' }}
    >
    
    </topClock.Navigator>
  )
}
const Tab = createMaterialTopTabNavigator()

function TopNavigator() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: 'white' }}
      screenOptions={{
        tabBarItemStyle: {
          width: 100,
        },
        tabBarStyle: { marginBottom: 10 },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'black',
        tabBarActiveBackgroundColor: 'black',
        tabBarStyle: {
          marginBottom: 10,
          backgroundColor: 'white',
        },
        tabBarIndicatorStyle: {
          backgroundColor: null,
        },
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: '600',
          letterSpacing: 0,
          lineHeight: 15,
          textAlign: 'center',
        },
      }}
    >
      <Tab.Screen
        name="홈"
        options={{
          tabBarActiveBackgroundColor: 'green',
        }}
        component={HomeScreen}
      />
      <Tab.Screen name="인기" component={PopularScreen} />
      <Tab.Screen name="신규" component={NewScreen} />
    </Tab.Navigator>
  )
}

//Bottom네비게이터
const BottomTab = createBottomTabNavigator()

export default function App() {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: '100%',
          height: 100,
          justifyContent: 'flex-end',
          borderBottomColor: 'rgb(204, 193, 193)',
          borderBottomWidth: 1,
          fontWeight: '700',
          bottom: 10,
          paddingBottom: 10,
        }}
      >
        <Text
          style={{
            left: 10,
            fontSize: 20,
          }}
        >
          GOD[T]Morning
        </Text>
      </View>
      <NavigationContainer>
        <BottomTab.Navigator screenOptions={{ headerShown: false }}>
          {/**  screenOptions={{ headerShown: false }}>*/}
          <BottomTab.Screen name="GOD[T] Morning" component={TopNavigator} />
          <BottomTab.Screen name="MyRoutine" component={MyRoutine} />
          <BottomTab.Screen
            name="MyPageStackScreen"
            component={MyPageStackScreen}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    </View>
  )
}


const styles = StyleSheet.create({
  wise : {
    backgroundColor: '#FCE1F4',
    justifyContent:'center',
    alignItems:'center',
    width:'70%',
//borderRadius:30,
    blurRadius:1,

blurRadius:10,
  height:40,
  

  },
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
,    paddingVertical: 5,
    backgroundColor: "white",
  },
  routine: {
    flexDirection: "row",
    justifyContent: "center",
  },
  r_container: {
    flex: 1,
    height: "100%",
  },

  column1: {
    //position: "absolute",
    left: 15,
    width: "50%",
    //backgroundColor: "red",
  },
  column2: {
    //position: "absolute",
    right: 15,
    width: "50%",
    //backgroundColor: "blue",
  },
  t_container: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 35,
    borderRadius: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  selectedButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 35,
    marginHorizontal: 10,
    backgroundColor: "#A4BDFF",
    borderRadius: 15,
  },
  selectedTime: {
    fontSize: 20,
    fontFamily: "NanumSquareRoundB",
    color: "white",
  },
  time: {
    fontSize: 20,
    color: "gray",
    fontFamily: "NanumSquareRoundB",
  },
});

