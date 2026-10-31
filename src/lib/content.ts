export type Lang = "pt" | "en";
type L = Record<Lang, string>;

export const profile = {
  name: "Eros Karsburg",
  fullName: "Eros Karsburg Dias da Rosa",
  email: "eroskarsburg@gmail.com",
  github: "https://github.com/eroskarsburg",
  linkedin: "https://www.linkedin.com/in/eros-karsburg-05630b221/",
  location: "Canoas, RS — Brasil",
};

export const ui = {
  pt: {
    nav: { about: "Sobre", experience: "Experiência", skills: "Skills", education: "Formação", contact: "Contato" },
    hero: {
      title: "Full Stack Software Engineer · .NET / C#",
      headline: "Aplicações web, APIs e backoffices para produtos de pagamento.",
      sub: "Mais de 3 anos de experiência em .NET e C#. Planejo cada projeto do escopo ao monitoramento, conduzo integrações com parceiros, refatoro aplicações e crio novas interfaces em sistemas de pagamento de missão crítica.",
      ctaExperience: "Ver experiência",
      ctaContact: "Entrar em contato",
      facts: [
        { label: "Experiência", value: "3+ anos com .NET e C#" },
        { label: "Foco", value: "Web apps · APIs · Backoffices" },
        { label: "Domínio", value: "Sistemas de pagamento" },
        { label: "Formação", value: "Ciência da Computação (7º sem.)" },
      ],
    },
    about: {
      eyebrow: "Sobre",
      title: "Resumo",
      body: [
        "Full Stack Software Engineer com mais de 3 anos de experiência em .NET e C#, especializado em aplicações web, APIs e sistemas de pagamento de missão crítica.",
        "Sólida vivência em arquitetura e desenvolvimento de software, liderança técnica e mentoria de time, com foco em qualidade de código, escalabilidade e boas práticas. Experiência com Scrum, integrações com terceiros e ambientes de alta disponibilidade.",
      ],
    },
    experience: {
      eyebrow: "Experiência",
      title: "Experiência profissional",
      company: "Rodosoft Tecnologia",
      companyNote: "Presencial · desde dezembro de 2021",
      companySub: "Três cargos na mesma empresa, de estagiário de suporte a desenvolvedor.",
      tools: "Ferramentas",
      current: "Atual",
    },
    skills: { eyebrow: "Skills", title: "Tecnologias e ferramentas" },
    education: { eyebrow: "Formação", title: "Formação acadêmica", present: "presente" },
    projects: { eyebrow: "GitHub", title: "Projetos pessoais e acadêmicos", all: "Ver todos os repositórios" },
    contact: {
      eyebrow: "Contato",
      title: "Vamos conversar?",
      sub: "Aberto a boas conversas sobre .NET, APIs, backoffices e sistemas de pagamento.",
    },
  },
  en: {
    nav: { about: "About", experience: "Experience", skills: "Skills", education: "Education", contact: "Contact" },
    hero: {
      title: "Full Stack Software Engineer · .NET / C#",
      headline: "Web applications, APIs and back offices for payment products.",
      sub: "3+ years of experience with .NET and C#. I plan each project from scope to monitoring, lead partner integrations, refactor applications and build new interfaces for mission-critical payment systems.",
      ctaExperience: "See experience",
      ctaContact: "Get in touch",
      facts: [
        { label: "Experience", value: "3+ years with .NET and C#" },
        { label: "Focus", value: "Web apps · APIs · Back offices" },
        { label: "Domain", value: "Payment systems" },
        { label: "Education", value: "Computer Science (7th sem.)" },
      ],
    },
    about: {
      eyebrow: "About",
      title: "Summary",
      body: [
        "Full Stack Software Engineer with over 3 years of experience in .NET and C#, specializing in web applications, APIs and mission-critical payment systems.",
        "Strong hands-on background in software architecture, development, technical leadership and team mentoring, with a focus on code quality, scalability and best practices. Experienced with Scrum, third-party integrations and high-availability environments.",
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "Professional experience",
      company: "Rodosoft Tecnologia",
      companyNote: "On-site · since December 2021",
      companySub: "Three roles at the same company, from support intern to developer.",
      tools: "Tools",
      current: "Current",
    },
    skills: { eyebrow: "Skills", title: "Technologies and tools" },
    education: { eyebrow: "Education", title: "Education", present: "present" },
    projects: { eyebrow: "GitHub", title: "Personal and academic projects", all: "See all repositories" },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk?",
      sub: "Open to good conversations about .NET, APIs, back offices and payment systems.",
    },
  },
} as const;

