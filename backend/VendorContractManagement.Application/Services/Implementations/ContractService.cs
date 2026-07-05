using AutoMapper;
using VendorContractManagement.Application.DTOs;
using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Rules;
using VendorContractManagement.Application.Services.Helpers;
using VendorContractManagement.Application.Services.Interfaces;
using VendorContractManagement.Domain.Entities;
using VendorContractManagement.Domain.Enums;
using OfficeOpenXml;

namespace VendorContractManagement.Application.Services.Implementations
{
    public class ContractService : IContractService
    {
        private readonly IContractRepository _contractRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IAuditLogRepository _auditLogRepository;
        private readonly IUserContextService _userContext;
        private readonly IEmailService _emailService;
        private readonly ContractEmailHelper _emailHelper;
        private readonly IRecentActivityService _recentActivityService;
        public ContractService(
            IContractRepository contractRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IAuditLogRepository auditLogRepository,
            IUserContextService userContext,
            IEmailService emailService,
            ContractEmailHelper emailHelper,
            IRecentActivityService recentActivityService)
        {
            _contractRepository = contractRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _auditLogRepository = auditLogRepository;
            _userContext = userContext;
            _emailService = emailService;
            _emailHelper = emailHelper;
            _recentActivityService = recentActivityService;
        }

        public async Task<IEnumerable<ContractDto>> GetAllAsync()
        {
            var contracts = await _contractRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<ContractDto>>(contracts);
        }

        public async Task<ContractDto?> GetByIdAsync(int id)
        {
            var contract =
                await _contractRepository.GetByIdAsync(id);

            if (contract == null)
                return null;

            if (_userContext.Role == "Vendor")
            {
                if (_userContext.VendorId == null)
                    throw new Exception("Vendor not found");

                if (contract.VendorId != _userContext.VendorId)
                {
                    throw new UnauthorizedAccessException(
                        "Access denied");
                }
            }

            return _mapper.Map<ContractDto>(contract);
        }


        public async Task CreateAsync(CreateContractDto dto)
        {
            var contract = _mapper.Map<Contract>(dto);

            var count =
                await _contractRepository.GetContractCountAsync();

            contract.ContractNumber =
                $"CNT-{DateTime.UtcNow.Year}-{(count + 1):D4}";

            contract.Status = ContractStatus.Draft;

            contract.SubmittedOn = DateTime.UtcNow;

            contract.IsActive = true;
            contract.IsDeleted = false;

            await _contractRepository.AddAsync(contract);

            await _unitOfWork.SaveChangesAsync();

            await _auditLogRepository.AddAsync(
             new AuditLog
             {
        Action = "CREATE",
        EntityName = "Contract",
        EntityId = contract.Id,
        PerformedBy = _userContext.UserId
            });

            await _unitOfWork.SaveChangesAsync();

            await _recentActivityService.LogAsync(
    module: "Contract",
    action: "Created",
    description: $"Contract {contract.Title} ({contract.ContractNumber}) created",
    entityId: contract.Id,
    entityName: contract.ContractNumber,
    entityType: "Contract",
    performedBy: _userContext.UserId
);
            return;
        }
        /*public async Task CreateAsync(CreateContractDto dto)
        {


            var contract = _mapper.Map<Contract>(dto);

            await _contractRepository.AddAsync(contract);

            await _unitOfWork.SaveChangesAsync();

            return;

              var contract = _mapper.Map<Contract>(dto);

             var count =
                 await _contractRepository.GetContractCountAsync();

             contract.ContractNumber =
                 $"CNT-{DateTime.UtcNow.Year}-{(count + 1):D4}";

             // Default values
             contract.Status = ContractStatus.Draft;
             contract.SubmittedOn = DateTime.UtcNow;

             await _contractRepository.AddAsync(contract);
             await _unitOfWork.SaveChangesAsync();

             await _auditLogRepository.AddAsync(new AuditLog
             {
                 Action = "CREATE",
                 EntityName = "Contract",
                 EntityId = contract.Id,
                 PerformedBy = _userContext.UserId
             });

             await _unitOfWork.SaveChangesAsync();
  await _recentActivityService.LogAsync(
     module: "Contract",
     action: "Created",
     description: $"Contract {contract.Title} ({contract.ContractNumber}) created",
     entityId: contract.Id,
     entityName: contract.ContractNumber,
     entityType: "Contract",
     performedBy: _userContext.UserId
 );
        }*/

