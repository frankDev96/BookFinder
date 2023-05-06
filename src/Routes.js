
import React, { useEffect, useRef, useState } from 'react'
import { View, Platform, Pressable, Image, Linking, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack"
import { useDispatch, useSelector } from 'react-redux';
import Animated, { useSharedValue, withTiming, Easing, useAnimatedStyle, withDelay, useAnimatedGestureHandler, runOnJS, withSpring, interpolateColor } from 'react-native-reanimated';
import { State, TapGestureHandler } from 'react-native-gesture-handler';

import { SplashScreen, HomeScreen,FavoriteScreen } from './screens'
import { WIDTH, HEIGHT } from './constants/dimensions'
import { colors } from './constants/colors'
import { notifications, plus, announcements, fullHeart, homeIcon } from './assets/images'
import { formAction, commonAction } from './redux/actions'
import { store } from "../App"
import { commonStyle } from './constants/styles'
import { navigationRef } from './routeNavigation';


const RoutesStack = createStackNavigator()
const Tab = createBottomTabNavigator()
const tabsData = {
    HomeScreen: homeIcon,
    FavoriteScreen: fullHeart,
    
}

const CustomTab = (props,) => {
    const doubleTapRef = useRef(null);
    const { state, navigation, } = props
    const dispatch = useDispatch()
    const bottomTabAnimation = useSharedValue(1)
    const [{ lang }, ] = useSelector((state) => [state.i18nState, state.commonReducer])
    //const bottomTabAnimationActive = useSharedValue(0)
    // const [renders, setRenders] = useState(false)

    // const animatedBottomTabStyle = useAnimatedStyle(() => {
    //     return {
    //         transform: [{ scale: withSpring(bottomTabAnimation.value) }],
    //         opacity: withSpring(bottomTabAnimation.value),
    //         backgroundColor: interpolateColor(
    //             bottomTabAnimation.value,
    //             [0, 0.5, 1],
    //             ["transparent", "#000050", "black"]
    //         )
    //     };
    // });
    // const animatedBottomTabStyleActive = useAnimatedStyle(() => {
    //     return {
    //         transform: [{ scale: withSpring(bottomTabAnimationActive.value) }],
    //         opacity: withSpring(bottomTabAnimationActive.value),
    //         // backgroundColor: interpolateColor(
    //         //     bottomTabAnimation.value,
    //         //     [0, 0.5, 1],
    //         //     ["black", "#000050", "transparent"]
    //         // )
    //     };
    // });

    // useEffect(() => {
    //     setRenders(true)
    // }, [])
    // useEffect(() => {
    //     if (renders) {

    //         bottomTabAnimation.value = withDelay(500, withTiming(1, { duration: 1000, easing: Easing.bounce }))
    //         bottomTabAnimationActive.value = withDelay(500, withTiming(1, { duration: 1000, easing: Easing.bounce }))
    //     }
    // }, [state.index])

    const finishAnimation = async (route) => {
        navigation.navigate({ name: route.name, merge: true })
    }
    const onDoubleTapEvent = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            // dispatch(commonAction.handleReload(!reloadValue))
        }
    };
    const onPress = (route, isFocused, playAnimation) => {
        console.log("CKLLL");
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });
        //  dispatch(commonAction.handleReload(!reloadValue))
        if (!event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true })
        }
        if (route?.name == "JoinDetailScreen") {
            dispatch(formAction.setJoinDetails({}))
        }
    };

    const onLongPress = (route) => {
        navigation.emit({
            type: 'tabLongPress',
            target: route.key,
        });
    };
    return <View style={{ height: HEIGHT * 0.08, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        {
            state?.routes?.map((route, index) => {
                const isFocused = state.index === index;
                if (route?.name == "JoinDetailScreen") {
                    return <Pressable style={{ height: WIDTH * 0.12, alignItems: "center" }}
                        onPress={() => onPress(route, isFocused, false)} onLongPress={() => onLongPress(route)}>
                        <View style={{ width: WIDTH * 0.1, height: WIDTH * 0.1, marginHorizontal: WIDTH * 0.02, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background, borderRadius: WIDTH * 0.025, shadowColor: colors.background, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 7 }, elevation: 2, shadowRadius: 5 }}>
                            <Image source={plus} resizeMode="contain" style={{ width: WIDTH * 0.04, height: WIDTH * 0.04, }} />
                        </View>
                        <View style={{ height: HEIGHT * 0.02, marginHorizontal: WIDTH * 0.05, alignItems: 'center' }} >
                            {isFocused && <View style={{ backgroundColor: colors.background, height: HEIGHT * 0.005, borderRadius: HEIGHT * 0.008, width: WIDTH * 0.025, marginTop: WIDTH * 0.015 }} />}
                        </View>
                    </Pressable>
                } else {
                    return <Pressable style={{ alignItems: "center" }}
                        hitSlop={{ top: WIDTH * 0.03, bottom: WIDTH * 0.03, left: WIDTH * 0.03, right: WIDTH * 0.03 }}
                        onPress={() => onPress(route, isFocused, true)} onLongPress={() => onLongPress(route)}>
                        <View style={{ height: WIDTH * 0.12, justifyContent: "flex-end" }}>
                            <Animated.View style={[{ width: WIDTH * 0.08, height: WIDTH * 0.08, borderRadius: WIDTH * 0.04, position: "absolute", backgroundColor: isFocused ? colors.black : "transparent", alignSelf: "center" }, /* renders ? (isFocused ? animatedBottomTabStyle : animatedBottomTabStyleActive) : { backgroundColor: colors.black } */,]} />
                            <TapGestureHandler
                                ref={doubleTapRef}
                                onHandlerStateChange={onDoubleTapEvent}
                                numberOfTaps={2}>
                                <View
                                    style={[isFocused ? {} : { backgroundColor: "white" }, { width: WIDTH * 0.08, height: WIDTH * 0.08, marginHorizontal: WIDTH * 0.02, alignItems: 'center', justifyContent: 'center', borderRadius: WIDTH * 0.04 }]}>
                                    <Animated.Image source={tabsData[route?.name]} resizeMode="contain" style={[{ tintColor: isFocused ? colors.white : colors.lightgreyTwo }]} />
                                    {(route?.name === "NotificationScreen" && userData?.notification_count > 0) && (<View style={[lang == "en" ? { right: -WIDTH * 0.01 } : { left: -WIDTH * 0.01 }, { height: WIDTH * 0.05, width: WIDTH * 0.05, borderRadius: WIDTH * 0.05 / 2, backgroundColor: colors.background, position: "absolute", alignItems: "center", justifyContent: "center", top: -WIDTH * 0.012 }]} >
                                        <Text style={[commonStyle.fontRegular(lang), { color: colors.white, fontSize: 8, textAlign: 'center' }]}>{userData?.notification_count}</Text>
                                    </View>)}
                                </View>
                            </TapGestureHandler>
                        </View>
                        <View style={{ height: HEIGHT * 0.03, width: WIDTH * 0.04, marginHorizontal: WIDTH * 0.05, alignItems: 'center' }} >
                            {isFocused && <View style={{ backgroundColor: colors.background, height: HEIGHT * 0.005, borderRadius: HEIGHT * 0.008, width: WIDTH * 0.025, marginTop: WIDTH * 0.015 }} />}
                        </View>
                    </Pressable>
                }
            })
        }
    </View >
}
const TabScreens = () => {
    const { codePush } = useSelector(state => state.commonReducer)
    return (
        <Tab.Navigator  screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
        }}
        backBehavior="history"
        initialRouteName={'HomeScreen'}
        tabBar={(props) => {
            const { state, navigation } = props
            return <View style={{ height: Platform.OS === "ios" ? HEIGHT * 0.1 : HEIGHT * 0.08, backgroundColor: colors.white, shadowColor: colors.textColorFour, shadowOffset: { height: -4, width: 0 }, shadowRadius: HEIGHT * 0.018, shadowOpacity: 0.1, elevation: 2, paddingHorizontal: WIDTH * 0.03, }} >
                <CustomTab state={state} navigation={navigation} />
            </View >
        }}>
            <Tab.Screen name="HomeScreen" component={HomeScreen} />
            <Tab.Screen name="FavoriteScreen" component={FavoriteScreen} />

        </Tab.Navigator>
    )
}
const Routes = () => {
    const { codePush } = useSelector(state => state.commonReducer)
    return (
        <NavigationContainer ref={navigationRef}>
            <RoutesStack.Navigator initialRouteName='SplashScreen' screenOptions={{
                headerShown: false, gestureEnabled: false, cardStyleInterpolator: ({ current: { progress } }) => {
                    return { cardStyle: { opacity: progress, }, };
                }, transitionSpec: { open: { animation: 'timing', config: { duration: 500 } }, close: { animation: 'timing', config: { duration: 500 } }, },
            }} >
                <RoutesStack.Screen name="SplashScreen" component={SplashScreen} />
                <RoutesStack.Screen name="TabScreens" component={TabScreens} />

            </RoutesStack.Navigator>
        </NavigationContainer>
    )
}
export default Routes