import { View, Text } from 'react-native'
import { useEffect } from 'react'

export default function Item({ route }) {
  const { id, categories } = route.params

  const category = categories.find((item) => {
    return item.id === id
  })

  const handelGetMainfoodListSucc = (res) => {
    if (res.ret && res.data) {
      console.log(res);
    }
  }

  useEffect(() => {
    fetch(`http://localhost.charlesproxy.com/api/mainFoodlist.json?id=${id}`)
      .then((res) => res.json())
      .then(handelGetMainfoodListSucc)
      .catch(() => { alert('请求异常') })
  }, [])

  return (
    <View>
      <Text>{category.title}</Text>
    </View>
  )
}