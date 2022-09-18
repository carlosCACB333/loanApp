import React from 'react';
import {ScrollView} from 'react-native';
import {Br} from '../../components';
import {LineLoan, PieLoan} from '../../components/Loan';

export const Dashboard = () => {
  return (
    <ScrollView>
      <PieLoan />
      <Br />
      <LineLoan />
    </ScrollView>
  );
};