        public async Task UpdateAsync(int id, UpdateContractDto dto)
        {
            var contract = await _contractRepository.GetByIdAsync(id);

            if (contract == null)
                throw new Exception("Contract not found");

            /* if (contract.Status == ContractStatus.Approved
                 || contract.Status == ContractStatus.Active
                 || contract.Status == ContractStatus.Expired
                 || contract.Status == ContractStatus.Terminated)
             {
                 throw new Exception(
                     "This contract can no longer be modified");
             }*/
            if (!CanEditContract(contract.Status))
            {
                throw new Exception(
                    "This contract can no longer be modified");
            }


            _mapper.Map(dto, contract);

            _contractRepository.Update(contract);
            await _unitOfWork.SaveChangesAsync();

            await _auditLogRepository.AddAsync(new AuditLog
            {
                Action = "UPDATE",
                EntityName = "Contract",
                EntityId = contract.Id,
                PerformedBy = _userContext.UserId
            });

            await _unitOfWork.SaveChangesAsync();
            await _recentActivityService.LogAsync(
    module: "Contract",
    action: "Updated",
    description: $"Contract {contract.Title} ({contract.ContractNumber}) updated",
    entityId: contract.Id,
    entityName: contract.ContractNumber,
    entityType: "Contract",
    performedBy: _userContext.UserId
);
        }

        public async Task ArchiveAsync(int id)
        {
            var contract =
                await _contractRepository.GetByIdAsync(id);

            if (contract == null)
                throw new Exception("Contract not found");

            if (!contract.IsActive)
                throw new Exception("Contract already archived");

            contract.IsActive = false;

            _contractRepository.Update(contract);

            await _unitOfWork.SaveChangesAsync();

            await _auditLogRepository.AddAsync(
                new AuditLog
                {
                    Action = "ARCHIVE",
                    EntityName = "Contract",
                    EntityId = contract.Id,
                    PerformedBy = _userContext.UserId
                });

            await _recentActivityService.LogAsync(
                module: "Contract",
                action: "Archived",
                description:
                    $"Contract {contract.Title} archived",
                entityId: contract.Id,
                entityName: contract.ContractNumber,
                entityType: "Contract",
                performedBy: _userContext.UserId);

            await _unitOfWork.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var contract = await _contractRepository.GetByIdAsync(id);

            if (contract == null)
                throw new Exception("Contract not found");

            if (contract.Status == ContractStatus.Approved
                 || contract.Status == ContractStatus.Active)
            {
                throw new Exception(
                    "Approved contracts cannot be deleted");
            }

            contract.IsDeleted = true;

            _contractRepository.Update(contract);
            await _unitOfWork.SaveChangesAsync();

            await _auditLogRepository.AddAsync(new AuditLog
            {
                Action = "DELETE",
                EntityName = "Contract",
                EntityId = contract.Id,
                PerformedBy = _userContext.UserId
            });

            await _unitOfWork.SaveChangesAsync();

            await _recentActivityService.LogAsync(
    module: "Contract",
    action: "Deleted",
    description: $"Contract {contract.Title} ({contract.ContractNumber}) deleted",
    entityId: contract.Id,
    entityName: contract.ContractNumber,
    entityType: "Contract",
    performedBy: _userContext.UserId
);
        }

        public async Task<IEnumerable<ContractDto>> GetExpiringSoonAsync(int days)
        {
            var contracts = await _contractRepository.GetExpiringSoonAsync(days);
            return _mapper.Map<IEnumerable<ContractDto>>(contracts);
        }

        public async Task<IEnumerable<ContractDto>> GetExpiredAsync()
        {
            var contracts = await _contractRepository.GetExpiredAsync();
            return _mapper.Map<IEnumerable<ContractDto>>(contracts);
        }

