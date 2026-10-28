export type Lang = "pt" | "en";

export const profile = {
  name: "Eros Karsburg",
  fullName: "Eros Karsburg Dias da Rosa",
  email: "eroskarsburg@gmail.com",
  github: "https://github.com/eroskarsburg",
  githubUser: "eroskarsburg",
  linkedin: "https://www.linkedin.com/in/eros-karsburg-05630b221/",
  location: "Canoas, RS — Brasil",
  timezone: "America/Sao_Paulo",
};

export const marquee = [
  "C#",
  ".NET",
  "ASP.NET Core",
  "Blazor",
  "Flutter",
  "Dart",
  "SQL Server",
  "PostgreSQL",
  "MySQL",
  "JavaScript",
  "Python",
  "REST APIs",
  "Clean Code",
  "Scrum",
];

export type Job = {
  hash: string;
  branch: string;
  role: Record<Lang, string>;
  period: Record<Lang, string>;
  tags: string[];
  bullets: Record<Lang, { title: string; body: string }[]>;
};

export const jobs: Job[] = [
  {
    hash: "a7f3c91",
    branch: "HEAD -> developer",
    role: { pt: "Software Developer", en: "Software Developer" },
    period: { pt: "mar 2023 — presente", en: "Mar 2023 — present" },
    tags: ["C#", ".NET", "ASP.NET MVC", "Web API", "Flutter", "Dart", "SQL Server", "MySQL", "PostgreSQL", "jQuery"],
    bullets: {
      pt: [
        { title: "Fluxo de pagamento", body: "Ownership completo de um novo fluxo de pagamento: integração com nova adquirente, regras de negócio complexas e consumo de APIs externas em .NET/C#." },
        { title: "Mobile", body: "Contribuição ativa no app Android principal da empresa: fluxos ponta a ponta de compra, estorno e recuperação de tickets." },
        { title: "Web Apps & APIs", body: "Desenvolvimento e manutenção de ASP.NET Core Web Apps e Web APIs com foco em arquitetura, performance e escalabilidade." },
        { title: "Refatoração", body: "Refatorações estruturais em APIs RESTful aplicando Clean Code para legibilidade e manutenibilidade." },
        { title: "Bancos de dados", body: "Criação, otimização e manutenção de queries SQL em MySQL, SQL Server e PostgreSQL." },
        { title: "Mentoria", body: "Suporte técnico a estagiários, incentivando boas práticas e crescimento técnico." },
      ],
      en: [
        { title: "Payment flow", body: "Full ownership of a new payment flow: integrating a new acquirer, complex business rules and external API consumption with .NET/C#." },
        { title: "Mobile", body: "Active contributor to the company's main Android app: end-to-end purchase, refund and ticket recovery flows." },
        { title: "Web Apps & APIs", body: "Building and maintaining ASP.NET Core Web Apps and Web APIs with a focus on architecture, performance and scalability." },
        { title: "Refactoring", body: "Structural refactoring of RESTful APIs applying Clean Code for readability and maintainability." },
        { title: "Databases", body: "Creating, optimizing and maintaining SQL queries on MySQL, SQL Server and PostgreSQL." },
        { title: "Mentoring", body: "Technical support for interns, fostering best practices and technical growth." },
      ],
    },
  },
  {
    hash: "4be0d2e",
    branch: "support-assistance",
    role: { pt: "Assistente de Suporte", en: "Support Assistant" },
    period: { pt: "abr 2022 — fev 2023", en: "Apr 2022 — Feb 2023" },
    tags: ["Web App", "Deploy", "Databases", "Docs"],
    bullets: {
      pt: [
        { title: "Ferramenta interna", body: "Desenvolvi uma aplicação web com features e informações para apoiar o time de suporte técnico." },
        { title: "Deploy & recuperação", body: "Implantações remotas de sistemas desktop e bancos de dados; restauração de aplicações e bases corrompidas." },
        { title: "Atendimento consultivo", body: "Diagnóstico de problemas via chamadas e tickets, documentação de regras de negócio." },
      ],
      en: [
        { title: "Internal tooling", body: "Built a web app with features and information to support the technical support team." },
        { title: "Deploy & recovery", body: "Remote deployments of desktop systems and databases; restoration of corrupted apps and databases." },
        { title: "Consultative support", body: "Diagnosing issues through calls and tickets, documenting business rules." },
      ],
    },
  },
  {
    hash: "19c5a07",
    branch: "support-intern",
    role: { pt: "Estagiário de Suporte", en: "Support Intern" },
    period: { pt: "dez 2021 — abr 2022", en: "Dec 2021 — Apr 2022" },
    tags: ["Support", "Deploy"],
    bullets: {
      pt: [
        { title: "git init", body: "Onde tudo começou: apoio em implantações remotas e atendimento técnico, abrindo e resolvendo chamados." },
      ],
      en: [
        { title: "git init", body: "Where it all started: assisting remote deployments and technical support, opening and resolving tickets." },
      ],
    },
  },
];

