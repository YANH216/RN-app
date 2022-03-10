import { StyleSheet,
         View,
         Text,
         Image,
         TextInput,
         Dimensions,
         TouchableWithoutFeedback,
         SafeAreaView,
         FlatList 
        } from 'react-native'
import { useState, useEffect } from 'react'
import { reqIndex } from '../../api'


const { width } = Dimensions.get('window')
const itemDimension = (width - 20) / 3
const itemImgDimension = itemDimension - 20
const numColumns =  parseInt(width / itemDimension)  // 根据屏幕分辨率判断该展示几列

const Item = ({ id, title, navigation }) => {
    const handelPress = (id, categories) => {
        navigation.navigate('Item', { id, categories })
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => handelPress(id)}
        >
            <View 
                style={[{width: itemDimension}, styles.item]}
            >
                <Image 
                    source={{uri: 'http://localhost.charlesproxy.com/api/imgs/index.jpg'}}
                    style={[
                        {width: itemImgDimension, height: itemImgDimension},
                        styles.itemImg
                    ]}
                />
                <View style={styles.itemTitle}>
                    <Text style={{fontSize: 15}}>{ title }</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default function HomeScreen({ navigation }) {

const [categories, setCategories] = useState([])

const renderItem = ({ item }) => {
    return (
        <Item 
            id={item.id} 
            title={item.title} 
            navigation={navigation}
        />
    )
}

const getHomeList = async () => {
    const res = await reqIndex()
    if(res.ret && res.data) {
        setCategories(res.data.categories)
    } else {
        alert('请求index失败')
    }
}

useEffect(() => {
    getHomeList()
}, [])

return (
 <View style={styles.container}>
     <View style={styles.top}>
       <Image
       // 载入图片尺寸 1920 * 1080
         style={[{width: width, height: 1080 * .2}, styles.topImg]} 
         source={{uri: 'http://localhost.charlesproxy.com/api/imgs/index.jpg'}}/>
       <TextInput
         style={[styles.search, {top: 160}]}
         placeholder='请输入搜索内容'
         underlineColorAndroid='#fff'
       />
     </View>
     <SafeAreaView style={styles.content}>
         <FlatList
            numColumns={numColumns}  // FlatList 不允许使用flex布局改变样式，需使用该属性，设定呈现多少页
            data={categories}
            renderItem={renderItem}
            keyExtractor={item => item.id}
         />
     </SafeAreaView>
   </View>
)
}

const styles = StyleSheet.create({
container: {
 flex: 1,
 backgroundColor: '#fff',
},
top: {
 minHeight: 10,
},
topImg: {
    borderRadius: 5
},
search: {
 position: 'absolute',
 left: 20,
 right: 20,
 height: 40,
 lineHeight: 40,
 backgroundColor: '#fff',
 borderRadius: 5,
 paddingLeft: 10,
},
content: {
 flex: 1,
 backgroundColor: '#fff',
 marginTop: 5,
 marginLeft: 10,
 marginRight: 10,
 borderRadius: 5,
 marginBottom: 5,
},
item: {
 display: 'flex',
},
itemImg: {
 marginLeft: 10,
 marginTop: 10,
 borderRadius: 10,
},
itemTitle: {
 height: 30,
 lineHeight: 30,
 textAlign: 'center',
}
});