'use client'

import React, {useEffect} from 'react'


import {Provider, useDispatch, useSelector} from 'react-redux'

import { store } from "@/redux/store";

export default function ReduxProvider({ children }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
