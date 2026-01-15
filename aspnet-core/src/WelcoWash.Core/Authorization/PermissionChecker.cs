using Abp.Authorization;
using WelcoWash.Authorization.Roles;
using WelcoWash.Authorization.Users;

namespace WelcoWash.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
