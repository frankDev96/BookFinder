import { View, Text, Image } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { avatar } from '../assets/images'

const FastImageComponent = (props) => {
    const { url, style, resizeMode = "cover", defaultSource = avatar } = props
    return (
        <View style={{}}>
            {!url && <Image source={defaultSource} resizeMode={resizeMode} style={{ position: "absolute", ...style, }} />}

            <FastImage
                source={url ? { uri: url } : defaultSource}
                defaultSource={defaultSource} resizeMode={resizeMode} style={{ ...style }} />

        </View>


    )
}

export default FastImageComponent