using System;
using System.Collections.Generic;

namespace vsm_api.Models;

public partial class Customer
{
    public int CustomerID { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Address { get; set; } = null!;

   // public virtual ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
}
