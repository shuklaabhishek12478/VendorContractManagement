public class RecentActivityDto
{
    public string Module { get; set; } = string.Empty;   // Vendor / Contract / Renewal

    public string Action { get; set; } = string.Empty;

    public string EntityName { get; set; } = string.Empty;

    public int? EntityId { get; set; }
    public string Description { get; set; } = string.Empty;
    public string PerformedBy { get; set; } = string.Empty;

    public DateTime CreatedOn { get; set; }
   
}