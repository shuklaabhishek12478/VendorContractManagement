using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendorContractManagement.Domain.Enums
{
    public enum ContractStatus
    {
        Draft = 1,
        PendingApproval = 2,
        Approved = 3,
        Rejected = 4,
        Active = 5,
        Expired = 6,

        RenewalPendingApproval = 7,
        RenewalApproved = 8,
        RenewalRejected = 9,

        Renewed = 10,
        Terminated = 11
    }
}
