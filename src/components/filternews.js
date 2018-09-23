import React, {Component} from 'react';
import {Text, View, StyleSheet,TouchableOpacity, Dimensions,FlatList} from 'react-native';
import {connect} from 'react-redux';
import {getNews, clearNewsFeed} from '../actions/actions';
class FilterNewS extends Component {
	constructor(props){
		super(props);
		this.state = { pageCount : 1 }
    }
    static navigationOptions = {
        title: 'Sources',
    };
    getNewsByFilter(news){
        this.props.clearNewsFeed();
        let datas ={
            count:this.state.pageCount,
            type:'filter',
            news_id: news.id,
            news_name: news
        }
        this.props.getNews(datas);
        this.props.navigation.goBack();
    }
  render() {
    return (
			<View style={{flex:1}}>
            {
                this.props.filters ? 
                <FlatList
                    data={this.props.filters}
                    renderItem={({item})=>
                    <TouchableOpacity key={item.name} style={styles.filterBox} onPress={this.getNewsByFilter.bind(this,item)}>
                        <View>
                            <Text key={item.id} style={styles.white}>{item.name}</Text>
                            <Text style={styles.font}>{item.category}</Text>
                        </View>
                    </TouchableOpacity>
                    }
                />
                :
                null
            }
			</View>
    )
  }
}

const styles = StyleSheet.create({
    filterBox:{
        margin:10,
        backgroundColor:'white',
        padding:25,
        borderRadius:4,
        borderColor:'#f2f2f2',
        borderWidth:1,
        shadowRadius: 1,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowColor: '#000000',
		elevation: 3
    },
    white:{
        color:'#000'
    },
    font:{
        fontSize:12
    }
})

const mapDispatchToProps = (dispatch) =>({
    getNews: (data) => dispatch(getNews(data)),
    clearNewsFeed: () => dispatch(clearNewsFeed())
})
const mapStateToProps = (state) => ({
  filters : state.filters ? state.filters : null,
})

export default connect(mapStateToProps,mapDispatchToProps)(FilterNewS)