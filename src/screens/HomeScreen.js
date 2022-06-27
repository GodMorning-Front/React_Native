import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import todos from "../../assets/data/todos";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import RoutineButton from "../components/RoutineButton";
import closestIndexTo from "date-fns/fp/closestIndexTo/index";
import axios from 'axios';
import Spinner from "../../assets/spinner.gif";

function HomeScreen() {
  const navigation = useNavigation();
  const [fettodo,setFetchTodo] = useState(null);
  const [timeId, setTimeId] = useState(4);

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [flag,setFlag] = useState(false)
  const isFocused = useIsFocused();
  const wisesaying = ['게으르지 않음은 영원한 삶의 집이요, 게으름의 죽음은 집이다','명언2','명언3','명언4','명언5']

  const getRandomIndex= function(length){
    return parseInt(Math.random()*length)
  }

 
  useEffect(() => {
    const fetching = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null)
        setFetchTodo(null)
        // loading 상태를 true 로 바꿉니다.
        setLoading(true)
        const response = await axios.get(
          'http://3.38.14.254/newRoutine/list',
        )
        setFetchTodo(response.data)// 데이터는 response.data 안에 들어있습니다.
       //console.log(response.data)
      } catch (e) {
        setError(e)
      }
      setLoading(false)
      setFlag(!flag)
    }
    fetching()
  }, [isFocused])

  useEffect(() => {  
    fettodo !==null ? (
    
    setTimeTodos(
      fettodo.filter(
        (routine) =>
          routine.startTime.charAt(0) == timeId ||
          routine.startTime.substring(0, 2) == timeId
      )
    )
    ):console.log('아직')
  }, [timeId,flag,]);

 

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

     <View  style={{justifyContent:'center',alignItems:'center',marginTop:20,marginBottom:20,}}>
      <Image
        source={require("../../assets/images/wisesaying.png")}
      style={{position:'absolute',width:'95%'}}
      />
   
        <Text style={{fontWeight:'550',fontSize:15}}>{wisesaying[getRandomIndex(wisesaying.length)]}</Text>
        </View>
  

      <View style={styles.r_container}>
      
        <ScrollView contentContainerStyle={styles.routine}>
        {fettodo !==null && timeTodos !==null ? (
          <>
          <View style={styles.column1}>
            {timeTodos
              .filter((routine, index) => index % 2 == 0)
              .map((routine) => (
                <>
                <RoutineButton routine={routine} key={routine.post_no} />
                </>
              ))}
          </View>
          <View style={styles.column2}>
            {timeTodos
              .filter((routine, index) => index % 2 == 1)
              .map((routine) => (
                <RoutineButton routine={routine} key={routine.post_no}/>
              ))}
              </View>
             </> 
        ) :
        <View
        style={{
          top: 200,
        }}
      >
        <Image source={Spinner} style={{ width: 100, height: 100 }} />
      </View>
              }
        </ScrollView>
      </View>
    </View>
  );
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
export default HomeScreen;
