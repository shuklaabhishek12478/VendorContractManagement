namespace VendorContractManagement.Application.DTOs
{
    public class ContractStatusDto
    {
        public int Active { get; set; }

        public int Expired { get; set; }

        public int ExpiringSoon { get; set; }
    }
}