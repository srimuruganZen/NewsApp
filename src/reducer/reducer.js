const reducer = (state = {
    news:[],
    loading:false
}, action) => {
    switch (action.type) {
        case 'GET_DETAILED_NEWS':
        case 'SEARCH_BY_INPUT_PENDING':
        case 'GET_NEWS':
           return { 
                ...state,
                loading: true 
            };
            break;
        case 'SEARCH_BY_INPUT_SUCESS':
        case 'NEWS_RECEIVED':
           return { 
                ...state,
                news: state.news.length == 0 ? action.json : state.news.concat(action.json),
                loading: false 
            }
            break;
        case 'DETAILED_NEWS_RECEIVED':
        return { 
             ...state,
             newsDetail: action.payload.data,
             loading: false 
         }
         break;
         case 'NEWS_CLEARED':
         return { 
              ...state,
              news: [],
              loading: false 
          }
          break;
      default: 
           return state;
    }
};
export default reducer;