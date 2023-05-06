import { Pressable, Text, Image, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

import { WIDTH, HEIGHT } from './../constants/dimensions'
import { colors } from "./../constants/colors"
import { commonStyle } from "./../constants/styles"

const Button = ({ label, icon, onPress, style, textStyle, inverted = false, disabled = false, primaryIcon, iconStyle, leftIcon, primaryIconStyle }) => {
    const [{ lang },] = useSelector(state => [state.i18nState,]);
    return (
        <Pressable disabled={disabled} onPressOut={onPress} style={[inverted ? { backgroundColor: colors.red, borderColor: colors.black, } : { backgroundColor: colors.textColor, borderColor: `${colors.lightBlue}50` }, { borderWidth: 1, height: HEIGHT * 0.06, alignItems: "center", justifyContent: "center", borderRadius: WIDTH * 0.1, ...style }, commonStyle.flexDirection(lang)]}>
            {
                primaryIcon && <View style={[lang == "en" ? { marginRight: WIDTH * 0.02 } : { marginLeft: WIDTH * 0.02 }, { backgroundColor: colors.white, height: WIDTH * 0.06, width: WIDTH * 0.06, borderRadius: 100, alignItems: 'center', justifyContent: 'center', shadowColor: colors.lightgreyTwo, shadowOffset: { width: 0, height: 5 }, shadowRadius: 5, shadowOpacity: 1.6, elevation: 2, ...iconStyle, }]}>
                    <Image source={primaryIcon} resizeMode="contain" style={{ tintColor: colors.red, height: WIDTH * 0.025, width: WIDTH * 0.025, ...primaryIconStyle }} />
                </View>
            }
            {
                leftIcon && <View style={[lang == "en" ? { marginRight: WIDTH * 0.03 } : { marginLeft: WIDTH * 0.03 }, { backgroundColor: colors.backgroundTwo, alignItems: 'center', justifyContent: 'center', ...iconStyle }]}>
                    <Image source={leftIcon} resizeMode="contain" />
                </View>
            }

            <Text style={[commonStyle.fontBold(),  /* commonStyle.textAlign(lang), */ inverted ? { color: colors.darkBlue } : { color: colors.white }, { textAlign: "center", fontSize: 20, ...textStyle }]}>{label}</Text>
            {icon && <Image style={{ marginHorizontal: WIDTH * 0.03, transform: [{ scaleX: lang == "ar" ? -1 : 1 }] }} source={icon} />}

        </Pressable>
    )
}

Button.defaultProps = {
    label: "",
    onPress: () => { },
    inverted: false
}

export default Button