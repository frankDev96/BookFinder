import React from 'react'
import { View, Text, Image } from 'react-native'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { colors } from "../constants/colors"
import { commonStyle } from "../constants/styles"
import { WIDTH, HEIGHT } from "../constants/dimensions"
import { emptyListImage, emptyImage } from '../assets/images'

const EmptyComponent = (props, context) => {
    const { containerStyle, description } = props
    const [{ loading }, { lang }] = useSelector((state) => [state.commonReducer, state.i18nState]);
    return (
        loading ? <View /> :
            <View style={{
                alignItems: "center", width: WIDTH - WIDTH * 0.1, alignSelf: "center", justifyContent: 'center', height: HEIGHT * 0.7, alignContent: 'center', ...containerStyle
            }}>
                <Image source={emptyImage} resizeMode="contain" style={{ width: WIDTH * 0.225, height: HEIGHT * 0.132 }} />
                <Text style={[commonStyle.fontMedium(lang), { fontSize: 20, color: colors.textColorFour, textAlign: "center", marginTop: HEIGHT * 0.04 }]}>{context.t("empty_state")}</Text>
                <Text style={[commonStyle.fontRegular(lang), { fontSize: 17, color: `${colors.textColorFour}60`, textAlign: "center", marginTop: HEIGHT * 0.01, marginHorizontal: WIDTH * 0.05 }]}>{description ? context.t(description) : "Lorem ipsum dolor sit amet consete sadipscing elitr, sed"}</Text>
            </View>
    )
}
EmptyComponent.contextTypes = {
    t: PropTypes.func
}
export default EmptyComponent