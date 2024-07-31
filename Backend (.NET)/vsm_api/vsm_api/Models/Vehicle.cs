using System;
using System.Collections.Generic;

namespace vsm_api.Models;

public partial class Vehicle
{
    public int VehicleID { get; set; }

    public string Company { get; set; } = null!;

    public string Model { get; set; } = null!;

    public int Year { get; set; }

    public string Vin { get; set; } = null!;

    public int CustomerID { get; set; }

    public DateOnly ServiceDueDate { get; set; }

    public string Status { get; set; } = null!;

  //  public virtual Customer Customer { get; set; } = null!;

  //  public virtual ICollection<ServiceRecord> ServiceRecords { get; set; } = new List<ServiceRecord>();
}
