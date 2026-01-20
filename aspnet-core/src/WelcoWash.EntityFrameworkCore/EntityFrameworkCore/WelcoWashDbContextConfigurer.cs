using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace WelcoWash.EntityFrameworkCore
{
    public static class WelcoWashDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<WelcoWashDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<WelcoWashDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
