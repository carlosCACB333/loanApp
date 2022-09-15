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
  lents: number[];
  paids: number[];
}

export const getLoansAndPaymentsPerMonth = (
  contracts: IContract[],
  uid: string,
) => {
  const stats: Stat = {
    lents: new Array(12).fill(0),
    paids: new Array(12).fill(0),
  };

  contracts.forEach(contract => {
    const isLender = uid === (contract.lender as any)._id;

    contract.operations.forEach(operation => {
      const month = new Date(operation.createdAt).getMonth();
      console.log(operation.type);

      if (isLender) {
        if (operation.type === 'loan') {
          stats.lents[month] += operation.amount;
        }
      } else {
        if (operation.type === 'payment') {
          stats.paids[month] += operation.amount;
        }
      }
    });
  });

  return stats;
};
