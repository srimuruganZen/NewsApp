import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';
import News from './components/news';
import store from './store/store';
import {Provider} from 'react-redux';
import DetailedNews from './components/detailedNews';
import FilterNewS from './components/filternews';
const AppNavigator = createStackNavigator({
  News: { screen: News },
  DetailedNews: { screen: DetailedNews },
  FilterNewS: { screen: FilterNewS}
}
 ,{ 
  headerMode: 'screen'
  }
);

export default class App extends Component {
  render() {
    return (
         <Provider store={store}>
         	<AppNavigator/>
          </Provider>
    );
  }
}