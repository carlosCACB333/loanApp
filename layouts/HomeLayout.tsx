import {View} from 'react-native';
import React from 'react';
import {globals} from '../styles';

interface Props {
  children: React.ReactNode;
}
export const HomeLayout = ({children}: Props) => {
  return <View style={globals.flex}>{children}</View>;
};
