import {ScrollView, StyleSheet} from 'react-native';
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
      <KeyboardFull>{children}</KeyboardFull>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
