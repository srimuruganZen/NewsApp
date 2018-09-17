import React, {Component} from 'react';
import {Text, View, StyleSheet,Image, Dimensions, TouchableOpacity,TextInput} from 'react-native';
import {getNews, getDetailedNews, searchByInput,clearNewsFeed} from '../actions/actions';
import {connect} from 'react-redux';
import GridView from 'react-native-super-grid';
import {constructDate,constructTime,baseImage} from './helper';
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
			{
				!this.props.loading ?
				<View style={styles.searchBox}>
					<TextInput 
						ref={input => { this.textInput = input }} 
						value={this.state.search_input} 
						onChangeText={(search_input) => this.setState({search_input})} 
						placeholder="Enter keyword . . ." 
						style={{width:'60%',borderRadius:10,paddingLeft:5}}
					/>
					<TouchableOpacity 
						onPress={()=>{this.searchByInput()}} 
						style={[styles.searchBoxButton,{backgroundColor:this.state.searchMode ? '#716f6f66':'#fff'}]}>
						<Text>{this.state.searchMode ? "Clear Search" : "Search"}</Text>
					</TouchableOpacity>
				</View>
				:
				<View style={styles.loading}>
			 		<Text style={{color:'white',alignSelf:'center'}}>Fetching News . . .</Text>
				</View>
			}
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
					<View style={styles.itemContainer}>
					<Image style={styles.image} source={{uri:item.urlToImage != '' ? item.urlToImage : baseImage }}/>
						<Text numberOfLines={2} style={styles.itemName}>{item.title}</Text>
						<View style={styles.timeInfo}> 
							<Text style={styles.itemCode}>{constructDate(item.publishedAt)}</Text>
							<Text style={styles.time}>{constructTime(item.publishedAt)}</Text>
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

const styles = StyleSheet.create({
	searchBox: {
		flexDirection:'row',
		padding:5,
		borderBottomColor:'#716f6f66',
		borderBottomWidth:1,  
		shadowRadius: 1,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowColor: '#000000',
		elevation: 3
	},
	loading: {
		backgroundColor:'grey',
		flexDirection:'row',
		padding:10,
		borderBottomColor:'#716f6f66',
		borderBottomWidth:1,
		justifyContent:'center'
	},
	gridView: {
		flex: 1,
	},
	itemContainer: {
		justifyContent: 'flex-end',
		borderRadius: 5,
		height: 150,
		backgroundColor: 'skyblue'
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
	},
	image:{
		width:'100%',
		height:'100%',
		position:'absolute',
		borderRadius:5,
		opacity:1
	},
	timeInfo:{
		flexDirection:'row',
		backgroundColor:'#000000a1',
		width:'100%',
		borderBottomLeftRadius:5,
		borderBottomRightRadius:5
	},
	time:{
		position:'absolute',
		right:5,
		color:'white',
		fontSize: 10
	},
	searchBoxButton:{
		width:'40%',
		borderRadius:50,
		alignItems:'center',
		justifyContent:'center',
		borderColor:'#716f6f66',
		borderWidth:1
	}
})

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

export default connect(mapStateToProps,mapDispatchToProps)(News)