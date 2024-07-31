using System;
using System.Collections.Generic;

namespace vsm_api.Models;

public partial class WorkItem
{
    public int WorkItemID { get; set; }

    public int ServiceRecordID { get; set; }

    public string ItemName { get; set; } = null!;

    public int Quantity { get; set; }

    public int Cost { get; set; }

   // public virtual ServiceRecord ServiceRecord { get; set; } = null!;
}
