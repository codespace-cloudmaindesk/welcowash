using WelcoWash.Debugging;

namespace WelcoWash
{
    public class WelcoWashConsts
    {
        public const string LocalizationSourceName = "WelcoWash";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "c2e85e2839144175af626b6ae078eada";
    }
}
