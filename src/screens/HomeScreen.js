import { View, Text, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import isEmpty from 'lodash/isEmpty'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types';

import MainContainer from '../components/MainContainer'
import { homeIcon } from '../assets/images'
import { networkApi } from '../http/api'
import { url, urlEndPoints } from '../http/apiConfig'
import BooksListRenderItem from '../components/BooksListRenderItem'
import CustomTextInput from '../components/CustomTextInput'
import { HEIGHT, WIDTH } from '../constants/dimensions'
import { colors } from '../constants/colors'
import { commonAction } from '../redux/actions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BOOK_LIST } from '../constants/constants';

const HomeScreen = (props, context) => {
  const dispatch = useDispatch()
  const [{ lang }, { booksList, recentSearchList }] = useSelector((state) => [state.i18nState, state.commonReducer])
  const [recentSearchekeyList, setRecentSearchKey] = useState([])
  const [searchText, setSearchText] = useState("")
  const [showCloseButton, setShowCloseButton] = useState({ show: false, type: "", id: "" })

  useEffect(() => {
    getRecentSearchData()
  }, [])
  useEffect(() => {
    if (!isEmpty(recentSearchList)) {
      !isEmpty(recentSearchList?.keywords) && setRecentSearchKey([...recentSearchList?.keywords])
    }
  }, [recentSearchList, recentSearchList.keywords])


  const getRecentSearchData = async () => {
    try {
      const response = await AsyncStorage.getItem("recent_search_list")
      if (response != null) {
        dispatch(commonAction.saveRecentSearch(JSON.parse(response)))
      }
    } catch (error) {
      console.log("error__", error);
    }
  }
  const containsWhitespace = (str) => {
    return /^\s+$/.test(str);
  }
  const onSubmitAction = async (searchData) => {
    // let validText = containsWhitespace(searchData)
    // if (!validText) {
    //   recentSearchList?.keywords?.unshift(searchData)
    //   recentSearchList?.keywords?.length > 5 && recentSearchList?.keywords?.pop()
    //   dispatch(commonAction.saveRecentSearch({ ...recentSearchList }))
    // }
    searchData?.length > 0 && dispatch(commonAction.searchBooksList(searchData, 0))
    alert("ttt")

  }
  const deleteIndividualSearch = (type, item) => {
    if (type == "keywords") {
      let filtered = recentSearchList?.keywords?.filter(el => el != item)
      recentSearchList.keywords = filtered
      setRecentSearchKey([...filtered])
    } else {
      let filtered = recentSearchList?.users?.filter(el => el?.name?.user_name != item?.name?.user_name)
      recentSearchList.users = filtered
      setRecentSearchList([...filtered])
    }
    setShowCloseButton({ show: false, type: "", id: "" })
    dispatch(commonAction.saveRecentSearch({ ...recentSearchList }))
  }
  return (
    <MainContainer title="home" leftComponent={<View />} >
      <CustomTextInput
        value={searchText}
        placeholder={"search_here"}
        onChangeText={(txt) => {
          setSearchText(txt)
        }}
        boxStyle={{ borderWidth: 1, marginHorizontal: WIDTH * 0.05, borderRadius: WIDTH * 0.01, borderColor: colors.borderColor, }}
        onSubmitEditing={() => { searchText?.length > 0 && dispatch(commonAction.searchBooksList(searchText, 0)) }}
        showClearButton={searchText?.length > 0}
        onClear={() => {
          setSearchText("")
          dispatch({
            type: BOOK_LIST,
            payload: []
          })
        }}
      />
      {recentSearchList?.length > 0 && searchText?.length == 0 && <FlatList
        data={[...new Set(recentSearchList.map(x => x))].slice(0, 5)}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginTop: HEIGHT * 0.01, }}
        contentContainerStyle={{ paddingTop: HEIGHT * 0.01 }}
        renderItem={({ item, index }) => {
          return (<Pressable onLongPress={() => { setShowCloseButton({ show: true, type: "keywords", id: item }) }}
            onPress={() => { setSearchText(item) }}
            style={[commonStyle.flexDirection(lang), { alignItems: 'center', justifyContent: 'space-between', marginHorizontal: WIDTH * 0.05, borderBottomWidth: ArrayLength - 1 == index ? 0 : 1, borderBottomColor: `${colors.borderColor}40`, }]} >
            <Text style={[commonStyle.fontRegular(lang), { color: colors.textColor, fontSize: 16, flex: 1 }]} >{item || ""}</Text>
            <View style={{ marginVertical: HEIGHT * 0.0, height: HEIGHT * 0.045, justifyContent: 'center' }} >
              {
                showCloseButton?.type == "keywords" && showCloseButton?.id == item ? <CloseIconComponent
                  onPress={() => { deleteIndividualSearch(showCloseButton?.type, item) }}
                />
                  : <Image source={diagonalArrow} resizeMode="contain" />
              }
            </View>
          </Pressable>)
        }}
      />}

      {searchText?.length > 0 && booksList?.length > 0 && <FlatList
        data={booksList || []}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingVertical: HEIGHT * 0.02 }}
        renderItem={({ item, index }) => <BooksListRenderItem {...item} />}
        onEndReachedThreshold={0.2}
        onEndReached={() => { dispatch(commonAction.searchBooksList(searchText, booksList?.length - 1)) }}
      />}
    </MainContainer>
  )
}
HomeScreen.contextTypes = {
  t: PropTypes.func
}
export default HomeScreen