import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import {globals} from '../styles';
interface Props {
  children: React.ReactNode;
}
export const KeyboardFull = ({children}: Props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{...globals.flex, ...globals.centerV}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>{children}</>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
