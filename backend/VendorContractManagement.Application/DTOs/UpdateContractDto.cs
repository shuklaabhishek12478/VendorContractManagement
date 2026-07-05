using System.ComponentModel.DataAnnotations;

namespace VendorContractManagement.Application.DTOs
{
    public class UpdateContractDto
    {
       // [Required]
       // public string ContractNumber { get; set; } = string.Empty;

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Range(1, double.MaxValue)]
        public decimal ContractValue { get; set; }

        public string Description { get; set; } = string.Empty;

        [Range(1, int.MaxValue)]
        public int VendorId { get; set; }
    }
}