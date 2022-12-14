import React, {useContext} from 'react';
import {Dimensions, ToastAndroid, ViewStyle} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useTheme} from 'react-native-paper';
import {useAppSelector} from '../../app/hooks';
import {getLoansAndPaymentsPerMonth} from '../../helpers/getStats';
import {AuthContext} from '../../context/AuthContext';
import {currency} from '../../utils/formats';
const MONTHS = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
];
const screenWidth = Dimensions.get('window').width - 16;
export const LineLoan = () => {
  const {contracts} = useAppSelector(state => state.loan);
  const {user} = useContext(AuthContext);
  const {colors} = useTheme();
  const {payables, receivables} = getLoansAndPaymentsPerMonth(
    contracts,
    user?._id!,
  );

  const chartStyle: Partial<ViewStyle> = {
    alignSelf: 'center',
    borderRadius: 20,
  };

  return (
    <>
      <LineChart
        data={{
          labels: MONTHS,
          datasets: [
            {
              data: receivables,
              color: () => colors.primary,
            },
            {
              data: payables,
              color: () => colors.secondary,
            },
          ],
          legend: ['Por cobrar', 'Por pagar'],
        }}
        width={screenWidth}
        height={300}
        verticalLabelRotation={30}
        chartConfig={{
          backgroundColor: colors.card,
          color: () => colors.text,
          useShadowColorFromDataset: true,
          decimalPlaces: 2,
          propsForDots: {
            r: 4,
            strokeWidth: 0,
          },
        }}
        withInnerLines={false}
        withOuterLines={false}
        bezier
        style={chartStyle}
        onDataPointClick={({value}) =>
          ToastAndroid.show('S/' + value, ToastAndroid.SHORT)
        }
        formatYLabel={value => currency(Number(value))}
        yLabelsOffset={-2}
        xLabelsOffset={-5}
      />
    </>
  );
};
