import React, { useEffect, useRef } from "react"
import { Modal, View, ActivityIndicator, } from "react-native"
import { useSelector, } from "react-redux"

import { colors } from "../constants/colors"

const Loader = ({ loadingWebview }) => {
    const { loading } = useSelector(state => state.commonReducer)

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            statusBarTranslucent
            visible={loadingWebview || loading}
            onRequestClose={() => { console.log('close modal') }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', backgroundColor: "#00000030" }}>
                <ActivityIndicator
                    size="large"
                    color={colors.white}
                    animating={true} />
            </View>
        </Modal>
    )
}
export default Loader