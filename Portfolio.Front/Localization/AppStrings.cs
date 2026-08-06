namespace Portfolio.Front.Localization;

public static class AppStrings
{
    public const string PtBr = "pt-BR";
    public const string EnUs = "en-US";

    private static readonly Dictionary<string, Dictionary<string, string>> Strings = new()
    {
        [PtBr] = new()
        {
            ["Nav.Home"] = "Início",
            ["Nav.About"] = "Sobre",
            ["Nav.Skills"] = "Skills",
            ["Nav.Projects"] = "Projetos",
            ["Nav.Contact"] = "Contato",

            ["Hero.Status"] = "Disponível para projetos",
            ["Hero.Greeting"] = "Olá, eu sou",
            ["Hero.Name"] = "Eros Karsburg",
            ["Hero.Title"] = ".NET Software Developer",
            ["Hero.Description"] = "APIs, aplicações web e arquiteturas limpas com C#, ASP.NET Core e Blazor.",
            ["Hero.CtaPrimary"] = "Ver projetos",
            ["Hero.CtaSecondary"] = "Fale comigo",

            ["About.Title"] = "Sobre",
            ["About.Eyebrow"] = "Quem sou",
            ["About.Body"] = "Sou Eros Karsburg, desenvolvedor especializado no ecossistema .NET. Trabalho com backend, APIs REST e interfaces modernas em Blazor, sempre priorizando código limpo, testes e manutenibilidade. Transformo requisitos complexos em soluções simples, performáticas e fáceis de evoluir.",
            ["About.Stat1Value"] = "5+",
            ["About.Stat1Label"] = "Anos com .NET",
            ["About.Stat2Value"] = "20+",
            ["About.Stat2Label"] = "Projetos entregues",
            ["About.Stat3Value"] = "100%",
            ["About.Stat3Label"] = "Foco em qualidade",

            ["Skills.Title"] = "Stack",
            ["Skills.Subtitle"] = "Ferramentas que uso no dia a dia",

            ["Projects.Title"] = "Projetos",
            ["Projects.Subtitle"] = "Trabalhos e experimentos selecionados",
            ["Projects.KnowMore"] = "Ver detalhes",

            ["Project1.Name"] = "OrderFlow API",
            ["Project1.Tag"] = "Backend",
            ["Project1.Description"] = "API de pedidos com ASP.NET Core, JWT e fila de mensagens para processamento assíncrono.",
            ["Project2.Name"] = "Blazor Ops Dashboard",
            ["Project2.Tag"] = "Frontend",
            ["Project2.Description"] = "Dashboard em Blazor Server com monitoramento em tempo real e controle de permissões.",
            ["Project3.Name"] = "PayBridge",
            ["Project3.Tag"] = "Integração",
            ["Project3.Description"] = "Integração de pagamentos com webhooks, retries idempotentes e domínio desacoplado.",
            ["Project4.Name"] = "Catalog Sync",
            ["Project4.Tag"] = "Dados",
            ["Project4.Description"] = "Sincronização de catálogo via EF Core, jobs agendados e validação de consistência.",

            ["Contact.Title"] = "Vamos construir algo juntos",
            ["Contact.Description"] = "Aberto a oportunidades, freelas e colaborações. Se você precisa de APIs, apps .NET ou evoluir um produto, vamos conversar.",
            ["Contact.Cta"] = "Enviar e-mail",

            ["Footer.Credit"] = "© {0} Eros Karsburg",
            ["Footer.GitHub"] = "GitHub",
            ["Footer.LinkedIn"] = "LinkedIn",
            ["Footer.Email"] = "E-mail",

            ["Page.Title"] = "Eros Karsburg — Software Developer",
            ["Lang.Pt"] = "PT",
            ["Lang.En"] = "EN",
        },
        [EnUs] = new()
        {
            ["Nav.Home"] = "Home",
            ["Nav.About"] = "About",
            ["Nav.Skills"] = "Skills",
            ["Nav.Projects"] = "Projects",
            ["Nav.Contact"] = "Contact",

            ["Hero.Status"] = "Available for projects",
            ["Hero.Greeting"] = "Hello, I'm",
            ["Hero.Name"] = "Eros Karsburg",
            ["Hero.Title"] = ".NET Software Developer",
            ["Hero.Description"] = "APIs, web apps, and clean architectures with C#, ASP.NET Core, and Blazor.",
            ["Hero.CtaPrimary"] = "View projects",
            ["Hero.CtaSecondary"] = "Get in touch",

            ["About.Title"] = "About",
            ["About.Eyebrow"] = "Who I am",
            ["About.Body"] = "I'm Eros Karsburg, a developer specialized in the .NET ecosystem. I work with backends, REST APIs, and modern Blazor UIs, always prioritizing clean code, testing, and maintainability. I turn complex requirements into simple, performant solutions that are easy to evolve.",
            ["About.Stat1Value"] = "5+",
            ["About.Stat1Label"] = "Years with .NET",
            ["About.Stat2Value"] = "20+",
            ["About.Stat2Label"] = "Projects shipped",
            ["About.Stat3Value"] = "100%",
            ["About.Stat3Label"] = "Quality focused",

            ["Skills.Title"] = "Stack",
            ["Skills.Subtitle"] = "Tools I use day to day",

            ["Projects.Title"] = "Projects",
            ["Projects.Subtitle"] = "Selected work and experiments",
            ["Projects.KnowMore"] = "View details",

            ["Project1.Name"] = "OrderFlow API",
            ["Project1.Tag"] = "Backend",
            ["Project1.Description"] = "Order API with ASP.NET Core, JWT, and a message queue for async processing.",
            ["Project2.Name"] = "Blazor Ops Dashboard",
            ["Project2.Tag"] = "Frontend",
            ["Project2.Description"] = "Blazor Server dashboard with real-time monitoring and permission control.",
            ["Project3.Name"] = "PayBridge",
            ["Project3.Tag"] = "Integration",
            ["Project3.Description"] = "Payment integration with webhooks, idempotent retries, and a decoupled domain.",
            ["Project4.Name"] = "Catalog Sync",
            ["Project4.Tag"] = "Data",
            ["Project4.Description"] = "Catalog sync via EF Core, scheduled jobs, and consistency validation.",

            ["Contact.Title"] = "Let's build something together",
            ["Contact.Description"] = "Open to opportunities, freelance work, and collaborations. If you need APIs, .NET apps, or to evolve a product, let's talk.",
            ["Contact.Cta"] = "Send email",

            ["Footer.Credit"] = "© {0} Eros Karsburg",
            ["Footer.GitHub"] = "GitHub",
            ["Footer.LinkedIn"] = "LinkedIn",
            ["Footer.Email"] = "Email",

            ["Page.Title"] = "Eros Karsburg — Software Developer",
            ["Lang.Pt"] = "PT",
            ["Lang.En"] = "EN",
        }
    };

    public static string Get(string culture, string key)
    {
        if (Strings.TryGetValue(culture, out var map) && map.TryGetValue(key, out var value))
        {
            return value;
        }

        if (Strings[PtBr].TryGetValue(key, out var fallback))
        {
            return fallback;
        }

        return key;
    }
}