        public async Task<IEnumerable<ContractDto>> GetActiveAsync()
        {

            var contracts = await _contractRepository.GetActiveAsync();
            return _mapper.Map<IEnumerable<ContractDto>>(contracts);
        }

        public async Task SubmitAsync(int id)
        {
            var contract =
                await _contractRepository.GetByIdAsync(id);

            if (contract == null)
                throw new Exception("Contract not found");

            if (contract.Status != ContractStatus.Draft)
                throw new Exception(
                    "Only Draft contracts can be submitted");

            ContractStateMachine.ValidateTransition(contract.Status,ContractStatus.PendingApproval);

            contract.Status =
                ContractStatus.PendingApproval;

            contract.SubmittedOn = DateTime.UtcNow;

            _contractRepository.Update(contract);

            await _unitOfWork.SaveChangesAsync();

            await _auditLogRepository.AddAsync(
                new AuditLog
                {
                    Action = "SUBMIT",
                    EntityName = "Contract",
                    EntityId = contract.Id,
                    PerformedBy = _userContext.UserId
                });

            await _unitOfWork.SaveChangesAsync();
            await _recentActivityService.LogAsync(
    module: "Contract",
    action: "Submitted",
    description: $"Contract {contract.Title} ({contract.ContractNumber}) submitted for approval",
    entityId: contract.Id,
    entityName: contract.ContractNumber,
    entityType: "Contract",
    performedBy: _userContext.UserId
);

            await _emailHelper.SendSubmittedEmail(
                 contract, contract.Vendor.Email
             );

        }

        public async Task ApproveAsync(int id)
        {
            var contract =
                await _contractRepository.GetByIdAsync(id);

            if (contract == null)
                throw new Exception("Contract not found");

            if (contract.Status != ContractStatus.PendingApproval)
                throw new Exception(
                    "Contract is not pending approval");

            ContractStateMachine.ValidateTransition(contract.Status,ContractStatus.Approved);

            contract.Status =
                ContractStatus.Approved;

            contract.ApprovedBy =
                _userContext.UserId;

            contract.ApprovedOn =
                DateTime.UtcNow;

            _contractRepository.Update(contract);

            await _unitOfWork.SaveChangesAsync();

            await _auditLogRepository.AddAsync(
                new AuditLog
                {
                    Action = "APPROVE",
                    EntityName = "Contract",
                    EntityId = contract.Id,
                    PerformedBy = _userContext.UserId
                });

            await _recentActivityService.LogAsync(
    module: "Contract",
    action: "Approved",
    description: $"Contract {contract.Title} ({contract.ContractNumber}) approved",
    entityId: contract.Id,
    entityName: contract.ContractNumber,
    entityType: "Contract",
    performedBy: _userContext.UserId
);

            await _unitOfWork.SaveChangesAsync();
            await _emailHelper.SendApprovedEmail(
                contract, contract.Vendor.Email
             );

        }

        public async Task ActivateAsync(int id)
        {
            var contract =
                await _contractRepository.GetByIdAsync(id);

            if (contract == null)
                throw new Exception("Contract not found");

            if (contract.Status != ContractStatus.Approved)
                throw new Exception(
                    "Only approved contracts can be activated");

            ContractStateMachine.ValidateTransition(
                contract.Status,
                ContractStatus.Active);

            contract.Status = ContractStatus.Active;

            _contractRepository.Update(contract);

            await _unitOfWork.SaveChangesAsync();

            await _auditLogRepository.AddAsync(
                new AuditLog
                {
                    Action = "ACTIVATE",
                    EntityName = "Contract",
                    EntityId = contract.Id,
                    PerformedBy = _userContext.UserId
                });

            await _recentActivityService.LogAsync(
                module: "Contract",
                action: "Activated",
                description: $"Contract {contract.Title} ({contract.ContractNumber}) activated",
                entityId: contract.Id,
                entityName: contract.ContractNumber,
                entityType: "Contract",
                performedBy: _userContext.UserId
            );

            await _unitOfWork.SaveChangesAsync();

            await _emailHelper.SendActivatedEmail(
                contract,
                contract.Vendor.Email
            );
        }

