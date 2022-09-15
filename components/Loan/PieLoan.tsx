import {Dimensions, ViewStyle} from 'react-native';
import React, {useContext} from 'react';
import {useAppSelector} from '../../app/hooks';
import {getContractStats} from '../../helpers/getStats';
import {AuthContext} from '../../context/AuthContext';

import {PieChart} from 'react-native-chart-kit';
import {useTheme} from 'react-native-paper';

export const PieLoan = () => {
  const {contracts} = useAppSelector(state => state.loan);
  const {colors} = useTheme();
  const {user} = useContext(AuthContext);
  const stats = getContractStats(contracts, user?._id || '');
  const pieStyle: Partial<ViewStyle> = {
    marginVertical: 16,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignSelf: 'center',
    height: 120,
    justifyContent: 'center',
  };
  const data = [
    {
      name: 'Soles por pagar',
      lenght: stats.debt,
      color: colors.secondary,
      legendFontColor: colors.text,
    },
    {
      name: 'Soles por cobrar',
      lenght: stats.receivable,
      color: colors.primary,
      legendFontColor: colors.text,
    },
  ];
  return (
    <PieChart
      data={data}
      accessor="lenght"
      width={Dimensions.get('window').width - 16}
      height={100}
      chartConfig={{
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        height: 100,
      }}
      style={pieStyle}
      backgroundColor="transparent"
      absolute
      paddingLeft="0"
    />
  );
};
