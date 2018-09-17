export function getNews(data) {
    return {
      type: 'GET_NEWS',
      data
    }
}

export function getDetailedNews(data) {
  return {
    type: 'GET_DETAILED_NEWS',
    data
  }
}

export function searchByInput(data) {
  return {
    type: 'SEARCH_BY_INPUT_PENDING',
    data
  }
}

export function clearNewsFeed(data) {
  return {
    type: 'NEWS_CLEAR'
  }
}