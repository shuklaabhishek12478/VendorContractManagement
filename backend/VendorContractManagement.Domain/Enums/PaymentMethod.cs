using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VendorContractManagement.Domain.Enums
{
    public enum PaymentMethod
    {
        NEFT = 1,
        RTGS = 2,
        IMPS = 3,
        UPI = 4,
        WireTransfer = 5,
        Cheque = 6
    }
}