        public async Task RejectAsync(int id, string reason)
        {
            var contract =
                await _contractRepository.GetByIdAsync(id);

            if (string.IsNullOrWhiteSpace(reason))
            {
                throw new Exception(
                    "Rejection reason is required");
            }

            if (contract == null)
                throw new Exception("Contract not found");

            if (contract.Status != ContractStatus.PendingApproval)
                throw new Exception(
                    "Contract is not pending approval");

            ContractStateMachine.ValidateTransition(contract.Status,ContractStatus.Rejected);

            contract.Status =
                ContractStatus.Rejected;

            contract.RejectionReason =
                reason;

            _contractRepository.Update(contract);

            await _unitOfWork.SaveChangesAsync();

            await _auditLogRepository.AddAsync(
                new AuditLog
                {
                    Action = "REJECT",
                    EntityName = "Contract",
                    EntityId = contract.Id,
                    PerformedBy = _userContext.UserId
                });

            await _recentActivityService.LogAsync(
                module: "Contract",
                action: "Rejected",
                description: $"Contract {contract.Title} ({contract.ContractNumber}) rejected",
                entityId: contract.Id,
                entityName: contract.ContractNumber,
                entityType: "Contract",
                performedBy: _userContext.UserId
);

            await _unitOfWork.SaveChangesAsync();

            await _emailHelper.SendRejectedEmail(
                 contract,contract.Vendor.Email,reason
);

        }

        private static bool CanEditContract(ContractStatus status)
        {
            return status == ContractStatus.Draft
                || status == ContractStatus.Rejected;
        }

        public async Task<PagedResponse<ContractDto>>GetPagedAsync(ContractQueryParams query)
        {
            var (contracts, totalCount) =
                await _contractRepository
                    .GetPagedAsync(query);

            var data =
                _mapper.Map<IEnumerable<ContractDto>>
                (contracts);

            return new PagedResponse<ContractDto>
            {
                PageNumber = query.PageNumber,
                PageSize = query.PageSize,
                TotalRecords = totalCount,
                TotalPages =
                    (int)Math.Ceiling(
                        totalCount /
                        (double)query.PageSize),

                Data = data
            };
        }

        public async Task SubmitAgainAsync(int id)
        {
            var contract =
                await _contractRepository.GetByIdAsync(id);

            if (contract == null)
                throw new Exception("Contract not found");

            if (contract.Status != ContractStatus.Rejected)
            {
                throw new InvalidOperationException(
                    "Only rejected contracts can be submitted again.");
            }

            ContractStateMachine.ValidateTransition(
                contract.Status,
                ContractStatus.PendingApproval);

            contract.Status = ContractStatus.PendingApproval;

            contract.SubmittedOn = DateTime.UtcNow;

            contract.RejectionReason = null;

            _contractRepository.Update(contract);

            await _unitOfWork.SaveChangesAsync();

            await _auditLogRepository.AddAsync(
                new AuditLog
                {
                    Action = "SUBMIT_AGAIN",
                    EntityName = "Contract",
                    EntityId = contract.Id,
                    PerformedBy = _userContext.UserId
                });

            await _recentActivityService.LogAsync(
                module: "Contract",
                action: "Submitted Again",
                description:
                    $"Contract {contract.Title} submitted again for approval",
                entityId: contract.Id,
                entityName: contract.ContractNumber,
                entityType: "Contract",
                performedBy: _userContext.UserId);

            await _unitOfWork.SaveChangesAsync();
        }

