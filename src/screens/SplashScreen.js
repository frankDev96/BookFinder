import { View, Text, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import { colors } from '../constants/colors'
import { logo } from '../assets/images'
import { WIDTH, HEIGHT } from '../constants/dimensions'
import { commonAction, joinDataAction } from '../redux/actions'
import { commonStyle } from '../constants/styles'
import { EXPLORE_DATA, HOME_DATA, NOTIFICATION, USER_DATA } from '../constants/constants';

const SplashScreen = (props, context) => {
    const { codePush } = useSelector(state => state.commonReducer)
    const { navigation } = props
    const dispatch = useDispatch()
    useEffect(() => {
        getRecentSearchData()
        setTimeout(() => {
            navigation.replace("TabScreens")
        }, 1000);
    }, [])
    const getRecentSearchData = async () => {
        try {
            const response = await AsyncStorage.getItem("favorite_list")
            if (response != null) {
                dispatch(commonAction.storeFavorites(JSON.parse(response)))
            }
        } catch (error) {
            console.log("error__", error);
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: colors.white, alignItems: "center", justifyContent: "center" }}>
            <StatusBar barStyle={"light-content"} backgroundColor={colors.white} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>SplashScreen</Text>
            </View>
        </View>
    )
}
SplashScreen.contextTypes = {
    t: PropTypes.func
}
export default SplashScreen;