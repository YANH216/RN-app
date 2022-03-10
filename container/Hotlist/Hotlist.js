import { View,
         Text, 
         Image, 
         Dimensions, 
         SafeAreaView,
         FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Styles from './style'
import { reqHotList } from '../../api'
import { setHotList } from '../../redux/actions'

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

function HotlistScreen(props) {
    const { hotList, setHotList } = props
    const [refreshing, setRefreshing] = useState(false)

    const renderItem = ({ item }) => {
        return (
            <Item title={item.title} desc={item.desc} />
        )
    }

    const getHotlist = async () => {
        const res = await reqHotList()
        if(res.ret && res.data) {
            setHotList(res.data.list)
        } else {
            alert('请求出错')
        }
    }

    useEffect(() => {
        getHotlist()
    }, [])

  return (
    <SafeAreaView style={Styles.container} >
        <FlatList
            onRefresh={() => { setRefreshing }}
            refreshing={refreshing}
            data={hotList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    </SafeAreaView>
  )
}

export default connect(
    state => (
        { hotList: state.hotList }
    ), { setHotList }
)(HotlistScreen)
