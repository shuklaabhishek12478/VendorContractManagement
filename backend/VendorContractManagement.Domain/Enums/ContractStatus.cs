using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendorContractManagement.Domain.Enums
{
    public enum ContractStatus
    {
        Draft = 0,
        PendingApproval = 1,
        Approved = 2,
        Rejected = 3,
        Active = 4,
        Expired = 5,
        Renewed = 6,
        RenewalPendingApproval = 7,
        RenewalApproved = 8,
        RenewalRejected = 9,
        Terminated = 10
    }
}
