import React, {useContext} from 'react';
import {Dimensions, ViewStyle} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useTheme} from 'react-native-paper';
import {useAppSelector} from '../../app/hooks';
import {getLoansAndPaymentsPerMonth} from '../../helpers/getStats';
import {AuthContext} from '../../context/AuthContext';

const screenWidth = Dimensions.get('window').width - 16;
export const LineLoan = () => {
  const {contracts} = useAppSelector(state => state.loan);
  const {user} = useContext(AuthContext);
  const {colors} = useTheme();
  const {lents, paids} = getLoansAndPaymentsPerMonth(contracts, user?._id!);

  const chartStyle: Partial<ViewStyle> = {
    alignSelf: 'center',
    borderRadius: 20,
  };

  return (
    <>
      <LineChart
        data={{
          labels: [
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
          ],
          datasets: [
            {
              data: lents,
              color: () => colors.primary,
            },
            {
              data: paids,
              color: () => colors.secondary,
            },
          ],
          legend: ['Mis prestamos', 'Mis pagos'],
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
      />
    </>
  );
};
