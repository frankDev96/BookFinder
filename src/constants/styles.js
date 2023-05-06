import { StyleSheet, Platform } from "react-native"

const commonStyle = StyleSheet.create({
    fontBold: (lang) => {
        return { fontFamily: Platform.OS == "ios" ? "ProximaNova-Extrabld" : "ProximaNova-Extrabld" }
    },
    fontMedium: (lang) => {
        return { fontFamily: "ProximaNova-Bold" }
    },
    fontRegular: (lang) => {
        return { fontFamily: "ProximaNova-Semibold" }
    },

    justifyContent: (lang) => {
        return { alignSelf: `flex-${lang == "en" ? "start" : "end"}` }
    },
    flexDirection: (lang) => {
        return { flexDirection: `row${lang == "en" ? "" : "-reverse"}` }
    },
    textAlign: (lang) => {
        return { textAlign: `${lang == "en" ? "left" : "right"}` }
    },
    alignItems: (lang) => {
        return { alignItems: `flex-${lang == "en" ? "start" : "end"}` }
    },
    alignSelf: (lang) => {
        return { alignSelf: `flex-${lang == "en" ? "start" : "end"}` }
    },

})

export { commonStyle }