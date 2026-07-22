using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.DTOs.Users;

namespace VendorContractManagement.Application.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllAsync();

       // Task<UserDto?> GetByIdAsync(int id);

        Task<UserDetailsDto?> GetByIdAsync(int id);

        Task CreateAsync(CreateUserDto dto);

        Task ActivateAsync(int id);

        Task DeactivateAsync(int id);

        Task UpdateAsync(int id, UpdateUserDto dto);

        Task DeleteAsync(int id);

        Task ResetPasswordAsync(int id, string newPassword);

        Task AssignRolesAsync(int id, List<int> roleIds);

        Task<PagedUserResponseDto> GetPagedAsync(
    UserQueryDto query);

        Task<byte[]> ExportAsync();

        Task ImportAsync(Stream stream);
    }
}
