import { View, Text, Switch, StyleSheet } from 'react-native'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { changeIsEnable } from '../../redux/actions'
import AsyncStorage from '@react-native-async-storage/async-storage';

function Setting({ changeIsEnable, isEnable }) {
  const handleValueChange = () => {
    changeIsEnable(isEnable)
  }

  // 本地存储Switch的开关状态
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      alert('存储数据到本地失败')
    }
  }

  useEffect(() => {
    storeData(isEnable)
  }, [isEnable])

  return (
    <View style={Styles.container}>
      <Text>Setting: 控制是否展示bottoTabBar中的Map</Text>
      <Switch
        style={Styles.switch}
        value={isEnable}
        onValueChange={handleValueChange}
      />
    </View>
  )
}

export default connect(
  state => ({
    isEnable: state.isEnable
  }), { changeIsEnable }
)(Setting)

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  switch: {
    height: 100
  }
})