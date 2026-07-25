using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Infrastructure.Data.Seed.Permissions;

public static class ExpenditurePermissions
{
    public static List<Permission> Get()
    {
        return new List<Permission>
        {
            new Permission
            {
                Module = "Expenditure",
                Name = "View Expenditures",
                Code = "Expenditure.View",
                Description = "View expenditure records"
            },

            new Permission
            {
                Module = "Expenditure",
                Name = "Create Expenditure",
                Code = "Expenditure.Create",
                Description = "Create new expenditure"
            },

            new Permission
            {
                Module = "Expenditure",
                Name = "Update Expenditure",
                Code = "Expenditure.Update",
                Description = "Update expenditure"
            },

            new Permission
            {
                Module = "Expenditure",
                Name = "Delete Expenditure",
                Code = "Expenditure.Delete",
                Description = "Delete expenditure"
            },

            new Permission
            {
                Module = "Expenditure",
                Name = "Search Expenditures",
                Code = "Expenditure.Search",
                Description = "Search expenditure records"
            },

            new Permission
            {
                Module = "Expenditure",
                Name = "View Dashboard",
                Code = "Expenditure.Dashboard",
                Description = "View expenditure dashboard"
            },

            new Permission
            {
                Module = "Expenditure",
                Name = "View Forecast",
                Code = "Expenditure.Forecast",
                Description = "View expenditure forecast"
            }
        };
    }
}