import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';

interface Props {
  children: React.ReactNode;
}
export const HomeLayout = ({children}: Props) => {
  return (
    <ScrollView
      contentContainerStyle={{
        ...styles.container,
      }}>
      <View style={styles.child}>{children}</View>
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
