import { View,
         Text, 
         Image, 
         StyleSheet, 
         Dimensions, 
         SafeAreaView,
         FlatList } from 'react-native'
import { useEffect, useState } from 'react'

const { width } = Dimensions.get('window')
const itemImgDimension = (width - 20) / 3 

const Item = ({ title, desc }) => {
    return (
        <View style={Styles.item}>
            <Image 
                style={[{width: itemImgDimension, height: itemImgDimension}, Styles.itemImg]}
                source={require('../../resource/imgs/index.jpg')}
            />
            <View style={Styles.info}>
                <Text style={Styles.info_title}>{ title }</Text>
                <Text style={Styles.info_desc}>{ desc }</Text>
            </View>
        </View>
    )
}

export default function HotlistScreen() {
    const [hotList, setHotList] = useState([])

    const renderItem = ({ item }) => {
        return (
            <Item title={item.title} desc={item.desc} />
        )
    }

    const handelGetHotlistSucc = (res) => {
        if (res.ret && res.data) {
            setHotList(res.data.list)
        }
    }

    useEffect(() => {
        fetch('http://localhost.charlesproxy.com/api/hotlist.json')
            .then((res) => res.json())
            .then(handelGetHotlistSucc)
            .catch(() => { alert('请求异常') })
    }, [])

  return (
    <SafeAreaView style={Styles.container} >
        <FlatList
            data={hotList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    </SafeAreaView>
  )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dadce0'
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