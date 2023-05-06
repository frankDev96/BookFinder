import React from 'react'
import { View, Text, Image, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty'
import MaskInput from 'react-native-mask-input';

import { colors } from "../constants/colors"
import { commonStyle } from "../constants/styles"
import { WIDTH, HEIGHT } from "../constants/dimensions"
import { logo, } from '../assets/images';

const CustomMaskedInput = (props, context) => {
    const { label, renderAccessoryImage, containerStyle, reference, value, onChangeText = () => { }, mask = [], maskInputStyle, maxLength, placeholderTextColor = colors.lightgrey, keyboardType, onSubmitEditing = () => { }, onFocus = () => { }, onBlur = () => { }, error, placeholder, returnKeyType, boxStyle } = props
    const { lang } = useSelector((state: LangReducer) => state.i18nState)

    return (
        <View style={{/*  height: HEIGHT * 0.07, marginBottom: HEIGHT * 0.045, */ ...containerStyle }} >
            <View style={[commonStyle.justifyContent(lang), commonStyle.flexDirection(lang), {}]}>
                {label && <Text style={[lang == "en" ? { marginRight: WIDTH * 0.01 } : { marginLeft: WIDTH * 0.01 }, commonStyle.fontMedium(), { fontSize: 15, color: colors.lightgrey, marginBottom: HEIGHT * 0.013 }]}>{label}</Text>}
            </View>
            <View style={[commonStyle.flexDirection(lang), {
                borderWidth: 1, height: HEIGHT * 0.05, paddingHorizontal: WIDTH * 0.05, alignItems: 'center', backgroundColor: colors.white, borderColor: colors.borderColor, borderRadius: HEIGHT * 0.01, ...boxStyle,
            }]}>
                <MaskInput
                    ref={reference}
                    value={value}
                    onChangeText={onChangeText}
                    mask={mask}
                    style={[/* commonStyle.fontRegular(), */ commonStyle.textAlign(lang), { color: colors.textColor, fontSize: 17, paddingHorizontal: WIDTH * 0.0, flex: 1, ...maskInputStyle }]}
                    maxLength={maxLength}
                    placeholder={context.t(placeholder)}
                    placeholderTextColor={placeholderTextColor}
                    keyboardType={keyboardType}
                    onSubmitEditing={onSubmitEditing}
                    returnKeyType={returnKeyType}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    blurOnSubmit={Platform.OS == "ios"}
                />
                {renderAccessoryImage && <Image source={logo} resizeMode="contain" style={[lang == "en" ? { marginLeft: WIDTH * 0.03 } : { marginLeft: WIDTH * 0.03 }]} />}
            </View>
            <View style={[lang == "en" ? { left: 0 } : { right: 0 }, { position: 'absolute', bottom: Platform.OS == "ios" ? -HEIGHT * 0.018 : -HEIGHT * 0.02 }]}>
                {
                    !isEmpty(error) && <Text style={[, commonStyle.textAlign(lang), commonStyle.fontRegular(lang), { color: colors.red, fontSize: 12, }]}>{error || ""}</Text>
                }
            </View>
        </View>
    )
}
CustomMaskedInput.contextTypes = {
    t: PropTypes.func
}
export default CustomMaskedInput