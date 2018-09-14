import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';
import News from './src/news';
import store from './src/store';
import {Provider} from 'react-redux';
import DetailedNews from './src/detailedNews';
const AppNavigator = createStackNavigator({
  News: { screen: News },
  DetailedNews: { screen: DetailedNews }
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