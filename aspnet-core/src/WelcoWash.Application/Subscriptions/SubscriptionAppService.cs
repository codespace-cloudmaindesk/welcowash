using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using WelcoWash.Domain.Subscriptions;
using WelcoWash.Subscriptions.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WelcoWash.Subscriptions
{
    public class SubscriptionAppService
        : AsyncCrudAppService<Subscription, SubscriptionDto, Guid, PagedAndSortedResultRequestDto, SubscriptionDto, SubscriptionDto>,
          ISubscriptionAppService
    {
        private readonly IRepository<Subscription, Guid> _subscriptionRepository;

        public SubscriptionAppService(IRepository<Subscription, Guid> subscriptionRepository)
            : base(subscriptionRepository)
        {
            _subscriptionRepository = subscriptionRepository;
        }

        public override async Task<SubscriptionDto> CreateAsync(SubscriptionDto input)
        {
            try
            {
                if (input == null)
                {
                    throw new UserFriendlyException(
                        "Subscription data cannot be null.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = ObjectMapper.Map<Subscription>(input);
                var result = await _subscriptionRepository.InsertAsync(entity);

                return ObjectMapper.Map<SubscriptionDto>(result);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error("Error creating Subscription", ex);
                throw new UserFriendlyException(
                    $"Could not create Subscription. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task<PagedResultDto<SubscriptionDto>> GetAllAsync(PagedAndSortedResultRequestDto input)
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

                return new PagedResultDto<SubscriptionDto>(
                    totalCount,
                    ObjectMapper.Map<List<SubscriptionDto>>(items)
                );
            }
            catch (Exception ex)
            {
                Logger.Error("Error retrieving Subscriptions", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Subscriptions. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task<SubscriptionDto> GetAsync(EntityDto<Guid> input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid Subscription ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = await _subscriptionRepository.GetAsync(input.Id);

                if (entity == null)
                {
                    throw new UserFriendlyException(
                        "Subscription not found.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                return ObjectMapper.Map<SubscriptionDto>(entity);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error retrieving Subscription with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not retrieve Subscription. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }

        public override async Task<SubscriptionDto> UpdateAsync(SubscriptionDto input)
        {
            try
            {
                if (input == null || input.Id == Guid.Empty)
                {
                    throw new UserFriendlyException(
                        "Invalid Subscription data.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                var entity = await _subscriptionRepository.GetAsync(input.Id);
                ObjectMapper.Map(input, entity);

                var updated = await _subscriptionRepository.UpdateAsync(entity);
                return ObjectMapper.Map<SubscriptionDto>(updated);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error updating Subscription with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not update Subscription. Error: {ex.Message}",
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
                        "Invalid Subscription ID.",
                        Abp.Logging.LogSeverity.Warn
                    );
                }

                await _subscriptionRepository.DeleteAsync(input.Id);
            }
            catch (UserFriendlyException)
            {
                throw;
            }
            catch (Exception ex)
            {
                Logger.Error($"Error deleting Subscription with ID {input?.Id}", ex);
                throw new UserFriendlyException(
                    $"Could not delete Subscription. Error: {ex.Message}",
                    Abp.Logging.LogSeverity.Error
                );
            }
        }
    }
}
