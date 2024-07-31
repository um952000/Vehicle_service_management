using System;
using System.Collections.Generic;

namespace vsm_api.Models;

public partial class ServiceAdvisor
{
    public string ServiceAdvisorID { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Email { get; set; } = null!;

  //  public virtual ICollection<ServiceRecord> ServiceRecords { get; set; } = new List<ServiceRecord>();
}
