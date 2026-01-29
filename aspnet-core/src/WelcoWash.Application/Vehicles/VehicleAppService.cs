using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using WelcoWash.Domain.Vehicles;
using WelcoWash.Vehicles.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WelcoWash.Vehicles
{
    public class VehicleAppService
        : AsyncCrudAppService<Vehicle, VehicleDto, Guid, PagedAndSortedResultRequestDto, VehicleDto, VehicleDto>,
          IVehicleAppService
    {
        private readonly IRepository<Vehicle, Guid> _vehicleRepository;

        public VehicleAppService(IRepository<Vehicle, Guid> vehicleRepository)
            : base(vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }

        public override async Task<VehicleDto> CreateAsync(VehicleDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "Vehicle data cannot be null.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = ObjectMapper.Map<Vehicle>(input);
                var result = await _vehicleRepository.InsertAsync(entity);

                return ObjectMapper.Map<VehicleDto>(result);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating Vehicle", ex);
                throw new UserFriendlyException(
                    $"Could not create Vehicle. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task<PagedResultDto<VehicleDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
        {
            try
            {
                var query = Repository.GetAll();
                var totalCount = await AsyncQueryableExecuter.CountAsync(query);

                var items = await AsyncQueryableExecuter.ToListAsync(
                    query.OrderBy(x => x.Id)
                         .Skip(input.SkipCount)
                         .Take(input.MaxResultCount)
                );

                return new PagedResultDto<VehicleDto>(
                    totalCount,
                    ObjectMapper.Map<List<VehicleDto>>(items)
                );
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving Vehicles", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Vehicles. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task<VehicleDto> GetAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid Vehicle ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = await _vehicleRepository.GetAsync(input.Id);

                if (entity == null)
                {
                    throw new UserFriendlyException(
                        "Vehicle not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                return ObjectMapper.Map<VehicleDto>(entity);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error retrieving Vehicle with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Vehicle. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task<VehicleDto> UpdateAsync(VehicleDto input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid Vehicle data.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = await _vehicleRepository.GetAsync(input.Id);
                ObjectMapper.Map(input, entity);

                var updated = await _vehicleRepository.UpdateAsync(entity);
                return ObjectMapper.Map<VehicleDto>(updated);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error updating Vehicle with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not update Vehicle. Error: {ex.Message}",
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
                        "Invalid Vehicle ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                await _vehicleRepository.DeleteAsync(input.Id);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error deleting Vehicle with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not delete Vehicle. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }
    }
}
