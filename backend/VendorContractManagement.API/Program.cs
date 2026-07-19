using FluentValidation;
using FluentValidation.AspNetCore;
using Hangfire;
using Hangfire.SqlServer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Text;
using VendorContractManagement.API.Mappings;
using VendorContractManagement.API.Middlewares;
using VendorContractManagement.API.Services;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Jobs;
using VendorContractManagement.Application.Services.Helpers;
using VendorContractManagement.Application.Services.Implementations;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Application.Validators;
using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Infrastructure;
using VendorContractManagement.Infrastructure.Data;
using VendorContractManagement.Infrastructure.Data.Seed;
using VendorContractManagement.Infrastructure.Persistence.Seed;
using VendorContractManagement.Infrastructure.Repository;
using VendorContractManagement.Infrastructure.Repository.Implementations;
using VendorContractManagement.Infrastructure.Repository.Interfaces;
using VendorContractManagement.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using VendorContractManagement.API.Authorization;
using VendorContractManagement.Infrastructure.Repositories;
using VendorContractManagement.Application.Services;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo.Console()
    .WriteTo.File(
        "logs/log-.txt",
        rollingInterval: RollingInterval.Day)
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog();

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddHangfire(config =>
    config.SetDataCompatibilityLevel(
            CompatibilityLevel.Version_180)
          .UseSimpleAssemblyNameTypeSerializer()
          .UseRecommendedSerializerSettings()
          .UseSqlServerStorage(
              builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddHangfireServer();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer",
        new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "Enter JWT Token"
        });

    options.AddSecurityRequirement(
        new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference =
                        new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                },
                Array.Empty<string>()
            }
        });
});
builder.Services.Configure<EmailSettings>(
    builder.Configuration.GetSection("EmailSettings"));

// SQL Server Connection
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("JwtSettings"));
var jwtSettings =
    builder.Configuration
        .GetSection("JwtSettings")
        .Get<JwtSettings>();

var key = Encoding.UTF8.GetBytes(jwtSettings!.SecretKey);

builder.Services.AddAuthentication(
    JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                ValidIssuer = jwtSettings.Issuer,
                ValidAudience = jwtSettings.Audience,

                IssuerSigningKey =
                    new SymmetricSecurityKey(key)
            };
    });
builder.Services.AddAuthorization(options =>
{
});

builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration =
        builder.Configuration["Redis:ConnectionString"];
});

builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("fixed", opt =>
    {
        opt.PermitLimit = 100;
        opt.Window = TimeSpan.FromMinutes(1);
        opt.QueueLimit = 0;
    });
});

builder.Services
    .AddHealthChecks()
    .AddSqlServer(
        builder.Configuration
            .GetConnectionString("DefaultConnection")!);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .WithExposedHeaders("Content-Disposition");
    });
});

// Repository DI
builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IVendorRepository, VendorRepository>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<IVendorService, VendorService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<CreateVendorDtoValidator>();
builder.Services.AddScoped<IContractRepository, ContractRepository>();
builder.Services.AddScoped<IContractService, ContractService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<IDocumentRepository, DocumentRepository>();
builder.Services.AddScoped<IDocumentService, DocumentService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<ContractExpiryJob>();
builder.Services.AddScoped<IAuditLogRepository, AuditLogRepository>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IUserContextService, UserContextService>();
builder.Services.AddScoped<IAuditLogService, AuditLogService>();
//builder.Services.AddScoped<ICacheService, RedisCacheService>();
builder.Services.AddScoped<IAnalyticsService, AnalyticsService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddValidatorsFromAssemblyContaining<CreateVendorDtoValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<CreateContractDtoValidator>();
builder.Services.AddScoped<ContractActivationJob>();
builder.Services.AddScoped<ContractEmailHelper>();
builder.Services.AddScoped<INotificationService,NotificationService>();
builder.Services.AddScoped<IRecentActivityService,RecentActivityService>();
builder.Services.AddScoped<IRecentActivityRepository,RecentActivityRepository>();
builder.Services.AddValidatorsFromAssemblyContaining<CreateVendorDtoValidator>();
builder.Services.AddScoped<IVendorDocumentRepository,VendorDocumentRepository>();
builder.Services.AddScoped<IVendorDocumentService,VendorDocumentService>();
builder.Services.AddScoped<IExpenditureRepository,ExpenditureRepository>();
builder.Services.AddScoped<IExpenditureService,ExpenditureService>();
builder.Services.AddScoped<IRoleRepository,RoleRepository>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPermissionRepository, PermissionRepository>();
builder.Services.AddScoped<IPermissionService, PermissionService>();
builder.Services.AddScoped<IAuthorizationHandler,PermissionAuthorizationHandler>();
builder.Services.AddSingleton<IAuthorizationPolicyProvider, PermissionPolicyProvider>();
builder.Services.AddScoped<IPermissionDependencyRepository, PermissionDependencyRepository>();
builder.Services.AddScoped<IPermissionRuleService, PermissionRuleService>();
builder.Services.AddScoped<IPermissionExportService,PermissionExportService>();


var app = builder.Build();

app.UseSerilogRequestLogging();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHangfireDashboard();

app.UseMiddleware<ExceptionMiddleware>();
app.MapHealthChecks("/health");
app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseAuthentication();

app.UseCors("AllowAngular");

app.UseAuthorization();

app.UseRateLimiter();

app.MapControllers();

RecurringJob.AddOrUpdate<ContractExpiryJob>(
    "contract-expiry-job",
    job => job.CheckExpiringContracts(),
    Cron.Daily);

RecurringJob.AddOrUpdate<ContractActivationJob>(
  "activate-contracts",
  job => job.ActivateContractsAsync(),
  Cron.Daily
);

using (var scope = app.Services.CreateScope())
{
    var context =
        scope.ServiceProvider.GetRequiredService<AppDbContext>();

    await DataSeeder.SeedAsync(context);

    await DbSeeder.SeedAdminAsync(context);
}


app.Run();