import React, { Component } from 'react'
import { Platform, NativeModules } from 'react-native'
import { Provider } from 'react-redux'
import I18n from "redux-i18n"

import Routes from './src/Routes'
import configureStore from './src/redux/store';
import translations from './src/constants/translations'
import Loader from './src/components/Loader'

const store = configureStore()

const App = () => {
  return (
    <Provider store={store} >
      <I18n translations={translations} initialLang={"en"} >
        <Routes />
        <Loader />
      </I18n>
    </Provider>
  )
}

export { App, store }