export type Dict = (typeof ui)[Lang];

export type Role = {
  title: L;
  period: L;
  current?: boolean;
  intro?: L;
  groups?: { title: L; body: L }[];
  bullets?: L[];
  tools?: string[];
};

export const roles: Role[] = [
  {
    title: { pt: "Software Developer", en: "Software Developer" },
    period: { pt: "março de 2023 — presente", en: "March 2023 — present" },
    current: true,
    groups: [
      {
        title: { pt: "Integrações de pagamento", en: "Payment integrations" },
        body: {
          pt: "Condução de novas integrações nos produtos de pagamento, planejando tudo: do escopo à implementação, à entrega e ao monitoramento. Ownership completo de um novo fluxo de pagamento, incluindo a integração com uma nova adquirente, regras de negócio complexas e consumo de APIs externas em .NET e C#.",
          en: "Leading new integrations in the payment products, planning everything: from scope to implementation, delivery and monitoring. Full ownership of a new payment flow, including the integration of a new payment acquirer, complex business rules and consumption of external APIs using .NET and C#.",
        },
      },
      {
        title: { pt: "Parceiros e outros times", en: "Partners and other teams" },
        body: {
          pt: "Contato direto com as equipes técnicas dos parceiros para alinhar os detalhes das integrações e viabilizar as entregas, além de trabalho próximo com outros times de desenvolvimento da empresa.",
          en: "Direct contact with the partners' technical teams to align integration details and make deliveries possible, plus close work with other development teams inside the company.",
        },
      },
      {
        title: { pt: "Web apps e backoffices", en: "Web apps and back offices" },
        body: {
          pt: "Desenvolvimento e manutenção de aplicações ASP.NET Core e ASP.NET MVC, incluindo backoffices, e criação de novas interfaces.",
          en: "Building and maintaining ASP.NET Core and ASP.NET MVC web applications, including back offices, and creating new interfaces.",
        },
      },
      {
        title: { pt: "APIs", en: "APIs" },
        body: {
          pt: "Desenvolvimento e manutenção de ASP.NET Core Web APIs RESTful, seguindo boas práticas de arquitetura, performance e escalabilidade.",
          en: "Building and maintaining RESTful ASP.NET Core Web APIs following best practices for architecture, performance and scalability.",
        },
      },
      {
        title: { pt: "Refatoração e qualidade", en: "Refactoring and quality" },
        body: {
          pt: "Refatorações estruturais em APIs REST e aplicações web aplicando Clean Code, para melhorar a legibilidade e a manutenibilidade.",
          en: "Structural refactoring of RESTful APIs and web applications applying Clean Code principles to improve readability and maintainability.",
        },
      },
      {
        title: { pt: "Bancos de dados", en: "Databases" },
        body: {
          pt: "Criação, otimização e manutenção de queries SQL usadas por APIs e aplicações web, em MySQL, SQL Server e PostgreSQL.",
          en: "Creating, optimizing and maintaining SQL queries used across APIs and web applications on MySQL, SQL Server and PostgreSQL.",
        },
      },
      {
        title: { pt: "Documentação", en: "Documentation" },
        body: {
          pt: "Changelogs de versão, documentação detalhada de projetos e manuais de regras de negócio.",
          en: "Version changelogs, detailed project documentation and business rules manuals.",
        },
      },
      {
        title: { pt: "Time e metodologia", en: "Team and methodology" },
        body: {
          pt: "Suporte técnico e mentoria a estagiários. Participação ativa em times ágeis com Scrum, no planejamento e na entrega contínua.",
          en: "Technical support and mentoring for interns. Active participation in Scrum-based agile teams, contributing to planning and continuous delivery.",
        },
      },
    ],
    bullets: [
      {
        pt: "Também contribuí no app Android da empresa, em fluxos de compra, estorno e recuperação de tickets.",
        en: "I have also contributed to the company's Android app, on purchase, refund and ticket recovery flows.",
      },
    ],
    tools: ["C#", ".NET Framework", ".NET", "ASP.NET MVC", "ASP.NET Core", "Web API", "HTML/CSS", "JavaScript", "jQuery", "SQL Server", "MySQL", "PostgreSQL", "Bitbucket"],
  },
  {
    title: { pt: "Assistente de Suporte", en: "Support Assistant" },
    period: { pt: "abril de 2022 — fevereiro de 2023", en: "April 2022 — February 2023" },
    bullets: [
      {
        pt: "Desenvolvimento de uma aplicação web com funcionalidades e informações de apoio ao time de suporte técnico, melhorando a eficiência e a organização.",
        en: "Built a web application with features and information to support the technical support team, improving efficiency and organization.",
      },
      {
        pt: "Implantações remotas de sistemas desktop e bancos de dados para clientes; restauração de aplicações e bases corrompidas.",
        en: "Remote deployments of desktop systems and databases for clients; restoration of corrupted applications and databases.",
      },
      {
        pt: "Atendimento direto a clientes por chamadas e tickets, suporte consultivo e documentação de regras de negócio.",
        en: "Direct customer support through calls and tickets, consultative assistance and business rules documentation.",
      },
      {
        pt: "Apoio a estagiários em tickets e no entendimento dos produtos.",
        en: "Helped interns with support tickets and product understanding.",
      },
    ],
  },
  {
    title: { pt: "Estagiário de Suporte", en: "Support Intern" },
    period: { pt: "dezembro de 2021 — abril de 2022", en: "December 2021 — April 2022" },
    bullets: [
      {
        pt: "Apoio em implantações remotas de sistemas desktop e bancos de dados, garantindo a configuração inicial correta.",
        en: "Assisted remote deployments of desktop systems and databases, ensuring proper initial configuration.",
      },
      {
        pt: "Atuação direta no suporte técnico: atendimento de chamadas e abertura e resolução de tickets.",
        en: "Direct involvement in technical support: handling calls, opening and resolving tickets.",
      },
    ],
  },
];