        public async Task ExpireContractsAsync()
        {
            var contracts =
                await _contractRepository.GetActiveAsync();

            var expiredContracts = contracts
                .Where(x =>
                    x.EndDate.Date < DateTime.UtcNow.Date)
                .ToList();

            foreach (var contract in expiredContracts)
            {
                ContractStateMachine.ValidateTransition(
                    contract.Status,
                    ContractStatus.Expired);

                contract.Status = ContractStatus.Expired;

                _contractRepository.Update(contract);

                await _auditLogRepository.AddAsync(
                    new AuditLog
                    {
                        Action = "EXPIRE",
                        EntityName = "Contract",
                        EntityId = contract.Id,
                        PerformedBy = "System"
                    });

                await _recentActivityService.LogAsync(
                    module: "Contract",
                    action: "Expired",
                    description:
                        $"Contract {contract.Title} expired automatically",
                    entityId: contract.Id,
                    entityName: contract.ContractNumber,
                    entityType: "Contract",
                    performedBy: "System"
                );
            }

            await _unitOfWork.SaveChangesAsync();
        }

        public async Task RenewAsync(int contractId,RenewContractDto dto)
        {
            var contract =
                await _contractRepository
                    .GetByIdAsync(contractId);

            if (contract == null)
                throw new Exception("Contract not found");

            if (contract.Status != ContractStatus.Active
                &&
                contract.Status != ContractStatus.Expired)
            {
                throw new Exception(
                    "Only Active or Expired contracts can be renewed");
            }

            var existingRenewals =
                await _contractRepository
                   .GetRenewalsAsync(contract.Id);

            var renewalNumber =
                existingRenewals.Count() + 1;

            var renewalContractNumber = $"{contract.ContractNumber}-R{renewalNumber}";

            var renewedContract = new Contract
            {
                ContractNumber = renewalContractNumber,
                Title = contract.Title,
                VendorId = contract.VendorId,

                StartDate = dto.NewStartDate,

                EndDate = dto.NewEndDate,

                ContractValue = dto.ContractValue,

                Description = dto.Description,

                Status = ContractStatus.RenewalPendingApproval,

                ParentContractId = contract.Id,

                IsRenewal = true,

                RenewalRequestedOn = DateTime.UtcNow
            };

            await _contractRepository
                .AddAsync(renewedContract);

            /*ContractStateMachine.ValidateTransition(
                 contract.Status,ContractStatus.Renewed);

            contract.Status =
                ContractStatus.Renewed;*/

            _contractRepository.Update(contract);

            await _unitOfWork.SaveChangesAsync();

            await _auditLogRepository.AddAsync(new AuditLog
        {
            Action = "RENEW",
            EntityName = "Contract",
            EntityId = renewedContract.Id,
            PerformedBy = _userContext.UserId
        });

            await _recentActivityService.LogAsync(
                 module: "Renewal",
                 action: "Created",
                 description: $"Renewal {renewedContract.Title} ({renewedContract.ContractNumber}) created",
                 entityId: renewedContract.Id,
                 entityName: renewedContract.ContractNumber,
                 entityType: "Contract",
                 performedBy: _userContext.UserId
);

            await _unitOfWork.SaveChangesAsync();

            await _emailHelper.SendRenewedEmail(
                 renewedContract,
                 contract.Vendor.Email);
        }

        public async Task<IEnumerable<ContractDto>>GetRenewalsAsync(int contractId)
        {
            var renewals =
                await _contractRepository
                    .GetRenewalsAsync(contractId);

            return _mapper.Map<
                IEnumerable<ContractDto>>(renewals);
        }

        public async Task ApproveRenewalAsync(int id)
        {
            var renewal =
                await _contractRepository
                    .GetByIdAsync(id);

            if (renewal == null)
            {
                throw new Exception(
                    "Renewal contract not found");
            }

            if (renewal.Status !=
                ContractStatus.RenewalPendingApproval)
            {
                throw new Exception(
                    "Renewal is not pending approval");
            }

            ContractStateMachine.ValidateTransition(
                renewal.Status,
                ContractStatus.RenewalApproved);

            renewal.Status =
                ContractStatus.RenewalApproved;

            renewal.RenewalApprovedOn =
                DateTime.UtcNow;

            renewal.RenewalApprovedBy =
                _userContext.UserId;

            /*renewal.Status = ContractStatus.Active;


            if (renewal.ParentContractId.HasValue)
            {
                var oldContract =
                    await _contractRepository
                        .GetByIdAsync(
                            renewal.ParentContractId.Value);

                if (oldContract != null)
                {
                    oldContract.Status =
                        ContractStatus.Renewed;

                    _contractRepository
                        .Update(oldContract);
                }
            }*/

            _contractRepository.Update(renewal);

            await _unitOfWork.SaveChangesAsync();

            await _auditLogRepository.AddAsync(new AuditLog
               {
                   Action = "APPROVE_RENEWAL",
                   EntityName = "Contract",
                   EntityId = renewal.Id,
                   PerformedBy =
                     _userContext.UserId
              });

            await _recentActivityService.LogAsync(
                module: "Renewal",
                action: "Approved",
                description: $"Renewal {renewal.Title} ({renewal.ContractNumber}) approved",
                entityId: renewal.Id,
                entityName: renewal.ContractNumber,
                entityType: "Contract",
                performedBy: _userContext.UserId
             );

            await _unitOfWork.SaveChangesAsync();
        }

