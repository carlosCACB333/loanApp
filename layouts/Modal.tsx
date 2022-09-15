import * as React from 'react';
import {Modal as Mod, Portal, FAB, useTheme} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {globals} from '../styles';

interface Props {
  children: React.ReactNode;
  footer: (onClose: () => void) => JSX.Element;
  button?: (onOpen: () => void) => JSX.Element;
}
export const Modal = ({children, footer, button}: Props) => {
  const [visible, setVisible] = React.useState(false);
  const theme = useTheme();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = {
    backgroundColor: theme.colors.background,
  };

  return (
    <>
      {button ? (
        button(showModal)
      ) : (
        <FAB
          icon="plus"
          style={{...globals.fab, backgroundColor: theme.colors.primary}}
          onPress={showModal}
        />
      )}
      <Portal>
        <Mod
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            ...containerStyle,
            ...globals.modal,
            ...styles.modal,
          }}>
          {children}
          <View style={styles.footer}>{footer(hideModal)}</View>
        </Mod>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 20,
    width: '90%',
    alignSelf: 'center',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
