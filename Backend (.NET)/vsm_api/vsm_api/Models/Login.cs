using System;
using System.Collections.Generic;

namespace vsm_api.Models;

public partial class Login
{
    public string Userid { get; set; } = null!;

    public string Password { get; set; } = null!;
}
