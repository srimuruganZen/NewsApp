import React, {Component} from 'react';
import {Text, View, StyleSheet,Image, Dimensions,ToastAndroid, TouchableOpacity,TextInput} from 'react-native';
import {getNews, getDetailedNews, searchByInput,clearNewsFeed} from './actions';
import {connect} from 'react-redux';
import GridView from 'react-native-super-grid';
import {constructDate,constructTime} from './helper';
const {height, width} = Dimensions.get('window');
class News extends Component {
	constructor(props){
		super(props);
		this.state = { pageCount : 1 ,search_input : "", searchMode: false }
	}
    static navigationOptions = {
        title: 'Top News',
		headerTitleStyle :{paddingLeft:width/3}
    };
  componentDidMount(){
	this.props.getNews(1);
  }

  reachedEnd(){
	this.setState({pageCount: this.state.pageCount +1});
	if(this.state.search_input == ''){
		this.props.getNews(this.state.pageCount);
	}else{
		this.props.searchByInput({keyword:this.state.search_input,count:this.state.pageCount})
	}
  }

  componentWillReceiveProps(nextProps){
	  if(nextProps.loading){
		ToastAndroid.show('Fetching News . . .', ToastAndroid.SHORT);
	  }
  }

  getDetailedNews(item){
	this.props.getDetailedNews(item);
	this.props.navigation.navigate('DetailedNews');
  }

  searchByInput(){
	  if(this.state.search_input != '' && !this.state.searchMode){
		this.props.clearNewsFeed();
		this.setState({pageCount:1, searchMode:true})
		this.props.searchByInput({keyword:this.state.search_input,count:1})
		}
		if(this.state.searchMode){
			this.props.clearNewsFeed();
			this.props.getNews(1);
			this.setState({search_input:"",searchMode:false});
			this.textInput.clear();
		}
  }

  render() {
    return (
			<View style={{flex:1,backgroundColor:'#fff'}}>
			<View style={{flexDirection:'row',padding:5,borderBottomColor:'#716f6f66',borderBottomWidth:1}}>
				<TextInput ref={input => { this.textInput = input }} onChangeText={(search_input) => this.setState({search_input})} placeholder="Enter keyword . . ." style={{width:'60%',borderRadius:10,paddingLeft:5}}/>
				<TouchableOpacity onPress={()=>{this.searchByInput()}} style={{width:'40%',backgroundColor:'#716f6f66',borderRadius:50,alignItems:'center',justifyContent:'center'}}><Text>{this.state.searchMode ? "Clear Search" : "Search"}</Text></TouchableOpacity>
			</View>
			
			{
				this.props.news && this.props.news.length > 0 ? 
				<GridView
					itemDimension={130}
					items={this.props.news}
					style={styles.gridView}
					onEndReachedThreshold={0.1}
					onEndReached={()=>this.reachedEnd()}
					renderItem={item => (
					<TouchableOpacity onPress={()=>this.getDetailedNews(item)}>
					<View style={[styles.itemContainer, { backgroundColor: 'skyblue' }]}>
					<Image style={{width:'100%',height:'100%',position:'absolute',borderRadius:5,opacity:1}} source={{uri:item.urlToImage}}/>
						<Text numberOfLines={2} style={styles.itemName}>{item.title}</Text>
						<View style={{flexDirection:'row', backgroundColor:'#000000a1',width:'100%',borderBottomLeftRadius:5,borderBottomRightRadius:5}}> 
							<Text style={styles.itemCode}>{constructDate(item.publishedAt)}</Text>
							<Text style={{position:'absolute',right:5,color:'white',fontSize: 10}}>{constructTime(item.publishedAt)}</Text>
						</View>
					</View>
					</TouchableOpacity>
					)}
				/>
				: <Text style={{alignSelf:'center',paddingTop:100}}>No results Found</Text>
			}
			</View>
    )
  }
}

const mapStateToProps = (state) => ({
  news : state.news ? state.news : null,
  loading : state.loading
})

const mapDispatchToProps = (dispatch) =>({
  getNews: (count) => dispatch(getNews(count)),
  getDetailedNews: (data) => dispatch(getDetailedNews(data)),
  searchByInput: (data) => dispatch(searchByInput(data)),
  clearNewsFeed: () => dispatch(clearNewsFeed())
})

const styles = StyleSheet.create({
	gridView: {
	//   paddingTop: 25,
	  flex: 1,
	},
	itemContainer: {
	  justifyContent: 'flex-end',
	  borderRadius: 5,
	//   padding: 10,
	  height: 150,
	},
	itemName: {
	  fontSize: 12,
	  color: '#fff',
	  fontWeight: '600',
	  paddingLeft:5,
	  backgroundColor:'#000000a1'
	},
	itemCode: {
	  fontWeight: '600',
	  fontSize: 10,
	  color: '#fff',
	  paddingLeft:5,
	  textAlign:'left',
	  width:'50%'
	}
  });

export default connect(mapStateToProps,mapDispatchToProps)(News)