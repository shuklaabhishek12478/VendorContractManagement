using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Entities;

namespace VendorContractManagement.Application.Services.Implementations
{
    public class RecentActivityService : IRecentActivityService
    {
        private readonly IRecentActivityRepository _repo;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public RecentActivityService(IRecentActivityRepository repo, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _repo = repo;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task LogAsync(
    string module,
    string action,
    string description,
    int? entityId = null,
    string? entityName = null,
    string? entityType = null,
    string? performedBy = null)
        {
            var activity = new RecentActivity
            {
                Module = module,
                Action = action,
                Description = description,
                EntityId = entityId,
                EntityName = entityName ?? string.Empty,
                EntityType = entityType,
                PerformedBy = performedBy
            };

            await _repo.AddAsync(activity);

            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<RecentActivityDto>> GetRecentAsync(int count)
        {
            var data = await _repo.GetRecentAsync(count);
            return _mapper.Map<IEnumerable<RecentActivityDto>>(data);
        }
    }
}
