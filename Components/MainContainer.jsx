import React from "react";
import { Platform, StatusBar, SafeAreaView, StyleSheet, KeyboardAvoidingView } from "react-native";
import { COLORS } from "../COLORS";

function MainContainer({ children, hideKeyboard }) {
    return (Platform.OS === 'ios' ?
        <SafeAreaView>{children}</SafeAreaView>
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
        paddingTop: StatusBar.currentHeight,
    }
})

export default MainContainer;