using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using WelcoWash.Domain.ServiceOfferings;
using WelcoWash.ServiceOfferings.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WelcoWash.ServiceOfferings
{
    public class ServiceOfferingAppService
        : AsyncCrudAppService<ServiceOffering, ServiceOfferingDto, Guid, PagedAndSortedResultRequestDto, ServiceOfferingDto, ServiceOfferingDto>,
          IServiceOfferingAppService
    {
        private readonly IRepository<ServiceOffering, Guid> _serviceOfferingRepository;

        public ServiceOfferingAppService(IRepository<ServiceOffering, Guid> serviceOfferingRepository)
            : base(serviceOfferingRepository)
        {
            _serviceOfferingRepository = serviceOfferingRepository;
        }

        public override async Task<ServiceOfferingDto> CreateAsync(ServiceOfferingDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "ServiceOffering data cannot be null.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = ObjectMapper.Map<ServiceOffering>(input);
                var result = await _serviceOfferingRepository.InsertAsync(entity);

                return ObjectMapper.Map<ServiceOfferingDto>(result);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating ServiceOffering", ex);
                throw new UserFriendlyException(
                    $"Could not create ServiceOffering. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task<PagedResultDto<ServiceOfferingDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            try
            {
                var query = Repository.GetAll();
                query = ApplySorting(query, input);
                var totalCount = await AsyncQueryableExecuter.CountAsync(query);

                var items = await AsyncQueryableExecuter.ToListAsync(
                    query.Skip(input.SkipCount)
                         .Take(input.MaxResultCount)
                );

                return new PagedResultDto<ServiceOfferingDto>(
                    totalCount,
                    ObjectMapper.Map<List<ServiceOfferingDto>>(items)
                );
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving ServiceOfferings", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve ServiceOfferings. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task<ServiceOfferingDto> GetAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid ServiceOffering ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = await _serviceOfferingRepository.GetAsync(input.Id);

                if (entity == null)
                {
                    throw new UserFriendlyException(
                        "ServiceOffering not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                return ObjectMapper.Map<ServiceOfferingDto>(entity);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error retrieving ServiceOffering with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve ServiceOffering. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task<ServiceOfferingDto> UpdateAsync(ServiceOfferingDto input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid ServiceOffering data.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = await _serviceOfferingRepository.GetAsync(input.Id);
                ObjectMapper.Map(input, entity);

                var updated = await _serviceOfferingRepository.UpdateAsync(entity);
                return ObjectMapper.Map<ServiceOfferingDto>(updated);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error updating ServiceOffering with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not update ServiceOffering. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task DeleteAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid ServiceOffering ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                await _serviceOfferingRepository.DeleteAsync(input.Id);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error deleting ServiceOffering with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not delete ServiceOffering. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }
    }
}
