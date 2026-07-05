using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VendorContractManagement.Domain.Common;

namespace VendorContractManagement.Domain.Entities
{
    public class Document : BaseEntity
    {
        public string FileName { get; set; } = string.Empty;

        public string OriginalFileName { get; set; } = string.Empty;

        public string FilePath { get; set; } = string.Empty;

        public long FileSize { get; set; }

        public string ContentType { get; set; } = string.Empty;

        public int ContractId { get; set; }

        public Contract Contract { get; set; } = null!;

        public DateTime UploadedOn { get; set; } = DateTime.UtcNow;
    }
}
