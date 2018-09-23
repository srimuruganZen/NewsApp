import { GET_NEWS, GET_DETAILED_NEWS, SEARCH_BY_INPUT_PENDING, NEWS_CLEAR, GET_SOURCES, CLEAR_FILTER } from "./actionTypes";

export function getNews(data) {
    return {
      type: GET_NEWS,
      data
    }
}

export function getDetailedNews(data) {
  return {
    type: GET_DETAILED_NEWS,
    data
  }
}

export function searchByInput(data) {
  return {
    type: SEARCH_BY_INPUT_PENDING,
    data
  }
}

export function clearNewsFeed(data) {
  return {
    type: NEWS_CLEAR
  }
}

export function getSources(data) {
  return {
    type: GET_SOURCES,
    data
  }
}

export function clearFilter(){
  return {
    type: CLEAR_FILTER
  }
}