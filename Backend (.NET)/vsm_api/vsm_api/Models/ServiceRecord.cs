using System;
using System.Collections.Generic;

namespace vsm_api.Models;

public partial class ServiceRecord
{
    public int ServiceRecordID { get; set; }

    public int VehicleID { get; set; }

    public string ServiceAdvisorID { get; set; } = null!;

    public DateOnly ServiceDate { get; set; }

    public string Status { get; set; } = null!;

   // public virtual ICollection<BillOfMaterial> BillOfMaterials { get; set; } = new List<BillOfMaterial>();

   // public virtual ServiceAdvisor ServiceAdvisor { get; set; } = null!;

   // public virtual Vehicle Vehicle { get; set; } = null!;

  //  public virtual ICollection<WorkItem> WorkItems { get; set; } = new List<WorkItem>();
}
