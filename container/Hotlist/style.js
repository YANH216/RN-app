import { StyleSheet } from "react-native"

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

export default Styles