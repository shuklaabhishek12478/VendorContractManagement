using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Services.Helpers
{
    public class ContractEmailHelper
    {
        private readonly IEmailService _emailService;

        public ContractEmailHelper(IEmailService emailService)
        {
            _emailService = emailService;
        }

        public async Task SendSubmittedEmail(Contract contract, string email)
        {
            await _emailService.SendEmailAsync(
                email,
                "Contract Submitted",
                $"Contract {contract.ContractNumber} has been submitted for approval."
            );
        }

        public async Task SendApprovedEmail(Contract contract, string email)
        {
            await _emailService.SendEmailAsync(
                email,
                "Contract Approved",
                $"Contract {contract.ContractNumber} has been approved."
            );
        }

        public async Task SendActivatedEmail(
    Contract contract,
    string email)
        {
            var subject =
                $"Contract Activated - {contract.ContractNumber}";

            var body = $@"
Hello,

Your contract <b>{contract.Title}</b> has been activated.

Contract Number:
{contract.ContractNumber}

Regards,
Vendor Contract Management Team";

            await _emailService.SendEmailAsync(
                email,
                subject,
                body
            );
        }

        public async Task SendRejectedEmail(Contract contract, string email, string reason)
        {
            await _emailService.SendEmailAsync(
                email,
                "Contract Rejected",
                $"Contract {contract.ContractNumber} was rejected. Reason: {reason}"
            );
        }

        public async Task SendRenewedEmail(Contract contract,string email)
        {
            var subject =
                $"Contract Renewed - {contract.ContractNumber}";

            var body = $@"
        <h3>Contract Renewed</h3>

        <p>
            Renewal contract
            <b>{contract.ContractNumber}</b>
            has been created.
        </p>

        <p>
            Start Date:
            {contract.StartDate:dd-MMM-yyyy}
        </p>

        <p>
            End Date:
            {contract.EndDate:dd-MMM-yyyy}
        </p>
    ";

            await _emailService.SendEmailAsync(
                email,
                subject,
                body);
        }

        public async Task SendRenewalApprovedEmail(
    Contract contract,
    string toEmail)
        {
            var subject = "Contract Renewal Approved";

            var body = $@"
        Dear Vendor,

        Your contract renewal has been approved.

        Contract Number : {contract.ContractNumber}
        Title : {contract.Title}

        Regards,
        Vendor Contract Management Team";

            await _emailService.SendEmailAsync(
                toEmail,
                subject,
                body);
        }

        public async Task SendRenewalActivatedEmail(
    Contract contract,
    string toEmail)
        {
            var subject = "Contract Renewal Activated";

            var body = $@"
        Dear Vendor,

        Your renewed contract is now Active.

        Contract Number : {contract.ContractNumber}
        Title : {contract.Title}

        Regards,
        Vendor Contract Management Team";

            await _emailService.SendEmailAsync(
                toEmail,
                subject,
                body);
        }

        public async Task SendTerminatedEmail(
    Contract contract,
    string toEmail,
    string reason)
        {
            var subject = "Contract Terminated";

            var body = $@"
        Dear Vendor,

        Your contract has been terminated.

        Contract Number : {contract.ContractNumber}
        Title : {contract.Title}

        Reason:
        {reason}

        Regards,
        Vendor Contract Management Team";

            await _emailService.SendEmailAsync(
                toEmail,
                subject,
                body);
        }
    }
}