export const skills: { group: L; items: string[] }[] = [
  { group: { pt: "Back-end e web", en: "Back end and web" }, items: ["C#", ".NET (5–10)", "ASP.NET Core", "ASP.NET MVC", "Web API / REST", "Blazor", "MudBlazor", "HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"] },
  { group: { pt: "Bancos de dados", en: "Databases" }, items: ["SQL Server", "MySQL", "PostgreSQL", "MySQL Workbench", "phpMyAdmin"] },
  { group: { pt: "Ferramentas", en: "Tools" }, items: ["Postman", "Swagger", "Bitbucket", "Git"] },
  { group: { pt: "Metodologias", en: "Methodologies" }, items: ["Agile", "Scrum", "Clean Code"] },
  { group: { pt: "Outras", en: "Also" }, items: ["Dart", "Flutter", "Python"] },
];

export const education: { school: string; place: string; period: L; title: L; note?: L }[] = [
  {
    school: "Universidade La Salle",
    place: "Canoas",
    period: { pt: "2023 — presente", en: "2023 — present" },
    title: { pt: "Bacharelado em Ciência da Computação", en: "Bachelor in Computer Science" },
    note: { pt: "Cursando o 7º semestre", en: "Currently in the 7th semester" },
  },
  {
    school: "Faculdade de Tecnologia SENAI",
    place: "Porto Alegre",
    period: { pt: "2021 — 2022", en: "2021 — 2022" },
    title: { pt: "Técnico em Desenvolvimento de Sistemas", en: "Systems Development Technician" },
    note: { pt: "C, C#, .NET, Swagger, phpMyAdmin, VirtualBox, Arduino", en: "C, C#, .NET, Swagger, phpMyAdmin, VirtualBox, Arduino" },
  },
  {
    school: "Wizard by Pearson",
    place: "Canoas",
    period: { pt: "2012 — 2016", en: "2012 — 2016" },
    title: { pt: "Inglês", en: "English" },
    note: { pt: "Leitura, escrita e conversação sem grandes dificuldades", en: "I can talk, read and write without much difficulty" },
  },
];

export const projects: { name: string; lang: string; desc: L }[] = [
  {
    name: "mindcare-central-clinic",
    lang: "C#",
    desc: { pt: "Painel web de controle para uma clínica de saúde psicológica.", en: "A web control panel for a psychological health clinic." },
  },
  {
    name: "ls-ava",
    lang: "C#",
    desc: { pt: "Ambiente Virtual de Aprendizagem (AVA) para o ambiente escolar.", en: "Virtual Learning Environment (AVA) for schools." },
  },
  {
    name: "BPP",
    lang: "C#",
    desc: { pt: "Boas práticas de código baseadas em Clean Code, Refactoring e Design Patterns.", en: "Coding good practices based on Clean Code, Refactoring and Design Patterns." },
  },
  {
    name: "pivotal-api",
    lang: "C#",
    desc: { pt: "Projeto de Web API.", en: "Web API project." },
  },
];
