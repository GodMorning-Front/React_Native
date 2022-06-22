import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button ,error} from 'react-native';

import { useState, useEffect } from 'react'


import axios from 'axios';

export default function todos1() {
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null)
        setUsers(null)
        // loading 상태를 true 로 바꿉니다.
        setLoading(true)
        const response = await axios.get(
          'http://3.38.14.254/newRoutine/list',
        )
        setUsers(response.data) // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e)
      }
      setLoading(false)
    }

    fetchUsers()
  }, [])

  if (loading) return <Text>로딩중..</Text>
  if (error) return <Text>에러가 발생했습니다</Text>
  if (!users) return null
  return (
   users
  )

}


