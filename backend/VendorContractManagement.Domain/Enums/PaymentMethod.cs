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
        Cheque = 6,

        Cash = 7,
        CreditCard = 8,
        DebitCard = 9,
        ACH = 10,
        SWIFT = 11
    }
}
