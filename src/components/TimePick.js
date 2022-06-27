import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const TimePick = ({ item, text, id, setHoursRange, hoursRange }) => {
  const [selectedDate, setSelectedDate] = useState()


  const [datePickerVisible, setDatePickerVisible] = useState(false)
 
  const handleConfirm = (hour) => {
    setSelectedDate(hour)
    hideDatePicker()
    const today = hour.toLocaleTimeString('en-US', {
      timeStyle: 'short',
    })
    const currentTime = Object.assign({}, hoursRange)
    currentTime[id]['text'] = today
    setHoursRange(currentTime)
    
  }

  //새로시작
  const showDatePicker = () => {
    setDatePickerVisible(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisible(false)
  }

  function printHour() {
 
    const today = selectedDate.toLocaleTimeString('en-US', {
      timeStyle: 'short',
    })

    return `${today}`
  }

  return (
    <View style={styles.container}>
      <Text
        style={{ fontSize: 20, color: 'white', fontWeight: '300' }}
        onPress={showDatePicker}
      >
        {selectedDate ? printHour() : text}
        {id == 1 ? <Text> ~ </Text> : null}
      </Text>

      <DateTimePickerModal
        date={selectedDate}
        isVisible={datePickerVisible}
        mode="time"
        display="inline"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default TimePick