namespace Portfolio.Front.Localization;

public sealed class LocaleService
{
    public const string StorageKey = "portfolio-locale";

    public string Culture { get; private set; } = AppStrings.PtBr;

    public event Action? OnChange;

    public string T(string key) => AppStrings.Get(Culture, key);

    public string T(string key, params object[] args) => string.Format(T(key), args);

    public void SetCulture(string culture)
    {
        var normalized = Normalize(culture);
        if (Culture == normalized)
        {
            return;
        }

        Culture = normalized;
        OnChange?.Invoke();
    }

    public static string Normalize(string? culture)
    {
        if (string.Equals(culture, AppStrings.EnUs, StringComparison.OrdinalIgnoreCase)
            || string.Equals(culture, "en", StringComparison.OrdinalIgnoreCase)
            || string.Equals(culture, "en-US", StringComparison.OrdinalIgnoreCase))
        {
            return AppStrings.EnUs;
        }

        return AppStrings.PtBr;
    }
}
