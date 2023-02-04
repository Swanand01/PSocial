import React from "react";
import { Platform, StatusBar, SafeAreaView, StyleSheet, KeyboardAvoidingView } from "react-native";
import { COLORS } from "../COLORS";
import Constants from 'expo-constants';


function MainContainer({ children, hideKeyboard }) {
    return (Platform.OS === 'ios' ?
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={'padding'}
        >
            <SafeAreaView style={style.iosSafeArea}>
                {children}
            </SafeAreaView>
        </KeyboardAvoidingView>

        :
        <KeyboardAvoidingView
            style={style.androidSafeArea}
            behavior={'padding'}
        >
            {children}
        </KeyboardAvoidingView>
    )
}

const style = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        backgroundColor: COLORS.black,
        paddingTop: Constants.statusBarHeight,
    },
    iosSafeArea: {
        flex: 1,
        backgroundColor: COLORS.black
    }
})

export default MainContainer;