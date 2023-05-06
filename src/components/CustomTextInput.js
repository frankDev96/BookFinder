import React, { useState } from 'react'
import { View, Text, TextInput, Platform, Image, Pressable } from 'react-native'
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'

import { colors } from '../constants/colors';
import { WIDTH, HEIGHT } from '../constants/dimensions'
import { commonStyle } from '../constants/styles';
import { eyeIcon, eyeIconClose, dropDownArrow } from '../assets/images'
import PopUpModal from '../components/PopUpModal';

const CustomTextInput = (props, context) => {
    const { secureTextEntry = false, reference, value, label, onChangeText, error = "", maxLength, keyboardType = "default", placeholder, requiresLabel, multiline, onSubmitEditing = () => { }, editable = true, returnKeyType, inputStyle, boxStyle, containerStyle, fieldText, numberOfLines = 1, dropdownLabel, autoComplete, onFocus = () => { }, onBlur = () => { }, primaryIcon, secondaryIcon, toggleSecureEntry = false, type, onSelect = () => { }, countryCode, change, handleModal, modalType, disable = false, countryLabel, country, onClear = () => { }, showClearButton = false } = props
    const { lang } = useSelector((state) => state.i18nState)


    const inputHeight = multiline ? HEIGHT * 0.15 : HEIGHT * 0.05

    return (<View style={{ ...containerStyle }}>
        {(label || requiresLabel) && <View style={[commonStyle.flexDirection(lang), { marginBottom: HEIGHT * 0.012 }]}>
            {label ? <Text style={[commonStyle.fontRegular(lang), commonStyle.textAlign(lang), { fontSize: 15, color: colors.lightgrey }]}>{context.t(label)}</Text> : <View />}
            {requiresLabel ? <Text style={[commonStyle.fontRegular(lang), commonStyle.textAlign(lang), { fontSize: 15, color: colors.lightgrey, marginHorizontal: WIDTH * 0.01 }]}>{context.t(requiresLabel)}</Text> : <View />}
        </View>}
        <View style={[commonStyle.flexDirection(lang), {}]}>
            <View style={[commonStyle.flexDirection(lang), {
                minHeight: inputHeight, borderRadius: HEIGHT * 0.01, paddingHorizontal: WIDTH * 0.04, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.borderColor, ...boxStyle, flex: 1, alignItems: "center",
            }]}>
                {!value && dropdownLabel && <Text style={[commonStyle.fontRegular(lang), commonStyle.textAlign(lang), { alignSelf: 'center', fontSize: 17, color: `${colors.lightgrey}40` }]}>{context.t(dropdownLabel)}</Text>}

                {fieldText && <Text style={[commonStyle.fontRegular(lang), commonStyle.textAlign(lang), lang == "en" ? { marginRight: WIDTH * 0.02 } : { marginLeft: WIDTH * 0.02 }, { fontSize: 17, color: colors.textColor, alignSelf: 'center' }]}>{fieldText}</Text>}
                {primaryIcon && <Image source={primaryIcon} resizeMode="contain" style={[lang == "en" ? { marginRight: WIDTH * 0.025 } : { marginLeft: WIDTH * 0.025 }, { alignSelf: 'center' }]} />}

                <TextInput
                    ref={reference}
                    placeholder={context.t(placeholder)}
                    style={[commonStyle.textAlign(lang), commonStyle.fontRegular(lang), {
                        color: colors.textColor, fontSize: 17, flex: 1, paddingVertical: multiline ? HEIGHT * 0.01 : 0, borderWidth: 0, height: inputHeight, ...inputStyle,
                    }]}
                    numberOfLines={numberOfLines}
                    value={value}
                    editable={editable}
                    placeholderTextColor={`${colors.textColor}60`}
                    onChangeText={onChangeText}
                    maxLength={maxLength}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    secureTextEntry={secureTextEntry}
                    onSubmitEditing={onSubmitEditing}
                    returnKeyType={returnKeyType}
                    autoComplete={autoComplete}
                    blurOnSubmit={Platform.OS == "ios"}
                    autoFocus={false}
                    autoCapitalize="none"
                    onFocus={onFocus}
                    onBlur={onBlur}

                />
                {
                    secondaryIcon && <Image source={secondaryIcon} resizeMode="contain" style={{ alignSelf: 'center', }} />
                }
                {
                    showClearButton && <Pressable onPress={() => { onClear() }}
                        style={{ alignItems: 'center', justifyContent: "center", borderRadius: WIDTH * 0.1, borderWidth: 1, borderColor: `${colors.borderColor}80`, marginLeft: WIDTH * 0.02 }} >
                        <Text style={{ color: `${colors.textColor}`, paddingHorizontal: WIDTH * 0.02, paddingVertical: HEIGHT * 0.005 }} >{context.t('clear')}</Text>
                    </Pressable>
                }
            </View>
        </View>
        <View style={[lang == "en" ? { left: 0 } : { right: 0 }, { position: 'absolute', bottom: Platform.OS == "ios" ? -HEIGHT * 0.018 : -HEIGHT * 0.02 }]}>
            {
                !isEmpty(error) && <Text style={[commonStyle.textAlign(lang), commonStyle.fontRegular(lang), { color: colors.red, fontSize: 12, }]}>{error || ""}</Text>
            }
        </View>
    </View>
    )
}
CustomTextInput.contextTypes = {
    t: PropTypes.func
}
export default CustomTextInput