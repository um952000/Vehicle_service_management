using System;
using System.Collections.Generic;

namespace vsm_api.Models;

public partial class BillOfMaterial
{
    public int BillOfMaterialID { get; set; }

    public int ServiceRecordID { get; set; }

    public int Amount { get; set; }

  //  public virtual ServiceRecord ServiceRecord { get; set; } = null!;
}
