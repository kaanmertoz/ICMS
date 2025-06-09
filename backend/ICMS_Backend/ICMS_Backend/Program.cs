using ICMS_Backend.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Veritaban� ba�lant�s�
builder.Services.AddDbContext<InsuranceDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Controller'lar + JSON d�ng�leri engelle
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.PropertyNamingPolicy = null; // (opsiyonel, PascalCase i�in)
});

// Swagger servisleri
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000") // veya React/Vite portu ka�sa o
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Geli�tirme ortam� i�in Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// Middleware pipeline
//app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
