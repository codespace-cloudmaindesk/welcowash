using System.Threading.Tasks;
using WelcoWash.Models.TokenAuth;
using WelcoWash.Web.Controllers;
using Shouldly;
using Xunit;

namespace WelcoWash.Web.Tests.Controllers
{
    public class HomeController_Tests: WelcoWashWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}