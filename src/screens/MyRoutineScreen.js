import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import React from "react";
import { isSameDay, addDays, format, getDate, startOfWeek } from "date-fns";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Alert,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../components/Input";
import Title from "../components/Title";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Task from "../components/Task";
import TimePick from "../components/TimePick";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const STORAGE_KEY = "@toDos";
const MyRoutineScreen = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState({});
  const [todos, setTodos] = useState({});
  const [title, setTitle] = useState("");

  {
    /*Date*/
  }
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  function printDate(date) {
    const today = selectedDate;

    var dayOfWeek = [
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
        "일요일",
      ],
      monthName = [
        "1/",
        "2/",
        "3/",
        "4/",
        "5/",
        "6/",
        "7/",
        "8/",
        "9/",
        "10/",
        "11/",
        "12/",
      ],
      utc = today.getTime() + today.getTimezoneOffset() * 60000,
      US_time = utc + 3600000 * -4,
      US_date = new Date(US_time);

    return (
      "✨ "+
      monthName[US_date.getMonth()] +
      " " +
      US_date.getDate() +
      " " +
      dayOfWeek[US_date.getDay() - 1] +
      " ✨"
    );
  }

  const [hoursRange, setHoursRange] = useState({
    1: { id: "1", text: "Start" },
    2: { id: "2", text: "End" },
  });

  //AsyncStorage.clear()
  const _deleteTask = async (id) => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    setTasks(currentTasks);
    //console.log('tasks', tasks)
    if (
      typeof todos[today] != "undefined" &&
      Object.keys(todos[today]["todo_list"]).length != 0
    ) {
      const currentTodos = Object.assign({}, todos);
      //console.log('delete todos ', currentTodos[today]['todo_list'][id])
      delete currentTodos[today]["todo_list"][id];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(currentTodos));
      // console.log('todos', todos[today]['todo_list'])
    }
  };

  const _updateTask = async (item) => {
    if (
      typeof todos[today] != "undefined" &&
      typeof todos[today]["todo_list"][item.id] !== "undefined"
    ) {
      const currentTodos = Object.assign({}, todos);
      currentTodos[today]["todo_list"][item.id] = item;
      setTodos[currentTodos];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(currentTodos));

      const currentTasks = Object.assign({}, tasks);
      currentTasks[item.id] = item;
      setTasks(currentTasks);
      setChange(!change);
    } else {
      const currentTasks = Object.assign({}, tasks);
      currentTasks[item.id] = item;
      setTasks(currentTasks);
    }
  };
  const [change, setChange] = useState(true);
  const _toggleTask = async (id) => {
    if (
      typeof todos[today] != "undefined" &&
      typeof todos[today]["todo_list"][id] !== "undefined"
    ) {
      const currentTodos = Object.assign({}, todos);
      currentTodos[today]["todo_list"][id]["completed"] =
        !currentTodos[today]["todo_list"][id]["completed"];
      setTodos[currentTodos];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(currentTodos));

      setChange(!change);
    } else {
      const currentTasks = Object.assign({}, tasks);
      currentTasks[id]["completed"] = !currentTasks[id]["completed"];
      setTasks(currentTasks);
    }
  };
  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };
    setNewTask("");
    setTasks({ ...tasks, ...newTaskObject });
  };

  const _handleTextChange = (text) => {
    setNewTask(text);
  };
  /*week */
  const [week, setWeek] = useState([]);
  useEffect(() => {
    const weekDays = getWeekDays(selectedDate);
    setWeek(weekDays);
    //+ 이거 하면 다른날짜 렌더링할때 todo 안보임
    setTasks({});
    if (typeof todos[today] != "undefined") {
      setTitle(todos[today]["title"]);
      loadToDos();
    } else {
      setTitle("");
    }
    loadToDos();
  }, [selectedDate, change]);

  const getWeekDays = (date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    const weekOfLength = 7;
    const final = [];
    for (let i = 0; i < weekOfLength; i++) {
      const date = addDays(start, i);
      final.push({
        formatted: format(date, "EEE"),
        date,
        day: getDate(date),
      });
    }
    return final;
  };
  const onChange = (date) => {
    setSelectedDate(date);
  };

  const onPost = () => {
    var step = 0;
    //todo 개수 구하기
    const todocount = Object.values(todos[today]["todo_list"]).length;
    Alert.alert("post");

    //text만 꺼내기
    var Posttodo = [];
    for (step; step < todocount; step++) {
      Posttodo.push({
        content: Object.values(todos[today]["todo_list"])[step]["text"],
      });
    }

    const newPost = Object.assign({}, todos[today]);

    newPost["todo_list"] = Posttodo; //todos[today]["todo_list"]
    newPost["id"] = 1;
    console.log(todos[today]["title"]);

    axios({
      method: "POST",
      url: "http://3.38.14.254/routine/create",
      data: newPost,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  };

  /*날짜 변환 */
  const month = selectedDate.toLocaleDateString("ko-KR", {
    month: "2-digit",
  });
  const day = selectedDate.toLocaleDateString("en-US", {
    day: "2-digit",
  });
  const today = `${month}.${day}`;
  //console.log(today);

  const onSave = async () => {
    Alert.alert("Save");

    const saveTodoObject = {
      [today]: {
        id: today,
        title: title,
        create_date: selectedDate,
        startTime: hoursRange[1]["text"],
        endTime: hoursRange[2]["text"],
        todo_list: tasks,
      },
    };

    if (
      typeof todos[today] != "undefined" &&
      Object.keys(todos[today]["todo_list"]).length != 0 &&
      tasks.length !== 0
    ) {
      const addTasks = { ...todos[today]["todo_list"], ...tasks };
      const addTodos = Object.assign({}, todos[today]["todo_list"], addTasks);
      const newTodos = todos;
      newTodos[today]["todo_list"] = addTodos;
      newTodos[today]["title"] = title;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
    } else {
      const newToDos = Object.assign({}, todos, saveTodoObject);
      setTodos(newToDos);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newToDos));
      // console.log('안에서 맨처음 암것도 없을때 저장 ', newToDos)
    }
    setTasks({});

    const renewhours = Object.assign({}, hoursRange);

    renewhours[1]["text"] = "Start";
    renewhours[2]["text"] = "End";

    setHoursRange(renewhours);
    //console.log('todos', todos[today]['todo_list'])
  };

  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    //console.log('load todo ', JSON.parse(s))
    s !== null ? setTodos(JSON.parse(s)) : null;
  };

  //데이터 전체 지우기
  //AsyncStorage.clear()
  return (
    <LinearGradient
      colors={[
        "rgba(184, 181, 255, 0.97) ",
        "rgba(210, 171, 217, 0.85) ",
        "rgba(248, 204, 187, 0.94) ",
        "rgba(255, 249, 179, 0.82) ",
      ]}
      style={{
        paddingTop: 120,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar style="auto" />
      <View style={styles.datepicker}>
        <Text
          onPress={showDatePicker}
          style={{
            fontSize: 25,
            fontWeight: "600",
            fontFamily: "NanumSquareRoundB",
          }}
        >
          {selectedDate ? printDate() : "No date selected"}
        </Text>

        <DateTimePickerModal
          date={selectedDate}
          isVisible={datePickerVisible}
          mode="date"
          display="inline"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <View style={styles.weekpicker}>
        <View style={styles.weekcontainer}>
          {week.map((weekDay) => {
            const textStyles = [styles.dayText];
            const touchableStyles = [styles.touchableDay];
            const sameDay = isSameDay(weekDay.date, selectedDate);

            if (sameDay) {
              textStyles.push(styles.selectedDayText);
              touchableStyles.push(styles.selectedTouchableDay);
            }
            return (
              <View style={styles.weekDayItems} key={weekDay.formatted}>
                <Text style={styles.weekDayText}>{weekDay.formatted}</Text>

                <TouchableOpacity
                  onPress={() => onChange(weekDay.date)}
                  style={touchableStyles}
                >
                  <Text style={textStyles}>{weekDay.day}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.todo}>
        <Title value={title} onChangeText={setTitle}></Title>
        <View style={styles.post_save_container}>
          <Pressable style={styles.btn} onPress={onSave}>
            <Text style={{ color: "#545454", fontWeight: "500" }}>Save</Text>
          </Pressable>
          <Pressable style={styles.btn2} onPress={onPost}>
            <Text style={{ color: "#545454", fontWeight: "500" }}>Post</Text>
          </Pressable>
        </View>
        <View style={[styles.timePick]}>
          {typeof todos[today] == "undefined" ? (
            Object.values(hoursRange).map((item) => (
              <TimePick
                key={item.id}
                item={item}
                text={item.text}
                id={item.id}
                setHoursRange={setHoursRange}
                hoursRange={hoursRange}
              />
            ))
          ) : (
            <>
              <TimePick
                key={1}
                id={1}
                text={todos[today]["startTime"]}
                item={todos[today]["startTime"]}
                setHoursRange={setHoursRange}
                hoursRange={hoursRange}
              />
              <TimePick
                key={2}
                id={2}
                text={todos[today]["endTime"]}
                item={todos[today]["endTime"]}
                setHoursRange={setHoursRange}
                hoursRange={hoursRange}
              />
            </>
          )}
        </View>

        <Input
          value={newTask}
          onChangeText={_handleTextChange}
          onSubmitEditing={_addTask}
        />

        <ScrollView>
          {typeof todos[today] == "undefined" ? (
            Object.values(tasks).map((item) => (
              <Task
                key={item.id}
                item={item}
                deleteTask={_deleteTask}
                toggleTask={_toggleTask}
                updateTask={_updateTask}
              />
            ))
          ) : (
            <>
              {Object.values(todos[today]["todo_list"]).map((item) => (
                <Task
                  key={item.id}
                  item={item}
                  deleteTask={_deleteTask}
                  toggleTask={_toggleTask}
                  updateTask={_updateTask}
                />
              ))}
              {Object.values(tasks).map((item) => (
                <Task
                  key={item.id}
                  item={item}
                  deleteTask={_deleteTask}
                  toggleTask={_toggleTask}
                  updateTask={_updateTask}
                />
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  datepicker: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  weekpicker: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    width: "100%",
  },
  week: {
    alignItems: "center",
  },
  todo: {
    justifyContent: "center",
    alignItems: "center",
  },
  timePick: {
    width: Dimensions.get("window").width - 10,
    alignItems: "flex-start",
    left: 10,

    flexDirection: "row",
    //alignItems: 'center',
    //  justifyContent: 'center',
    //paddingHorizontal: 17,
    //marginRight: Dimensions.get('window').width - 220,
    marginBottom: 10,
  },
  weekcontainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",

    // width: '100%',
    width: Dimensions.get("window").width - 10,
  },
  week: {
    alignItems: "center",
  },
  weekDayItems: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  weekDayText: {
    fontSize: 17,
    marginBottom: 5,
    fontWeight: "500",
    fontFamily: "Cafe24Ohsquareair",
  },
  dayText: { fontSize: 16, fontFamily: "Cafe24Ohsquareair" },
  selectedDayText: {
    color: "white",
    fontFamily: "Cafe24Ohsquareair",
    fontWeight: "bold",
  },
  selectedTouchableDay: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    fontFamily: "Cafe24Ohsquareair",
    borderRadius: 30,
  },
  post_save_container: {
    //position: "absoulte",
    marginTop:-5,
    paddingVertical: 5,
    width: "100%",
    marginLeft: 230,
    flexDirection: "row",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    //paddingVertical: 12,
    //paddingHorizontal: 32,
    width: 70,
    height: 30,
    borderRadius: 5,
    //elevation: 3,
    backgroundColor: "#EEEEEE",
  },
  btn2: {
    alignItems: "center",
    justifyContent: "center",
    //paddingVertical: 12,
    //paddingHorizontal: 32,
    width: 70,
    height: 30,
    borderRadius: 5,
    //elevation: 3,
    backgroundColor: "#EEEEEE",
    marginLeft: 10,
  },
});

export default MyRoutineScreen;
