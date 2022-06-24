import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import todos from "../../assets/data/todos";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import RoutineButton from "../components/RoutineButton";
import axios from 'axios';



  

const NewScreen = () => {
  const navigation = useNavigation();
  const [fettodo,setFetchTodo] = useState(null);
  

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [flag, setFlag] = useState(flag)
  const isFocused = useIsFocused();
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
        
      } catch (e) {
        setError(e)
      }
      setLoading(false)
      setFlag(!flag)
    }
    fetching()
  }, [isFocused])

  

  return (
    <View style={styles.container}>
    { fettodo !== null ? 
    (  
      <ScrollView contentContainerStyle={styles.routine}>
      <View style={styles.column1}>
            {fettodo
              .filter((routine, index) => index % 2 == 0)
              .map((routine) => (
                <>
                <RoutineButton routine={routine} key={routine.post_no} />
                
                </>
              ))}
          </View>
          <View style={styles.column2}>
            {fettodo
              .filter((routine, index) => index % 2 == 1)
              .map((routine) => (
                <RoutineButton routine={routine} key={routine.post_no} />
              ))}
              </View>
      </ScrollView>
   
    )
     : 
     <Text> 로딩중</Text>
  
  
  }
   </View>

  );
};
const styles = StyleSheet.create({
  todo: {
    borderWidth: 1,
  },
  container: {
    paddingTop: 10,
    flex: 1,
    height: "100%",
    backgroundColor: "white",
  },
  routine: {
    flexDirection: "row",
    justifyContent: "center",
  },

  column1: { left: 15 },
  column2: { right: 15 },
});

export default NewScreen;
