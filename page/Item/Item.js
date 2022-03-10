import { View,
  Text, 
  Image, 
  StyleSheet, 
  Dimensions, 
  SafeAreaView,
  FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import { reqItemList } from '../../api'

const { width } = Dimensions.get('window')
const itemImgDimension = (width - 20) / 3 

const Item = ({ title, desc }) => {
return (
 <View style={Styles.item}>
     <Image 
         style={[{width: itemImgDimension, height: itemImgDimension}, Styles.itemImg]}
         source={{uri: 'http://localhost.charlesproxy.com/api/imgs/index.jpg'}}
     />
     <View style={Styles.info}>
         <Text style={Styles.info_title}>{ title }</Text>
         <Text style={Styles.info_desc}>{ desc }</Text>
     </View>
 </View>
)
}

export default function ItemlistScreen({ route }) {
const [itemList, setItemList] = useState([])
const [refreshing, setRefreshing] = useState(false)

const { id } = route.params

const renderItem = ({ item }) => {
 return (
     <Item title={item.title} desc={item.desc} />
 )
}

const getItemlist = async () => {
  const res = await reqItemList(id)
  if(res.ret && res.data) {
    setItemList(res.data.list)
  } else {
    alert('请求item失败')
  }
}

useEffect(() => {
 getItemlist()
}, [])

const handleRefreshing = () => {
  setRefreshing(true)
  getItemlist()
  setRefreshing(false)
}

return (
<SafeAreaView style={Styles.container} >
 <FlatList
     onRefresh={handleRefreshing}
     refreshing={refreshing}
     data={itemList}
     renderItem={renderItem}
     keyExtractor={item => item.id}
 />
</SafeAreaView>
)
}

const Styles = StyleSheet.create({
container: {
 flex: 1,
 backgroundColor: '#ededed'
},
item: {
 display: 'flex',
 flexDirection: 'row',
 marginTop: 5,
 marginBottom: 5,
 marginLeft: 10,
 marginRight: 10,
 backgroundColor: '#fff',
 padding: 10,
 borderRadius: 10
},
itemImg: {
 borderRadius: 10
},
info: {
 flex: 1,
 marginLeft: 10
},
info_title: {
 lineHeight: 20,
 fontWeight: 'bold',
 fontSize: 18,
 marginBottom: 18
},
info_desc: {
 lineHeight: 20
}
})