import React, { useEffect, useRef } from 'react'
import { View, Pressable, Animated, Easing, Platform, Modal, KeyboardAvoidingView } from 'react-native'
import PropTypes from 'prop-types';
import GestureRecognizer from "react-native-swipe-detect";

import { colors } from '../constants/colors'
import { WIDTH, HEIGHT } from '../constants/dimensions';

const PopUpModal = (props, context) => {
    const { isVisible: { show, type }, closeModal, children } = props;
    const animationValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (show) {
            startAnimation(show ? 1 : 0)
        }
    }, [show])

    const startAnimation = (toValue) => {
        try {
            animationValue.setValue(toValue == 0 ? 1 : 0)
            Animated.timing(animationValue, {
                toValue,
                easing: Easing.ease,
                duration: 500,
                useNativeDriver: false
            }).start(({ finished }) => {
                if (toValue == 0 && finished) {
                    closeModal({ show: false, type })
                }
            }
            )
        } catch (error) {
            console.log(error);
        }
    }
    const backgroundColor = animationValue.interpolate({
        inputRange: [0.05, 0.2],
        outputRange: ["rgba(0,0,0,0.0)", "rgba(0,0,0,0.2)"],
        extrapolate: "clamp"
    })
    const top = animationValue.interpolate({
        inputRange: [0, 0.05],
        outputRange: [HEIGHT * 1.1, 0],
        extrapolate: "clamp"
    })
    const marginTop = animationValue.interpolate({
        inputRange: [0.2, 1],
        outputRange: [HEIGHT, 0],
        extrapolate: "clamp"
    })

    return (
        <Modal
            visible={show}
            transparent={true}
            animationType={"fade"}
            statusBarTranslucent
            onRequestClose={() => { startAnimation(0) }}
            style={{ flex: 1 }}
        >
            <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
                <Animated.View style={{ height: "100%", width: "100%", position: 'absolute', top, backgroundColor }} >
                    <Pressable onPress={() => { startAnimation(0) }} style={{ flex: 1, width: WIDTH, }}>
                    </Pressable>
                    <Animated.View style={[Platform.OS === 'android' ? { marginBottom: 0/* -HEIGHT * 0.055 */ } : {}, { backgroundColor: colors.white, width: WIDTH, borderTopRightRadius: WIDTH * 0.05, borderTopLeftRadius: WIDTH * 0.05, shadowRadius: 32, shadowOffset: { width: 0, height: 5 }, shadowColor: colors.black, shadowOpacity: 0.14, marginTop, maxHeight: HEIGHT * 0.9 },]} >
                        {/* <GestureRecognizer
                            onSwipeDown={() => startAnimation(0)}
                            config={{
                                velocityThreshold: 0.3,
                            }}
                        > */}
                            <View>
                                <View style={{ height: 5, backgroundColor: `${colors.lightBackground}40`, borderRadius: WIDTH * 0.1, width: WIDTH * 0.2, alignSelf: 'center', marginTop: HEIGHT * 0.015 }} />
                                {
                                    children
                                }
                            </View>
                        {/* </GestureRecognizer> */}

                    </Animated.View>
                </Animated.View >
            </KeyboardAvoidingView>
        </Modal>
    )
}

PopUpModal.contextTypes = {
    t: PropTypes.func
}
export default PopUpModal