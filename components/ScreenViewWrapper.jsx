import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions, StyleSheet, View } from 'react-native';
import React from 'react';

const screenHeight = Dimensions.get('window').height;
const SCREEN_PADDING_TOP = 20;

export default function ScreenViewWrapper({ children, ...props }) {
  const childrenNodes = React.Children.map(children, children=>children);
  const insert = useSafeAreaInsets();
  const screenViewHeight = screenHeight - insert.top - SCREEN_PADDING_TOP;
    return (
      <SafeAreaView {...props}>
        <View style={
          styles.container({screenViewHeight})
        }>{childrenNodes}</View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
   container: ({ screenViewHeight }) => ({
    height: screenViewHeight, 
    paddingTop: SCREEN_PADDING_TOP,
    paddingHorizontal: 20,
  }),
});