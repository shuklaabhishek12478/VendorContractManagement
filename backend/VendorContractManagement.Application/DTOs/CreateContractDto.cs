using System.ComponentModel.DataAnnotations;

namespace VendorContractManagement.Application.DTOs
{
    public class CreateContractDto
    {
        
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Range(1, double.MaxValue)]
        public decimal ContractValue { get; set; }

        public string Description { get; set; } = string.Empty;

        [Required]
        public int VendorId { get; set; }
    }
}