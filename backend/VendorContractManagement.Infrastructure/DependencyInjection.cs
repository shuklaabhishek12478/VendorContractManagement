using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Infrastructure.Data;
using VendorContractManagement.Infrastructure.Persistence;
using VendorContractManagement.Infrastructure.Repository;
using VendorContractManagement.Infrastructure.Repository.Implementations;

namespace VendorContractManagement.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection")));

        services.AddScoped<IVendorRepository, VendorRepository>();
        return services;
       
    }

}