        public async Task ActivateRenewalAsync(int id)
        {
            var renewal =
                await _contractRepository
                    .GetByIdAsync(id);

            if (renewal == null)
            {
                throw new Exception(
                    "Renewal contract not found");
            }

            if (renewal.Status !=
                ContractStatus.RenewalApproved)
            {
                throw new Exception(
                    "Renewal is not approved");
            }

            ContractStateMachine.ValidateTransition(
                renewal.Status,
                ContractStatus.Active);

            renewal.Status =
                ContractStatus.Active;

            if (renewal.ParentContractId.HasValue)
            {
                var oldContract =
                    await _contractRepository
                        .GetByIdAsync(
                            renewal.ParentContractId.Value);

                if (oldContract != null)
                {
                    oldContract.Status =
                        ContractStatus.Renewed;

                    _contractRepository
                        .Update(oldContract);
                }
            }

            _contractRepository.Update(renewal);

            await _unitOfWork.SaveChangesAsync();

            await _auditLogRepository.AddAsync(
                new AuditLog
                {
                    Action = "ACTIVATE_RENEWAL",
                    EntityName = "Contract",
                    EntityId = renewal.Id,
                    PerformedBy =
                        _userContext.UserId
                });

            await _recentActivityService.LogAsync(
    module: "Renewal",
    action: "Activated",
    description: $"Renewal {renewal.Title} ({renewal.ContractNumber}) activated",
    entityId: renewal.Id,
    entityName: renewal.ContractNumber,
    entityType: "Contract",
    performedBy: _userContext.UserId
);

            await _unitOfWork.SaveChangesAsync();
        }

        public async Task RejectRenewalAsync(int id,string reason)
        {
            var renewal =
                await _contractRepository
                    .GetByIdAsync(id);

            if (renewal == null)
            {
                throw new Exception(
                    "Renewal contract not found");
            }

            if (renewal.Status !=
                ContractStatus.RenewalPendingApproval)
            {
                throw new Exception(
                    "Renewal is not pending approval");
            }

            ContractStateMachine.ValidateTransition(
                renewal.Status,
                ContractStatus.RenewalRejected);

            renewal.Status =
                ContractStatus.RenewalRejected;

            renewal.RejectionReason =
                reason;

            _contractRepository.Update(renewal);

            await _unitOfWork.SaveChangesAsync();

            await _auditLogRepository.AddAsync(new AuditLog
               {
                  Action = "REJECT_RENEWAL",
                  EntityName = "Contract",
                  EntityId = renewal.Id,
                  PerformedBy =
                     _userContext.UserId
                  });

            await _unitOfWork.SaveChangesAsync();

            await _recentActivityService.LogAsync(
    module: "Renewal",
    action: "Rejected",
    description: $"Renewal {renewal.Title} ({renewal.ContractNumber}) rejected",
    entityId: renewal.Id,
    entityName: renewal.ContractNumber,
    entityType: "Contract",
    performedBy: _userContext.UserId
);
        }

