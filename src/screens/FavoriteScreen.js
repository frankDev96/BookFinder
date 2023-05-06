import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import has from 'lodash/has'
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


const FavoriteScreen = (props, context) => {
  const [{ lang }, { favorites_list }] = useSelector((state) => [state.i18nState, state.commonReducer])

  return (
    <MainContainer title="favorite"  >
      {<FlatList
        data={favorites_list || []}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingVertical: HEIGHT * 0.02 }}
        renderItem={({ item, index }) => <BooksListRenderItem {...item} />}
      />}
    </MainContainer>
  )
}
FavoriteScreen.contextTypes = {
  t: PropTypes.func
}
export default FavoriteScreen