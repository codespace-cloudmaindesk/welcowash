using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace WelcoWash.Localization
{
    public static class WelcoWashLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(WelcoWashConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(WelcoWashLocalizationConfigurer).GetAssembly(),
                        "WelcoWash.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