export type Project = {
  name: string;
  repo: string;
  lang: string;
  color: string;
  desc: Record<Lang, string>;
  kind: Record<Lang, string>;
};

export const projects: Project[] = [
  {
    name: "api-structure",
    repo: "api-structure",
    lang: "C#",
    color: "#178600",
    kind: { pt: "Arquitetura", en: "Architecture" },
    desc: {
      pt: "Estrutura base de Web API em .NET com camadas bem definidas — o esqueleto que eu uso pra começar serviços limpos.",
      en: "A layered .NET Web API foundation — the skeleton I use to kick off clean services.",
    },
  },
  {
    name: "mindcare-central-clinic",
    repo: "mindcare-central-clinic",
    lang: "C#",
    color: "#178600",
    kind: { pt: "Web App", en: "Web App" },
    desc: {
      pt: "Painel de controle web para uma clínica de saúde psicológica: agenda, pacientes e acompanhamento.",
      en: "A web control panel for a psychological health clinic: scheduling, patients and follow-ups.",
    },
  },
  {
    name: "pivotal-api",
    repo: "pivotal-api",
    lang: "C#",
    color: "#178600",
    kind: { pt: "Web API", en: "Web API" },
    desc: {
      pt: "Web API REST em ASP.NET Core explorando boas práticas de rotas, DTOs e persistência.",
      en: "REST Web API in ASP.NET Core exploring good practices for routing, DTOs and persistence.",
    },
  },
  {
    name: "ls-ava",
    repo: "ls-ava",
    lang: "C#",
    color: "#178600",
    kind: { pt: "Universidade", en: "University" },
    desc: {
      pt: "Ambiente Virtual de Aprendizagem (AVA) — plataforma escolar construída na La Salle.",
      en: "Virtual Learning Environment (AVA) — a school platform built at La Salle.",
    },
  },
  {
    name: "pygame_cgraph",
    repo: "pygame_cgraph",
    lang: "Python",
    color: "#3572A5",
    kind: { pt: "Computação Gráfica", en: "Computer Graphics" },
    desc: {
      pt: "Experimentos de computação gráfica com Pygame: transformações, rasterização e renderização na mão.",
      en: "Computer graphics experiments with Pygame: transforms, rasterization and hand-rolled rendering.",
    },
  },
  {
    name: "BPP",
    repo: "BPP",
    lang: "C#",
    color: "#178600",
    kind: { pt: "Boas práticas", en: "Best practices" },
    desc: {
      pt: "Estudos de Clean Code, Refactoring e Design Patterns aplicados em C#.",
      en: "Clean Code, Refactoring and Design Patterns studies applied in C#.",
    },
  },
];

export const stack = [
  { group: "Languages & Frameworks", items: ["C#", ".NET 5–10", "ASP.NET", "Blazor", "MudBlazor", "Dart", "Flutter", "Python", "JavaScript", "jQuery", "HTML", "CSS", "Bootstrap"] },
  { group: "Databases", items: ["SQL Server", "MySQL", "PostgreSQL", "MySQL Workbench", "phpMyAdmin"] },
  { group: "Tools", items: ["Postman", "Swagger", "Bitbucket", "Git", "Android Studio", "Visual Studio"] },
  { group: "Methodologies", items: ["Agile", "Scrum", "Clean Code", "Code Review"] },
];

export const education = [
  {
    school: "Universidade La Salle",
    place: "Canoas",
    period: "2023 — ",
    title: { pt: "Bacharelado em Ciência da Computação", en: "B.Sc. in Computer Science" },
    note: { pt: "7º semestre", en: "7th semester" },
    progress: 0.85,
  },
  {
    school: "Faculdade de Tecnologia SENAI",
    place: "Porto Alegre",
    period: "2021 — 2022",
    title: { pt: "Técnico em Desenvolvimento de Sistemas", en: "Systems Development Technician" },
    note: { pt: "C, C#, .NET, Arduino, low & high level", en: "C, C#, .NET, Arduino, low & high level" },
    progress: 1,
  },
  {
    school: "Wizard by Pearson",
    place: "Canoas",
    period: "2012 — 2016",
    title: { pt: "Inglês", en: "English" },
    note: { pt: "Leitura, escrita e conversação", en: "Reading, writing and speaking" },
    progress: 1,
  },
];

