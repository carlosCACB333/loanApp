import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {KeyboardFull} from './KeyboardFull';

interface Props {
  children: React.ReactNode;
}
export const AuthLayout = ({children}: Props) => {
  return (
    <ScrollView
      contentContainerStyle={{
        ...styles.container,
      }}>
      <View style={styles.child}>
        <KeyboardFull>{children}</KeyboardFull>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  child: {
    maxWidth: '100%',
    minWidth: 220,
  },
});
