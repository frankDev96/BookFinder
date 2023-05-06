import { LOADER, SHOW_ALERT, FAVORITE_BOOKS, BOOK_LIST, RECENT_SEARCH } from "../../constants/constants"
import { networkApi } from '../../http/api'
import { url, urlEndPoints } from '../../http/apiConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import has from 'lodash/has'
import { commonAction, joinDataAction } from '../../redux/actions'
import { store } from "../../../App"
// import { store } from '../../../App'
// import { commonAction } from "../../redux/actions"

const handleLoader = (payload = false) => {
    return async dispatch => {
        dispatch({
            type: LOADER, payload: payload
        })
    }
}

const handleAlert = (obj = {}) => {
    return async dispatch => {
        dispatch({
            type: SHOW_ALERT, payload: obj
        })
    }
}
const searchBooksList = (text, startIndex = 0) => {
    return async dispatch => {
        try {
            const { booksList } = store?.getState()?.commonReducer
            dispatch({
                type: LOADER, payload: true
            })
            const apiUrl = `${url.apiUrl}${urlEndPoints.searchBooks({ text, startIndex, maxResults: 10 })}`
            console.log("apiUrl__", apiUrl);
            const response = await networkApi(apiUrl)
            dispatch({
                type: LOADER, payload: false
            })
            console.log("response___", response.kind, response);
            if (has(response, "kind")) {
                let mappedResult = response?.items?.map(item => { return { ...item, ...{ wishlist_status: 0 } } })
                dispatch({
                    type: BOOK_LIST,
                    payload: startIndex == 0 ? mappedResult : [...booksList, ...mappedResult]
                })
            }
        }
        catch (error) {
            dispatch({
                type: LOADER, payload: false
            })
            console.log("searchBooks_error", error);
        }
    }
}
const storeFavorites = (obj) => {
    return async dispatch => {
        dispatch({
            type: FAVORITE_BOOKS, payload: obj
        })
        await AsyncStorage.setItem("favorite_list", JSON.stringify(obj))
    }
}
const saveRecentSearch = (obj) => {
    return async dispatch => {
        dispatch({
            type: RECENT_SEARCH,
            payload: obj
        })
        await AsyncStorage.setItem("recent_search_list", JSON.stringify(obj))
    }
}

export default {
    handleLoader, handleAlert, searchBooksList, storeFavorites, saveRecentSearch
}