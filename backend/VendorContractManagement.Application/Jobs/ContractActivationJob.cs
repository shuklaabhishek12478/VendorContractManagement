using VendorContractManagement.Application.Interfaces;
using VendorContractManagement.Application.Rules;
using VendorContractManagement.Domain.Enums;

namespace VendorContractManagement.Application.Jobs
{
    public class ContractActivationJob
    {
        private readonly IContractRepository _contractRepository;
        private readonly IUnitOfWork _unitOfWork;

        public ContractActivationJob(
            IContractRepository contractRepository,
            IUnitOfWork unitOfWork)
        {
            _contractRepository = contractRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task ActivateContractsAsync()
        {
            var contracts =
                await _contractRepository.GetAllAsync();

            var contractsToActivate =
                contracts.Where(x =>
                    x.Status == ContractStatus.Approved &&
                    x.StartDate <= DateTime.UtcNow);

            foreach (var contract in contractsToActivate)
            {
                ContractStateMachine.ValidateTransition(
                    contract.Status,
                    ContractStatus.Active);

                contract.Status = ContractStatus.Active;

                _contractRepository.Update(contract);
            }

            await _unitOfWork.SaveChangesAsync();
        }
    }
}