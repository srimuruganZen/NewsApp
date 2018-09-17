const reducer = (state = {
    news:[],
    loading:false,
    filterName: null
}, action) => {
    switch (action.type) {
        case 'GET_DETAILED_NEWS':
        case 'SEARCH_BY_INPUT_PENDING':
        case 'GET_NEWS':
           return { 
                ...state,
                loading: true 
            };
        case 'SEARCH_BY_INPUT_SUCESS':
        case 'NEWS_RECEIVED':
           return { 
                ...state,
                news: state.news.length == 0 ? action.json : state.news.concat(action.json),
                loading: false,
                filterName : action.filterName ? action.filterName : null  
            }
        case 'DETAILED_NEWS_RECEIVED':
        return { 
             ...state,
             newsDetail: action.payload.data,
             loading: false 
         }
         case 'NEWS_CLEARED':
         return { 
              ...state,
              news: [],
              loading: false,
          }
          case 'GET_SOURCES_SUCCESS':
          return{
                ...state,
                filters: action.json,
                loading: false 
          }
          case 'CLEAR_FILTER_SUCCESS':
          return{
                ...state,
                filterName: null,
          }
      default: 
           return state;
    }
};
export default reducer;