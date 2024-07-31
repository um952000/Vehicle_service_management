using Microsoft.EntityFrameworkCore;
using vsm_api.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options => { options.AddPolicy("AllowAllOrigins", builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()); }); 
builder.Services.AddControllers();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var provider=builder.Services.BuildServiceProvider();
var config=provider.GetRequiredService<IConfiguration>();
builder.Services.AddDbContext<VsmContext>(item => item.UseSqlServer(config.GetConnectionString("dbcs")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAllOrigins");

app.UseAuthorization();

app.MapControllers();

app.Run();
