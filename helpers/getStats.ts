import {IContract, IOperation} from '../interfaces';

export const getOperationsStats = (
  operations: IOperation[],
  isLender: boolean,
) => {
  const total = operations.reduce((acc, curr) => {
    const amount =
      acc + (curr.type === 'loan' ? curr.amount : -1 * curr.amount);
    return amount;
  }, 0);

  const status =
    (total > 0 && isLender) || (total < 0 && !isLender)
      ? 'Te debe'
      : (total < 0 && isLender) || (total > 0 && !isLender)
      ? 'Debes'
      : 'Estás al día';

  return {
    total,
    status,
  };
};

export const getContractStats = (contracts: IContract[], uid: string) => {
  return contracts.reduce(
    (acc, item) => {
      const {status, total} = getOperationsStats(
        item.operations,
        uid === (item.lender as any)._id,
      );

      if (status === 'Debes') {
        acc.debt += total;
      } else {
        acc.receivable += total;
      }
      return acc;
    },
    {debt: 0, receivable: 0},
  );
};

interface Stat {
  receivables: number[];
  payables: number[];
}

export const getLoansAndPaymentsPerMonth = (
  contracts: IContract[],
  uid: string,
) => {
  const stats: Stat = {
    receivables: new Array(12).fill(0),
    payables: new Array(12).fill(0),
  };

  contracts.forEach(contract => {
    const isLender = uid === (contract.lender as any)._id;

    contract.operations.forEach(operation => {
      const month = new Date(operation.createdAt).getMonth();

      if (isLender) {
        stats.receivables[month] +=
          operation.type === 'loan' ? operation.amount : -1 * operation.amount;
      } else {
        stats.payables[month] +=
          operation.type === 'loan' ? operation.amount : -1 * operation.amount;
      }
    });
  });

  return stats;
};