export const t = {
  pt: {
    nav: { about: "Sobre", flow: "Pagamentos", work: "Experiência", projects: "Projetos", stack: "Stack", contact: "Contato" },
    terminalHint: "terminal",
    hero: {
      status: "Disponível para novos desafios",
      role: "Full Stack Software Engineer",
      line1: "Eu construo sistemas",
      line2: "que não podem cair.",
      sub: "3+ anos com .NET e C# em aplicações web, APIs e sistemas de pagamento de missão crítica. Hoje no time de desenvolvimento da Rodosoft.",
      ctaWork: "Ver trabalho",
      ctaTalk: "Falar comigo",
      local: "Hora local",
      lens: "passe o mouse ou toque — raio-x",
          },
    about: {
      eyebrow: "01 / Sobre",
      text: "Comecei atendendo chamados de suporte e hoje desenvolvo fluxos de pagamento ponta a ponta. Essa trajetória me deu algo raro: entendo o código e entendo quem sofre quando ele quebra. Gosto de arquitetura limpa, código legível, documentação que alguém realmente lê e de ajudar quem está chegando agora.",
      stats: [
        { value: 3, suffix: "+", label: "anos com .NET & C#" },
        { value: 3, suffix: "", label: "cargos na mesma empresa" },
        { value: 37, suffix: "", label: "repositórios públicos" },
        { value: 7, suffix: "º", label: "semestre de Ciência da Computação" },
      ],
    },
    flow: {
      eyebrow: "02 / Missão crítica",
      title: "Cada request é dinheiro de alguém.",
      sub: "Integração de adquirentes, regras de negócio complexas, estornos e alta disponibilidade. Abaixo, uma simulação do tipo de fluxo que eu construo — ao vivo.",
      approved: "APROVADA",
      declined: "NEGADA",
      log: "transaction.log",
      fire: "Disparar transação",
      nodes: ["App / POS", "API .NET", "Regras", "Adquirente", "Emissor"],
      tps: "transações",
      rate: "aprovação",
      latency: "latência média",
    },
    work: { eyebrow: "03 / Experiência", title: "git log --career", company: "Rodosoft Tecnologia", note: "Mesma empresa, três commits. De estagiário de suporte a desenvolvedor." },
    projects: { eyebrow: "04 / Projetos", title: "Coisas que eu escrevi", open: "abrir repo", live: "Atividade recente no GitHub", loading: "buscando commits…", all: "ver todos os repositórios" },
    stack: { eyebrow: "05 / Stack", title: "Dependências instaladas", restore: "dotnet restore", restored: "Restauração concluída" },
    edu: { eyebrow: "06 / Formação", title: "Formação" },
    contact: {
      eyebrow: "07 / Contato",
      title1: "Vamos construir",
      title2: "algo que dure?",
      sub: "Aberto a oportunidades, projetos e boas conversas sobre .NET, arquitetura e sistemas de pagamento.",
      copy: "clique para copiar",
      copied: "copiado!",
    },
    footer: "Construído do zero com Next.js, React, TypeScript, Tailwind e Motion.",
  },
  en: {
    nav: { about: "About", flow: "Payments", work: "Experience", projects: "Projects", stack: "Stack", contact: "Contact" },
    terminalHint: "terminal",
    hero: {
      status: "Open to new challenges",
      role: "Full Stack Software Engineer",
      line1: "I build systems",
      line2: "that can't go down.",
      sub: "3+ years with .NET and C# across web apps, APIs and mission-critical payment systems. Currently on the development team at Rodosoft.",
      ctaWork: "See my work",
      ctaTalk: "Get in touch",
      local: "Local time",
      lens: "hover or tap — x-ray mode",
          },
    about: {
      eyebrow: "01 / About",
      text: "I started out answering support tickets and today I build end-to-end payment flows. That path gave me something rare: I understand the code and I understand who suffers when it breaks. I care about clean architecture, readable code, documentation people actually read, and helping newcomers grow.",
      stats: [
        { value: 3, suffix: "+", label: "years with .NET & C#" },
        { value: 3, suffix: "", label: "roles at the same company" },
        { value: 37, suffix: "", label: "public repositories" },
        { value: 7, suffix: "th", label: "semester of Computer Science" },
      ],
    },
    flow: {
      eyebrow: "02 / Mission critical",
      title: "Every request is someone's money.",
      sub: "Acquirer integrations, complex business rules, refunds and high availability. Below is a live simulation of the kind of flow I build.",
      approved: "APPROVED",
      declined: "DECLINED",
      log: "transaction.log",
      fire: "Fire a transaction",
      nodes: ["App / POS", ".NET API", "Rules", "Acquirer", "Issuer"],
      tps: "transactions",
      rate: "approval",
      latency: "avg latency",
    },
    work: { eyebrow: "03 / Experience", title: "git log --career", company: "Rodosoft Tecnologia", note: "Same company, three commits. From support intern to developer." },
    projects: { eyebrow: "04 / Projects", title: "Things I wrote", open: "open repo", live: "Recent GitHub activity", loading: "fetching commits…", all: "see all repositories" },
    stack: { eyebrow: "05 / Stack", title: "Installed dependencies", restore: "dotnet restore", restored: "Restore complete" },
    edu: { eyebrow: "06 / Education", title: "Education" },
    contact: {
      eyebrow: "07 / Contact",
      title1: "Shall we build",
      title2: "something that lasts?",
      sub: "Open to opportunities, projects and good conversations about .NET, architecture and payment systems.",
      copy: "click to copy",
      copied: "copied!",
    },
    footer: "Built from scratch with Next.js, React, TypeScript, Tailwind and Motion.",
  },
} as const;

export type Dict = (typeof t)[Lang];
