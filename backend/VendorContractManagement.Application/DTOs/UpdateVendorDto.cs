using VendorContractManagement.Domain.Enums;

namespace VendorContractManagement.Application.DTOs;

public class UpdateVendorDto
{
    public string VendorName { get; set; } = string.Empty;

    public string CompanyName { get; set; } = string.Empty;

    public string GSTNumber { get; set; } = string.Empty;

    public string PANNumber { get; set; } = string.Empty;

    public string ContactPerson { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;

    public bool IsActive { get; set; }
    public string? BankName { get; set; }

    public string? AccountHolderName { get; set; }

    public string? AccountNumber { get; set; }

    public string? IFSCCode { get; set; }

    public string? BranchName { get; set; }

    public string? SwiftCode { get; set; }

    public string? PaymentTerms { get; set; }

    public Currency? PreferredCurrency { get; set; }
    public PaymentMethod? PaymentMethod { get; set; }

}