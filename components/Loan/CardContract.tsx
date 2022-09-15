import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme, Card, Chip, Paragraph, Badge} from 'react-native-paper';
import {IContract, IUser} from '../../interfaces';
import {LoanNavigatorProps} from '../../navigations/LoanStack';
import {globals} from '../../styles';
import {getOperationsStats} from '../../helpers/getStats';
import {dateFormat} from '../../utils/dateFormat';

interface Props {
  contract: IContract;
  isLender: boolean;
}
export const CardContract = ({isLender, contract}: Props) => {
  const theme = useTheme();
  const navigation = useNavigation<LoanNavigatorProps<'Loan'>>();
  const {status, total} = getOperationsStats(contract.operations, isLender);
  const statusColor =
    status === 'Debes'
      ? theme.colors.tertiary
      : status === 'Te debe'
      ? theme.colors.error
      : theme.colors.success;
  const lenyerColor = isLender ? theme.colors.primary : theme.colors.secondary;
  const activeColor =
    contract.status === 'active' ? theme.colors.success : theme.colors.error;
  return (
    <Card
      style={{
        backgroundColor: lenyerColor,
        ...globals.brrmd,
      }}>
      <Card.Content>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Detail', {
              id: contract._id,
              isLender,
            })
          }
          style={{...styles.card}}>
          <View style={styles.cardItem}>
            <Paragraph style={{color: theme.colors.text, ...globals.subTitle}}>
              {contract.name}
            </Paragraph>

            <Paragraph style={{color: theme.colors.text}}>
              {isLender
                ? 'Prestaste a ' +
                  (contract.borrower as IUser).firstName +
                  ' ' +
                  (contract.borrower as IUser).lastName
                : 'Te prestó ' +
                  (contract.lender as IUser).firstName +
                  ' ' +
                  (contract.lender as IUser).lastName}
            </Paragraph>
          </View>
          <View>
            <Badge
              style={{
                backgroundColor: activeColor,
                color: theme.colors.text,
                ...styles.badge,
              }}>
              {contract.status}
            </Badge>
            <Chip
              mode="outlined"
              style={{borderColor: statusColor, ...styles.trans}}>
              {status} S/{total < 0 ? total * -1 : total}
            </Chip>
            <Paragraph>{dateFormat(contract.createdAt)}</Paragraph>
          </View>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardItem: {
    flex: 1,
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    zIndex: 100,
    top: -10,
    right: -10,
  },
  trans: {
    backgroundColor: 'transparent',
  },
});
