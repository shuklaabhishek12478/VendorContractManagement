using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VendorContractManagement.Application.DTOs;

namespace VendorContractManagement.Application.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllAsync();

        Task<UserDto?> GetByIdAsync(int id);

        Task CreateAsync(CreateUserDto dto);

        Task ActivateAsync(int id);

        Task DeactivateAsync(int id);
    }
}
