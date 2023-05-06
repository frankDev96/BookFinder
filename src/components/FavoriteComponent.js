import React, { useRef } from 'react'
import { Pressable } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types';
import Animated, { useSharedValue, useAnimatedStyle, Easing, useDerivedValue, interpolate, Extrapolate, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import { WIDTH, HEIGHT } from "../constants/dimensions"
import { fullHeart, heartOuter, } from '../assets/images';
import { commonAction, } from "../redux/actions"

const FavoriteComponent = (props, context) => {
    const dispatch = useDispatch();
    const { wishlist_status, onPressAction = () => { }, style } = props
    const navigation = useNavigation()
    const animationValue = useSharedValue(0)
    const scaleAnimation = useSharedValue(1);

    const growingViewStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                scale: withTiming(scaleAnimation.value, {
                    duration: 200
                }, () => {
                    scaleAnimation.value = 0.99
                })
            }]

        };
    });

    const startAnimation = (toValue) => {
        toValue === 0 ? 1 : 0
        animationValue.value = toValue
        scaleAnimation.value = withTiming(2, { duration: 500 })
        setTimeout(() => {
            onPressAction()
        }, 1000);
    }
    const scale = useDerivedValue(() => {
        return interpolate(animationValue.value,
            [0, 0.5, 1],
            [1, wishlist_status > 0 ? 3 : 2, 1],
            Extrapolate.CLAMP
        )
    })
    const scaleStyle = useDerivedValue(() => {
        return {
            transform: [{
                scale: withTiming(scale.value, {
                    duration: 1000,
                    easing: Easing.bounce
                })
            }]
        }
    })


    return (
        <Pressable onPress={() => { startAnimation() }} style={{ alignItems: 'center', justifyContent: "center", backgroundColor: "#262F5510", height: WIDTH * 0.07, width: WIDTH * 0.07, borderRadius: WIDTH * 1, ...style }}  >
            <Animated.Image resizeMode="contain" source={wishlist_status > 0 ? fullHeart : heartOuter} style={[growingViewStyle, {}]} />
        </Pressable>
    )
}
FavoriteComponent.contextTypes = {
    t: PropTypes.func
}
export default FavoriteComponent
