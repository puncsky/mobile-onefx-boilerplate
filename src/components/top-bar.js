import {Image, StatusBar, View, Text} from 'react-native';
import {Constants} from "expo";
import React from "react";
import {colors} from "./colors";

export function TopBar() {
  return (
    <View>
      <StatusBar
        style={{
          backgroundColor: colors.primary,
          height: Constants.statusBarHeight,
        }}
        barStyle="light-content"
      />
      <View style={{
        backgroundColor: colors.primary,
        height: Constants.statusBarHeight,
      }}/>
      <View style={{
        backgroundColor: colors.primary,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{
          flex: 1, flexDirection: 'row', height: 50,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image
            style={{width: 32, height: 32}}
            source={require('../assets/images/icon.png')}
          />
          <Text style={{color: colors.white, fontSize: 18}}>Tian Pan's Notes</Text>
        </View>
      </View>
    </View>
  )
}
