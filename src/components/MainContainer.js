
import { View, SafeAreaView, StatusBar, Pressable, Image, Text, Platform, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

import { leftArrow } from '../assets/images';
import { colors } from '../constants/colors';
import { WIDTH, HEIGHT } from '../constants/dimensions'
import { commonStyle } from '../constants/styles';


const MainContainer = (props, context) => {
    const navigation = useNavigation();
    const [{ lang }] = useSelector((state) => [state.i18nState]);
    const { headerStyle, children, onPressLeftAction = () => { navigation.goBack() }, title, leftComponent, rightComponent, onPressRightAction = () => { }, rightNavigationData = [], leftComponentStyle, showLeftIcon = true, style, childrenStyle, leftIcon, textStyle } = props

    return (
        <View style={{ flex: 1, backgroundColor: colors.white, ...style }}>
            <StatusBar translucent backgroundColor={"transparent"/* colors.white */} barStyle="dark-content" />
            <View style={[commonStyle.flexDirection(lang), { width: WIDTH, height: HEIGHT * 0.07, paddingHorizontal: WIDTH * 0.05, marginTop: Platform.OS == "android" ? StatusBar.currentHeight : HEIGHT * 0.05,/* paddingTop: HEIGHT * 0.075, */ backgroundColor: colors.white, alignItems: "center", justifyContent: "space-between", ...headerStyle }]}>
                <View style={[commonStyle.alignItems(lang), { width: WIDTH * 0.27 }]} >
                    {leftComponent ? leftComponent : (showLeftIcon ? <Pressable
                        hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                        onPressOut={onPressLeftAction} style={{ justifyContent: "center", alignItems: "center", backgroundColor: colors.white, width: WIDTH * 0.1, height: WIDTH * 0.1, borderRadius: WIDTH * 0.03, ...leftComponentStyle }}>
                        <Image source={leftIcon ? leftIcon : leftArrow} style={[{ resizeMode: "contain", tintColor: colors.background, transform: [{ scaleX: lang == "ar" ? -1 : 1 }] }]} />
                    </Pressable> : <View />)}
                </View>
                {title && <View style={{ flex: 1, }}>
                    <Text numberOfLines={3} style={[commonStyle.fontBold(lang), { color: colors.textColorThree, fontSize: 22, textAlign: 'center', ...textStyle }]}>{context.t(title)}</Text></View>}
                <View style={[commonStyle.flexDirection(lang == "en" ? "ar" : "en"), { minWidth: WIDTH * 0.2, width: WIDTH * 0.27 }]} >
                    {
                        rightNavigationData?.map((item, index) => {
                            return (<Pressable
                                // hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}
                                onPress={item?.onPressRightAction}
                                style={[lang == "en" ? { marginLeft: WIDTH * 0.025 } : { marginRight: WIDTH * 0.025 }, commonStyle.flexDirection(lang), { justifyContent: "center", alignItems: "center", backgroundColor: colors.white, width: WIDTH * 0.1, height: WIDTH * 0.1, borderRadius: item.type == "round" ? WIDTH * 0.1 / 2 : WIDTH * 0.03, ...item.style }]}>
                                <Text numberOfLines={2} style={[commonStyle.fontMedium(lang), { color: colors.textColorFour, fontSize: 18, textAlign: 'center', ...item.labelStyle }]}>{context.t(item?.label)}</Text>

                                <Image source={item.icon} style={[{ resizeMode: "contain", transform: [{ scaleX: lang == "ar" ? -1 : 1 }] }]} />
                                {item?.mCount != undefined && item?.mCount != 0 && <View style={{ width: WIDTH * 0.03, height: WIDTH * 0.03, borderRadius: 10, backgroundColor: "red", position: "relative", marginBottom: 13, marginLeft: -7 }}>
                                    <Text style={{ color: "white", fontSize: 7, textAlign: "center" }}>{item?.mCount}</Text></View>}
                                {item?.requestsCount > 0 && <View style={[lang == 'en' ? { right: -WIDTH * 0.01 } : { left: -WIDTH * 0.01 }, { alignItems: 'center', justifyContent: 'center', height: WIDTH * 0.04, width: WIDTH * 0.04, borderRadius: WIDTH * 0.01, position: "absolute", backgroundColor: colors.background, top: -WIDTH * 0.01 }]}>
                                    <Text numberOfLines={2} style={[commonStyle.fontRegular(lang), { color: colors.white, fontSize: 12, textAlign: 'center', }]}>{item?.requestsCount || 0}</Text>
                                </View>}
                            </Pressable>)
                        })
                    }
                </View>
            </View>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white, ...childrenStyle }}>{children}</SafeAreaView>
        </View >
    )
}
MainContainer.contextTypes = {
    t: PropTypes.func
}

export default MainContainer

