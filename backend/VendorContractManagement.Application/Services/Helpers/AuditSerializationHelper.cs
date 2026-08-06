using System.Text.Json;

namespace VendorContractManagement.Application.Helpers;

public static class AuditSerializationHelper
{
    public static string Serialize(object obj)
    {
        return JsonSerializer.Serialize(
            obj,
            new JsonSerializerOptions
            {
                WriteIndented = false
            });
    }
}