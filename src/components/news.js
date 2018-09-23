import React, {Component} from 'react';
import {Text, View, StyleSheet,Image, Dimensions, TouchableOpacity,TextInput} from 'react-native';
import {getNews, getDetailedNews, searchByInput,clearNewsFeed,getSources,clearFilter} from '../actions/actions';
import {connect} from 'react-redux';
import GridView from 'react-native-super-grid';
import {constructDate,constructTime,baseImage} from './helper';
const {height, width} = Dimensions.get('window');
class News extends Component {
	constructor(props){
		super(props);
		this.state = { pageCount : 1 ,search_input : "", searchMode: false }
	}
    static navigationOptions = ({ navigation }) => ({
        title: 'Top News',
		headerTitleStyle :{paddingLeft:width/3},
		headerRight: <TouchableOpacity onPress={()=>navigation.navigate('FilterNewS')}>
						<Image style={styles.headerTop} resizeMode='contain' source={require('../images/funn.png')}>
						</Image>
					</TouchableOpacity>
	})
  componentDidMount(){
	this.props.getNews({count:this.state.pageCount});
	this.props.getSources();
  }

  reachedEnd(){
	if(this.props.news.length > 19 && !this.props.loading){
		let count = this.state.pageCount +1
		this.setState({pageCount: count});
		if(this.props.filterName){
			this.searchFilter();
		}else{
			if(this.state.search_input == ''){
				this.props.getNews({count:count});
			}else{
				this.props.searchByInput({keyword:this.state.search_input,count:count})
			}
		}
	}
  }
  onRemoveFilter(){
	this.props.clearFilter();
	this.props.clearNewsFeed();
	this.props.getNews({count:1});
  }
  getDetailedNews(item){
	this.props.getDetailedNews(item);
	this.props.navigation.navigate('DetailedNews');
  }

  searchFilter(){
	let datas ={
		type:'filter',
		news_id: this.props.filterName.id,
		news_name: this.props.filterName
	}
	this.props.searchByInput({keyword:this.state.search_input,count:this.state.pageCount,datas})
  }

  searchByInput(){
	  if(this.state.search_input != '' && !this.state.searchMode){
		this.props.clearNewsFeed();
		this.setState({pageCount:1, searchMode:true});
		  if(this.props.filterName){
			this.searchFilter();
		  }else{
			this.props.searchByInput({keyword:this.state.search_input,count:1})
		  }
		}
		if(this.state.searchMode){
			this.props.clearNewsFeed();
			this.props.getNews({count:1});
			this.setState({search_input:"",searchMode:false});
			this.textInput.clear();
		}
  }
  render() {
    return (
			<View style={styles.baseView}>
			{
				!this.props.loading ?
				<View style={styles.searchBox}>
					<TextInput 
						ref={input => { this.textInput = input }} 
						value={this.state.search_input} 
						onChangeText={(search_input) => this.setState({search_input})} 
						placeholder="Enter keyword . . ." 
						style={styles.searchInput}
					/>
					<TouchableOpacity 
						onPress={()=>{this.searchByInput()}} 
						style={[styles.searchBoxButton,{backgroundColor:this.state.searchMode ? '#716f6f66':'#fff'}]}>
						<Text>{this.state.searchMode ? "Clear Search" : "Search"}</Text>
					</TouchableOpacity>
				</View>
				:
				<View style={styles.loading}>
			 		<Text style={styles.fetching}>Fetching News . . .</Text>
				</View>
			}
			{	
				
				this.props.news && this.props.news.length > 0 ? 
				<View style={{flex:1}}>
				{
					this.props.filterName ?
					<View style={styles.filterView}>
						<Text numberOfLines={2} style={styles.filter}>{this.props.filterName.name}</Text>
						<TouchableOpacity onPress={()=>this.onRemoveFilter()} style={styles.remove}>
							<Text>X</Text>
						</TouchableOpacity>
					</View>
					:
					null
				}
					<GridView
					itemDimension={130}
					items={this.props.news}
					style={styles.gridView}
					onEndReachedThreshold={0.01}
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
				</View>
				: <Text style={styles.noResult}>No results Found</Text>
			}
			</View>
    )
  }
}

const styles = StyleSheet.create({
	searchInput:{
		width:'60%',
		borderRadius:10,
		paddingLeft:5
	},
	fetching:{
		color:'white',
		alignSelf:'center'
	},
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
	baseView:{
		flex:1,
		backgroundColor:'#fff'
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
	filter:{
		paddingRight:20,
		width:'80%'
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
	},
	filterView:{
		margin:5,
		borderColor:'grey',
		borderWidth:1,
		borderRadius:25,
		alignSelf:'center',
		paddingLeft:20,
		paddingRight:0,
		flexDirection:'row',
		width:'60%',
		height:40,
		alignItems:'center'
	},
	remove:{
		position:'absolute',
		right:0,
		borderWidth:1,
		backgroundColor:'grey',
		borderRadius:50,
		height:'100%',
		width:40,
		alignItems:'center',
		justifyContent:'center'
	},
	noResult:{
		alignSelf:'center',
		paddingTop:100
	},
	headerTop:{
		height:20,
		width:20,
		marginRight:15
	}
})

const mapStateToProps = (state) => ({
  news : state.news ? state.news : null,
  filterName : state.filterName ? state.filterName : null,
  loading : state.loading
})

const mapDispatchToProps = (dispatch) =>({
  getNews: (data) => dispatch(getNews(data)),

  getDetailedNews: (data) => dispatch(getDetailedNews(data)),
  searchByInput: (data) => dispatch(searchByInput(data)),
  clearNewsFeed: () => dispatch(clearNewsFeed()),
  getSources: () => dispatch(getSources()),
  clearFilter: () => dispatch(clearFilter())
})

export default connect(mapStateToProps,mapDispatchToProps)(News)