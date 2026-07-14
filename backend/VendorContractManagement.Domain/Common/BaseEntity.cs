namespace VendorContractManagement.Domain.Common
{
    public abstract class BaseEntity
    {
        protected BaseEntity()
        {
            CreatedOn = DateTime.UtcNow;
        }

        public int Id { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? UpdatedOn { get; set; }

        public bool IsDeleted { get; set; }
    }
}