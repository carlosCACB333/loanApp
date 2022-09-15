import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {globals} from '../styles';
import {Br} from './Br';
interface Props {
  text?: string;
}

export const Loading = ({text}: Props) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <View
        style={{...globals.center, backgroundColor: theme.colors.background}}>
        <ActivityIndicator color={theme.colors.primary} />
        <Br />
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