        public async Task TerminateAsync(int id,string reason)
        {
            var contract =
                await _contractRepository
                    .GetByIdAsync(id);

            if (contract == null)
                throw new Exception("Contract not found");

            if (string.IsNullOrWhiteSpace(reason))
                throw new Exception(
                    "Termination reason is required");

            if (contract.Status != ContractStatus.Active)
                throw new Exception(
                    "Only active contracts can be terminated");

            ContractStateMachine.ValidateTransition(
                contract.Status,
                ContractStatus.Terminated);

            contract.Status =
                ContractStatus.Terminated;

            contract.TerminatedBy =
                _userContext.UserId;

            contract.TerminatedOn =
                DateTime.UtcNow;

            contract.TerminationReason =
                reason;

            _contractRepository.Update(contract);

            await _unitOfWork.SaveChangesAsync();

            await _auditLogRepository.AddAsync(
                new AuditLog
                {
                    Action = "TERMINATE",
                    EntityName = "Contract",
                    EntityId = contract.Id,
                    PerformedBy = _userContext.UserId
                });

            await _recentActivityService.LogAsync(
    module: "Contract",
    action: "Terminated",
    description: $"Contract {contract.Title} ({contract.ContractNumber}) terminated",
    entityId: contract.Id,
    entityName: contract.ContractNumber,
    entityType: "Contract",
    performedBy: _userContext.UserId
);

            await _unitOfWork.SaveChangesAsync();

            /*await _emailHelper.SendTerminatedEmail(
                contract,
                contract.Vendor.Email,
                reason);*/
        }

        private bool CanEditContract(ContractStatus status)
        {
            return status == ContractStatus.Draft
                || status == ContractStatus.Rejected
                || status == ContractStatus.RenewalRejected;
        }
        public async Task<ContractReportDto> GetReportAsync(ContractReportFilterDto filter)
        {
            var contracts =
                await _contractRepository
                    .GetReportDataAsync(filter);

            return new ContractReportDto
            {
                TotalContracts =
                    contracts.Count(),

                ActiveContracts =
                    contracts.Count(x =>
                        x.Status == ContractStatus.Active),

                ExpiredContracts =
                    contracts.Count(x =>
                        x.Status == ContractStatus.Expired),

                PendingApprovalContracts =
                    contracts.Count(x =>
                        x.Status == ContractStatus.PendingApproval),

                ApprovedContracts =
                    contracts.Count(x =>
                        x.Status == ContractStatus.Approved),

                RejectedContracts =
                    contracts.Count(x =>
                        x.Status == ContractStatus.Rejected),

                TotalContractValue =
                    contracts.Sum(x =>
                        x.ContractValue)
            };
        }


        public async Task<byte[]> ExportContractsAsync(ContractReportFilterDto filter)
        {
            ExcelPackage.License.SetNonCommercialPersonal("Abhishek");

            var contracts =
                await _contractRepository
                    .GetReportDataAsync(filter);

            using var package = new ExcelPackage();

            var worksheet =
                package.Workbook.Worksheets
                    .Add("Contracts");

            worksheet.Cells[1, 1].Value = "Contract Number";
            worksheet.Cells[1, 2].Value = "Title";
            worksheet.Cells[1, 3].Value = "Vendor";
            worksheet.Cells[1, 4].Value = "Status";
            worksheet.Cells[1, 5].Value = "Start Date";
            worksheet.Cells[1, 6].Value = "End Date";
            worksheet.Cells[1, 7].Value = "Contract Value";

            int row = 2;

            foreach (var contract in contracts)
            {
                worksheet.Cells[row, 1].Value =
                    contract.ContractNumber;

                worksheet.Cells[row, 2].Value =
                    contract.Title;

                worksheet.Cells[row, 3].Value =
                    contract.Vendor.VendorName;

                worksheet.Cells[row, 4].Value =
                    contract.Status.ToString();

                worksheet.Cells[row, 5].Value =
                    contract.StartDate.ToString("dd-MMM-yyyy");

                worksheet.Cells[row, 6].Value =
                    contract.EndDate.ToString("dd-MMM-yyyy");

                worksheet.Cells[row, 7].Value =
                    contract.ContractValue;

                row++;
            }

            worksheet.Cells.AutoFitColumns();

            return package.GetAsByteArray();
        }

     



    }
}