import React, {Component} from 'react';
import {Text, View,Image, Dimensions, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {constructDate,constructTime,baseImage} from './helper';
const {height, width} = Dimensions.get('window');
class DetailedNews extends Component {
	constructor(props){
		super(props);
		this.state = { pageCount : 1 }
    }
    static navigationOptions = {
        title: 'Detailed News',
        headerTitleStyle :{paddingLeft:width/7}
    };

  render() {
      const news = this.props.newsDetail ? this.props.newsDetail : null
    return (
			<View style={styles.head}>
                <View style={styles.image}>
                    <Image source={{uri:news.urlToImage != '' ? news.urlToImage : baseImage}}/>
                </View>
                <View style={styles.time}>
                    <Text style={styles.timeViewOne}>{news.title}</Text>
                    <Text style={styles.timeViewTwo}>{constructDate(news.publishedAt)+","+constructTime(news.publishedAt)}</Text>
                    <Text style={styles.timeViewThree}>{news.content}</Text>
                </View>
			</View>
    )
  }
}

const styles = StyleSheet.create({
  head:{
    flex:1,
    backgroundColor:'#fff'
  },
  image:{
    flex:0.4
  },
  time:{
    flex:0.5,
    padding:8
  },
  timeViewOne:{
    fontSize:20,
    color:'#000'
  },
  timeViewTwo:{
    fontSize:17,
    color:'#000'
  },
  timeViewThree:{
    fontSize:17,
    paddingTop:10
  }
})

const mapStateToProps = (state) => ({
  newsDetail : state.newsDetail ? state.newsDetail : null,
  loading : state.loading
})

export default connect(mapStateToProps,null)(DetailedNews)