import React, {Component} from 'react';
import {Text, View, StyleSheet,Image, Dimensions,ToastAndroid} from 'react-native';
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
			<View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={{flex:0.4}}>
                    <Image source={{uri:news.urlToImage != '' ? news.urlToImage : baseImage,width:'100%',height:height/3}}/>
                </View>
                <View style={{flex:0.5,padding:8}}>
                    <Text style={{fontSize:20,color:'#000'}}>{news.title}</Text>
                    <Text style={{fontSize:17,color:'#000'}}>{constructDate(news.publishedAt)+","+constructTime(news.publishedAt)}</Text>
                    <Text style={{fontSize:17,paddingTop:10}}>{news.content}</Text>
                </View>
			</View>
    )
  }
}

const mapStateToProps = (state) => ({
  newsDetail : state.newsDetail ? state.newsDetail : null,
  loading : state.loading
})

export default connect(mapStateToProps,null)(DetailedNews)