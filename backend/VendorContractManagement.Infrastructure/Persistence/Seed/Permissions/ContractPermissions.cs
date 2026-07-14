using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Seed.Permissions;

public static class ContractPermissions
{
    public static List<Permission> Get()
    {
        return new()
        {
            new()
            {
                Name = "View Contracts",
                Code = "Contract.View",
                Module = "Contract",
                Description = "View contracts"
            },

            new()
            {
                Name = "View Contract Details",
                Code = "Contract.ViewDetails",
                Module = "Contract",
                Description = "View contract details"
            },

            new()
            {
                Name = "Create Contract",
                Code = "Contract.Create",
                Module = "Contract",
                Description = "Create contract"
            },

            new()
            {
                Name = "Edit Contract",
                Code = "Contract.Edit",
                Module = "Contract",
                Description = "Edit contract"
            },

            new()
            {
                Name = "Delete Contract",
                Code = "Contract.Delete",
                Module = "Contract",
                Description = "Delete contract"
            },

            new()
            {
                Name = "Submit Contract",
                Code = "Contract.Submit",
                Module = "Contract",
                Description = "Submit contract for approval"
            },

            new()
            {
                Name = "Approve Contract",
                Code = "Contract.Approve",
                Module = "Contract",
                Description = "Approve contract"
            },

            new()
            {
                Name = "Reject Contract",
                Code = "Contract.Reject",
                Module = "Contract",
                Description = "Reject contract"
            },

            new()
            {
                Name = "Activate Contract",
                Code = "Contract.Activate",
                Module = "Contract",
                Description = "Activate contract"
            },

            new()
            {
                Name = "Terminate Contract",
                Code = "Contract.Terminate",
                Module = "Contract",
                Description = "Terminate contract"
            },

            new()
            {
                Name = "Renew Contract",
                Code = "Contract.Renew",
                Module = "Contract",
                Description = "Renew contract"
            },

            new()
            {
                Name = "Approve Renewal",
                Code = "Contract.RenewApprove",
                Module = "Contract",
                Description = "Approve contract renewal"
            },

            new()
            {
                Name = "Reject Renewal",
                Code = "Contract.RenewReject",
                Module = "Contract",
                Description = "Reject contract renewal"
            },

            new()
            {
                Name = "View Renewal History",
                Code = "Contract.RenewHistory",
                Module = "Contract",
                Description = "View renewal history"
            },

            new()
            {
                Name = "Export Contracts",
                Code = "Contract.Export",
                Module = "Contract",
                Description = "Export contract data"
            },

            new()
            {
                Name = "Import Contracts",
                Code = "Contract.Import",
                Module = "Contract",
                Description = "Import contract data"
            },

            new()
            {
                Name = "Contract Dashboard",
                Code = "Contract.Dashboard",
                Module = "Contract",
                Description = "View contract dashboard"
            }
        };
    }
}