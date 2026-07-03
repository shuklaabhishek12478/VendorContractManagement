import { ContractStatus } from '../models/contract-status.enum';

export interface ContractStatusOption {

    value: ContractStatus;

    label: string;

}

export function getContractStatusLabel(status: number): string {

  return CONTRACT_STATUS_OPTIONS.find(

    x => x.value === status

  )?.label ?? "Unknown";

}

export const CONTRACT_STATUS_OPTIONS: ContractStatusOption[] = [

    {
        value: ContractStatus.Draft,
        label: 'Draft'
    },

    {
        value: ContractStatus.PendingApproval,
        label: 'Pending Approval'
    },

    {
        value: ContractStatus.Approved,
        label: 'Approved'
    },

    {
        value: ContractStatus.Active,
        label: 'Active'
    },

    {
        value: ContractStatus.Expired,
        label: 'Expired'
    },

    {
        value: ContractStatus.Rejected,
        label: 'Rejected'
    },

    {
        value: ContractStatus.Renewed,
        label: 'Renewed'
    },

    {
        value: ContractStatus.RenewalPendingApproval,
        label: 'Renewal Pending'
    },

    {
        value: ContractStatus.RenewalApproved,
        label: 'Renewal Approved'
    },

    {
        value: ContractStatus.RenewalRejected,
        label: 'Renewal Rejected'
    },

    {
        value: ContractStatus.Terminated,
        label: 'Terminated'
    }

];