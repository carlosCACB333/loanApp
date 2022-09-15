import {IUser} from './user';
export type IContractStatus =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'expired'
  | 'closed';

export type IOperationType = 'payment' | 'loan';

export const OperationTypes: IOperationType[] = ['payment', 'loan'];
export const ContractStatuses: IContractStatus[] = [
  'active',
  'inactive',
  'pending',
  'expired',
  'closed',
];

export interface IOperation {
  _id: string;
  amount: number;
  description?: string;
  type: IOperationType;
  createdAt: string;
  updatedAt: string;
}

export interface IContract {
  _id: string;
  name: string;
  status: IContractStatus;
  createdAt: string;
  updatedAt: string;
  lender: string | IUser;
  borrower: string | IUser;
  interest?: number;
  term?: Date;
  operations: IOperation[];
}
