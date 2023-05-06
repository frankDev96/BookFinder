
import isEmpty from "lodash/isEmpty"
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios"

import { store } from "../../App"

const debug = true

async function networkApi(url, method = 'GET', body = {}, headers = {}, isHtmlResponse = false) {
    const { lang } = store?.getState()?.i18nState
    const { token } = store?.getState()?.commonReducer

    const headerParam = {
        Accept: "application/json",
        'Content-Type': 'multipart/form-data',
        ...headers
    }
    // console.log("url==>", url);
    // console.log("method==>", method);
    // console.log("body==>", body);
    // console.log("headers==>", headers);
    if (token)
        headerParam["Authorization"] = `Bearer ${token}`
    return new Promise(async function (resolve, reject) {
        try {
            const resBody = {
                method,
                url,
                headers: headerParam,
                //  data: body || {}
            }
            if (!isEmpty(body)) {
                resBody.data = body
            }
            // if (method.toUpperCase() != "GET")
            //     resBody.data = body

            // debug && console.log("resBody==>", JSON.stringify(resBody));
            let response = await axios(resBody);

            // debug && console.log("123123123", JSON.stringify(response.data))
            if (response.status === 401) {
                await AsyncStorage.removeItem("access_token")
            } else {

                console.log("response---", JSON.stringify(response));
                const responseJSON = response
                if (responseJSON) {
                    resolve(responseJSON.data)
                } else {
                    if (responseJSON && responseJSON.message) {
                        reject(responseJSON.message)
                    } else if (responseJSON) {
                        reject(responseJSON)
                    }
                }
            }

        } catch (error) {
            debug && console.log(`error APi: ${error}} `, JSON.stringify(error))
            reject(error)
        }
    });
}


let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params) {
    _navigator.dispatch(
        CommonActions.navigate({
            routeName,
            params,
        })
    );
}


export {
    networkApi,
    navigate,
    setTopLevelNavigator,

}
