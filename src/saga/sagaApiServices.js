import {APIKEY,BASE_URL} from '../components/helper';
import { NEWS_RECEIVED, SEARCH_BY_INPUT_SUCESS, GET_SOURCES_SUCCESS } from '../actions/actionTypes';

// Fetching News
export function* fetchNews(params) {
  let url, data = params.data;
  if(data.type == 'filter'){
    url = BASE_URL+"/everything?sources="+data.news_id+"&page="+data.count
  }else{
    url = BASE_URL+"/everything?q=all&page="+data.count
  }
  console.log(url)
  try {
    const json = yield fetch(url,{
      headers: {
        "X-Api-Key": APIKEY
      }
    })
      .then(response => response.json());    
    yield put({ type: NEWS_RECEIVED, json: json.articles,filterName: data.news_name ? data.news_name : null });
  } catch (e) {
    console.log(e)
  }
}

// Getting results by search input method
export function* getSearchInputData(data) {
  let url, value = data.data && data.data.datas;
  if(value){
    url = BASE_URL+"/everything?sources="+value.news_id+"&q="+data.data.keyword+"&page="+data.data.count;
  }else{
    url = BASE_URL+"/everything?q="+data.data.keyword+"&page="+data.data.count;
  }
  console.log(url)
  try {
    const json = yield fetch(url,{
      headers: {
        "X-Api-Key": APIKEY
      }
    })
      .then(response => response.json());    
    yield put({ type: SEARCH_BY_INPUT_SUCESS, json: json.articles,filterName: value && value.news_name ? value.news_name :null });
  } catch (e) {
    console.log(e)
  }
}

// get source based on selected sources from the list
export function* getsources() {
  try {
    const json = yield fetch(BASE_URL+"/sources",{
      headers: {
        "X-Api-Key": APIKEY
      }
    })
      .then(response => response.json());    
    yield put({ type: GET_SOURCES_SUCCESS, json: json.sources });
  } catch (e) {
    console.log(e)
  }
}

// getting detailed news for selected news
export function* getDetailedNews(data) {
  yield put({ type: "DETAILED_NEWS_RECEIVED", payload: data, });
}

// clear the data which is in search box
export function* clearFilterData() {
  yield put({ type: "CLEAR_FILTER_SUCCESS"});
}

// clear the news feed
export function* clearNewsFeed() {
  yield put({ type: "NEWS_CLEARED" });
}