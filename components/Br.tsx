import {View} from 'react-native';
import React from 'react';

export const Br = ({size = 8}: {size?: number}) => {
  return (
    <View
      style={{
        margin: size,
      }}
    />
  );
};
