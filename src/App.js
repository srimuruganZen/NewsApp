import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation';
import News from './components/news';
import store from './store/store';
import {Provider} from 'react-redux';
import DetailedNews from './components/detailedNews';
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