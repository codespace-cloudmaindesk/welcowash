using System.ComponentModel.DataAnnotations;

namespace WelcoWash.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}