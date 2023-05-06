import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import has from 'lodash/has'
import RenderHtml, { HTMLElementModel, HTMLContentModel, defaultSystemFonts } from 'react-native-render-html'

import { HEIGHT, WIDTH } from '../constants/dimensions';
import FastImageComponent from './FastImageComponent';
import { placeholderImage } from '../assets/images';
import { commonStyle } from '../constants/styles';
import { colors } from '../constants/colors';
import { commonAction } from '../redux/actions';
import FavoriteComponent from '../components/FavoriteComponent'
import { BOOK_LIST } from '../constants/constants';
import PopUpModal from './PopUpModal';
import { url, urlEndPoints } from '../http/apiConfig';
import { networkApi } from '../http/api';
import { ScrollView } from 'react-native-gesture-handler';

const BooksListRenderItem = (props, context) => {
    const { volumeInfo: { title, subtitle, authors, imageLinks }, wishlist_status, id } = props
    const [{ lang }, { favorites_list, booksList }] = useSelector((state) => [state.i18nState, state.commonReducer])
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState({ show: false, type: '' })


    const favoriteAction = (data) => {
        let dataArray = [...favorites_list]
        let filterRedArray = dataArray?.filter(item => item?.id == data?.id)

        if (filterRedArray?.length == 0) {
            let filterBookList = booksList?.map(item => {
                if (item?.id == data?.id) {
                    let data = item
                    data['wishlist_status'] = 1
                }
                return data
            })
            dataArray.push({ ...data, wishlist_status: 1 })
            dispatch({
                type: BOOK_LIST,
                payload: [...booksList, ...filterBookList]
            })
        }
        else {
            let filterBookList = booksList?.map(item => {
                if (item?.id == data?.id) {
                    let data = item
                    data['wishlist_status'] = 0
                }
                return data
            })
            let findIndex = dataArray?.findIndex(item => item?.id == data?.id)
            dataArray.splice(findIndex, 1)
            dispatch({
                type: BOOK_LIST,
                payload: [...booksList, ...filterBookList]
            })
        }
        dispatch(commonAction.storeFavorites(dataArray))
    }
    const getBookDetails = async (id) => {
        try {
            dispatch(commonAction.handleLoader(true))
            const apiUrl = `${url.apiUrl}${urlEndPoints.searchBooks({ id })}`
            console.log("apiUrl", apiUrl);
            const response = await networkApi(apiUrl)
            dispatch(commonAction.handleLoader(false))
            console.log("response___DD", response.kind, response);
            if (has(response, "kind")) {
                setShowModal({ show: true, type: "menu", data: response })
            }

        } catch (error) {
            dispatch(commonAction.handleLoader(false))
            console.log("error_details", error);
        }
    }
    const ParagraphRenderer = ({ TDefaultRenderer, textProps, ...props }) => {
        return (
            <TDefaultRenderer
                {...props}
                textProps={{ ...textProps }}
            />
        )
    }
    const renderers = {
        div: ParagraphRenderer
    }
    const defaultTextProps = {
        numberOfLines: 3
    }
    const tagsStyles = {
        div: { ...commonStyle.textAlign(lang), color: colors.lightBlack },
        p: { margin: 0, color: colors.lightBlack, fontSize: 14, ...commonStyle.fontRegular(), }
    }
    const systemFonts = [...defaultSystemFonts, 'ProximaNova-Regular']

    return (<>
        <Pressable onPress={() => { getBookDetails(id) }} style={{ borderWidth: 1, marginHorizontal: WIDTH * 0.05, width: WIDTH * 0.9, marginBottom: HEIGHT * 0.01, flexDirection: 'row', borderRadius: WIDTH * 0.02, padding: WIDTH * 0.02, borderColor: `${colors.borderColor}` }}>
            <View style={{ height: HEIGHT * 0.2, width: WIDTH * 0.3, borderRadius: WIDTH * 0.02, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginRight: WIDTH * 0.02, borderColor: `${colors.borderColor}`, borderWidth: 1 }}>
                <FastImageComponent resizeMode={"contain"} defaultSource={placeholderImage} url={imageLinks?.smallThumbnail} style={{ height: HEIGHT * 0.2, width: WIDTH * 0.3, borderRadius: WIDTH * 0.02 }} />
            </View>
            <View style={{ flex: 1, }}>
                <View style={{ flex: 1 }} >
                    <Text numberOfLines={5} style={[commonStyle.fontBold(lang), commonStyle.textAlign(lang), { fontSize: 18, color: colors.lightgrey }]}>{title}</Text>
                    <Text numberOfLines={2} style={[commonStyle.fontRegular(lang), commonStyle.textAlign(lang), { fontSize: 12, color: colors.lightgrey, marginTop: HEIGHT * 0.005 }]}>{subtitle}</Text>
                </View>

                <Text numberOfLines={2} style={[commonStyle.fontRegular(lang), commonStyle.textAlign(lang), { fontSize: 15, color: colors.lightgrey }]}>{context.t("author")}{": "}<Text numberOfLines={2} style={[commonStyle.fontRegular(lang), commonStyle.textAlign(lang), { fontSize: 15, color: colors.lightgrey }]}>{authors?.[0]}</Text></Text>
            </View>
            <Pressable onPress={() => { }} style={{}} >
                <FavoriteComponent wishlist_status={wishlist_status} onPressAction={() => favoriteAction(props)} />
            </Pressable>
        </Pressable>
        <PopUpModal
            isVisible={showModal}
            closeModal={setShowModal}
        >
            <View style={{ backgroundColor: colors.white, borderTopRightRadius: WIDTH * 0.03, borderTopLeftRadius: WIDTH * 0.03, minHeight: HEIGHT * 0.2, paddingHorizontal: WIDTH * 0.05, paddingBottom: HEIGHT * 0.05 }} >
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={{ height: HEIGHT * 0.4, width: WIDTH * 0.9, borderRadius: WIDTH * 0.02, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginRight: WIDTH * 0.02, borderColor: `${colors.borderColor}`, borderWidth: 1, marginTop: HEIGHT * 0.02 }}>
                        <FastImageComponent resizeMode={"contain"} defaultSource={placeholderImage} url={showModal?.data?.imageLinks?.smallThumbnail} style={{ height: HEIGHT * 0.4, width: WIDTH * 0.9, borderRadius: WIDTH * 0.02 }} />
                    </View>
                    <View style={{ flex: 1, marginTop: HEIGHT * 0.02 }}>
                        <Text style={[commonStyle.fontBold(lang), commonStyle.textAlign(lang), { fontSize: 18, color: colors.lightgrey }]}>{showModal?.data?.volumeInfo?.title}</Text>
                        <Text style={[commonStyle.fontRegular(lang), commonStyle.textAlign(lang), { fontSize: 12, color: colors.lightgrey, marginTop: HEIGHT * 0.005 }]}>{showModal?.data?.volumeInfo?.subtitle}</Text>
                    </View>
                    <View style={[commonStyle.flexDirection(lang), { alignItems: 'center', justifyContent: 'space-between' }]}>
                        <Text style={[commonStyle.fontRegular(lang), commonStyle.textAlign(lang), { fontSize: 15, color: colors.lightgrey, marginTop: HEIGHT * 0.01 }]}>{context.t("author")}{": "}<Text numberOfLines={2} style={[commonStyle.fontRegular(lang), commonStyle.textAlign(lang), { fontSize: 15, color: colors.lightgrey, }]}>{showModal?.data?.volumeInfo?.authors?.[0]}</Text></Text>
                        <Pressable onPress={() => { }} style={{}} >
                            <FavoriteComponent wishlist_status={wishlist_status} onPressAction={() => favoriteAction(props)} />
                        </Pressable>
                    </View>
                    {showModal?.data?.volumeInfo?.publishedDate && <Text style={[commonStyle.fontRegular(lang), commonStyle.textAlign(lang), { fontSize: 15, color: colors.lightgrey, marginTop: HEIGHT * 0.01 }]}>{context.t("published")}{": "}<Text numberOfLines={2} style={[commonStyle.fontRegular(lang), commonStyle.textAlign(lang), { fontSize: 15, color: colors.lightgrey, }]}>{showModal?.data?.volumeInfo?.publishedDate}</Text></Text>}
                    {showModal?.data?.volumeInfo?.publisher && <Text style={[commonStyle.fontRegular(lang), commonStyle.textAlign(lang), { fontSize: 15, color: colors.lightgrey, marginVertical: HEIGHT * 0.01 }]}>{context.t("publisher")}{": "}<Text numberOfLines={2} style={[commonStyle.fontRegular(lang), commonStyle.textAlign(lang), { fontSize: 15, color: colors.lightgrey, }]}>{showModal?.data?.volumeInfo?.publisher}</Text></Text>}
                    {/* <Text style={[commonStyle.fontRegular(lang), commonStyle.textAlign(lang), { fontSize: 12, color: colors.lightgrey, marginTop: HEIGHT * 0.01`` }]}>{showModal?.data?.volumeInfo?.description}</Text> */}
                    <RenderHtml
                        tagsStyles={tagsStyles}
                        contentWidth={WIDTH}
                        source={{ html: showModal?.data?.volumeInfo?.description }}
                        defaultTextProps={defaultTextProps}
                        renderers={renderers}
                        systemFonts={systemFonts}
                    />


                </ScrollView>
            </View>

        </PopUpModal>
    </>
    )
}
BooksListRenderItem.contextTypes = {
    t: PropTypes.func
}
export default BooksListRenderItem