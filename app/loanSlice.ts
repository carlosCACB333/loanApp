import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {IContract, IOperation} from '../interfaces';

interface LoanState {
  contracts: IContract[];
}

const initialState: LoanState = {
  contracts: [],
};

export const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {
    setContracts: (state, action: PayloadAction<IContract[]>) => {
      state.contracts = action.payload;
    },

    addContract: (state, action: PayloadAction<IContract>) => {
      state.contracts.unshift(action.payload);
    },

    addOperation: (
      state,
      action: PayloadAction<{op: IOperation; id: string}>,
    ) => {
      const contract = state.contracts.find(c => c._id === action.payload.id);
      if (contract) {
        contract.operations.unshift(action.payload.op);
      }
    },

    deleteContract: (state, action: PayloadAction<string>) => {
      state.contracts = state.contracts.filter(
        contract => contract._id !== action.payload,
      );
    },

    updateContract: (state, action: PayloadAction<IContract>) => {
      let contractIdx = state.contracts.findIndex(
        contract => contract._id === action.payload._id,
      );
      if (contractIdx !== -1) {
        state.contracts[contractIdx] = action.payload;
      }
    },

    deleteOperation: (
      state,
      action: PayloadAction<{id: string; opId: string}>,
    ) => {
      const contract = state.contracts.find(c => c._id === action.payload.id);
      if (contract) {
        contract.operations = contract.operations.filter(
          op => op._id !== action.payload.opId,
        );
      }
    },

    resetState: () => initialState,

    updateNameContract: (
      state,
      action: PayloadAction<{contract: IContract}>,
    ) => {
      const contract = state.contracts.find(
        c => c._id === action.payload.contract._id,
      );
      if (contract) {
        contract.name = action.payload.contract.name;
        contract.updatedAt = action.payload.contract.updatedAt;
      }
    },
  },
});

export const {
  setContracts,
  addContract,
  addOperation,
  deleteContract,
  updateContract,
  deleteOperation,
  resetState,
  updateNameContract,
} = loanSlice.actions;
export default loanSlice.reducer;
