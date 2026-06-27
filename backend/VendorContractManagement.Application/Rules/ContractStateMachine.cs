using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Domain.Enums;

namespace VendorContractManagement.Application.Rules
{
    public static class ContractStateMachine
    {
        public static void ValidateTransition(
            ContractStatus currentStatus,
            ContractStatus newStatus)
        {
            switch (currentStatus)
            {
                case ContractStatus.Draft:
                    if (newStatus != ContractStatus.PendingApproval)
                        Throw(currentStatus, newStatus);
                    break;

                case ContractStatus.PendingApproval:
                    if (newStatus != ContractStatus.Approved &&
                        newStatus != ContractStatus.Rejected)
                        Throw(currentStatus, newStatus);
                    break;

                case ContractStatus.Approved:
                    if (newStatus != ContractStatus.Active)
                        Throw(currentStatus, newStatus);
                    break;

                case ContractStatus.Active:
                    if (newStatus != ContractStatus.Expired &&
                        newStatus != ContractStatus.Terminated &&
                        newStatus != ContractStatus.RenewalPendingApproval)
                    {
                        Throw(currentStatus, newStatus);
                    }
                    break;

                case ContractStatus.RenewalPendingApproval:

                    if (newStatus != ContractStatus.RenewalApproved
                        &&
                        newStatus != ContractStatus.RenewalRejected)
                    {
                        Throw(currentStatus, newStatus);
                    }

                    break;

                case ContractStatus.RenewalApproved:

                    if (newStatus != ContractStatus.Active)
                    {
                        Throw(currentStatus, newStatus);
                    }

                    break;

                case ContractStatus.Rejected:
                case ContractStatus.Expired:
                    if (newStatus != ContractStatus.Renewed)
                    {
                        Throw(currentStatus, newStatus);
                    }
                    break;
                case ContractStatus.Terminated:
                    // final states
                    Throw(currentStatus, newStatus);
                    break;

                case ContractStatus.RenewalRejected:

                default:
                    Throw(currentStatus, newStatus);
                    break;
            }
        }

        private static void Throw(
            ContractStatus current,
            ContractStatus next)
        {
            throw new InvalidOperationException(
                $"Invalid contract state transition: {current} → {next}");
        }
    }
}