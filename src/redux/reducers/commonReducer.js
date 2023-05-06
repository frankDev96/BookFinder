
import { LOADER, SHOW_ALERT, FAVORITE_BOOKS, BOOK_LIST, RECENT_SEARCH } from "../../constants/constants"

const initialState = {
    loading: false,
    alertParams: {
        visible: false
    },
    favorites_list: [],
    booksList: [],
    recentSearchList: { keywords: [],},


};

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADER:
            return {
                ...state,
                loading: action.payload
            };
        case SHOW_ALERT:
            return {
                ...state,
                alertParams: action.payload
            };
        case FAVORITE_BOOKS:
            return {
                ...state,
                favorites_list: action.payload
            };
        case BOOK_LIST:
            return {
                ...state,
                booksList: action.payload
            };

        case RECENT_SEARCH:
            return {
                ...state,
                recentSearchList: action.payload
            };
        default:
            return { ...state };
    }
};

export default commonReducer;
