using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Enums;
using VendorContractManagement.Application.Rules;

namespace VendorContractManagement.Application.Jobs
{
    public class ContractExpiryJob
    {
        private readonly IContractRepository _contractRepository;
        private readonly IEmailService _emailService;

        public ContractExpiryJob(
            IContractRepository contractRepository,
            IEmailService emailService)
        {
            _contractRepository = contractRepository;
            _emailService = emailService;
        }

        public async Task CheckExpiringContracts()
        {
            // var contracts = await _contractRepository.GetAllAsync();

            var contracts = await _contractRepository.GetActiveContractsAsync();

            foreach (var contract in contracts)
            {
                // ✅ Only Active contracts should be considered
                if (contract.Status != ContractStatus.Active)
                    continue;

                var daysLeft =
                    (contract.EndDate.Date - DateTime.UtcNow.Date).Days;

                // ❗ ignore already expired
                if (daysLeft < 0)
                    continue;

                if (daysLeft == 30 ||
                    daysLeft == 15 ||
                    daysLeft == 7)
                {
                    await _emailService.SendEmailAsync(
                        contract.Vendor.Email,
                        "Contract Expiry Alert",
                        $@"
Dear Vendor,

Contract Number: {contract.ContractNumber}

Your contract will expire in {daysLeft} days.

End Date: {contract.EndDate:dd-MMM-yyyy}

Please renew your contract.

Regards,
Vendor Contract Management Team
");
                }
            }
        }
    }
}