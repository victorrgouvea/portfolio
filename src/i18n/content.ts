export type Lang = 'en' | 'pt';

export const EMAIL = 'victorgouvea28@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/victor-gouv%C3%AAa-605414286/';
export const GITHUB = 'https://github.com/victorrgouvea';

/** A statement is a list of fragments; `mark: true` fragments get the highlighter. */
type Fragment = string | { mark: string };

export interface CaseStudy {
  id: 'deepdive' | 'ventiur' | 'smartzap' | 'beatfit' | 'fintz';
  name: string;
  kind: string;
  years: string;
  role: string;
  summary: string;
  points: string[];
  stack: string[];
  /** Public page of the product, when it is still live. */
  links?: { label: string; href: string }[];
  /** Short strings used inside the illustration. */
  art: Record<string, string>;
}

export interface Content {
  meta: { title: string; description: string };
  nav: { work: string; experience: string; skills: string; contact: string; switchTo: string; switchLabel: string };
  hero: { role: string; lede: string; place: string; ctaWork: string; ctaCv: string; scroll: string };
  statement: Fragment[][];
  work: { title: string; intro: string; roleLabel: string; stackLabel: string };
  cases: CaseStudy[];
  more: {
    title: string;
    now: string;
    intro: string;
    groups: { name: string; items: { name: string; year: string; what: string; stack: string; href?: string; now?: boolean }[] }[];
    footnote: string;
  };
  experience: {
    title: string;
    jobs: { period: string; company: string; role: string; place: string; body: string[] }[];
    educationTitle: string;
    education: { period: string; school: string; degree: string };
  };
  skills: { title: string; groups: { name: string; items: string[] }[]; github: string };
  contact: { title: string; body: string; email: string; cv: string; cvHref: string };
  footer: string;
}

const en: Content = {
  meta: {
    title: 'Victor Gouvêa, software engineer',
    description:
      'Software engineer in Florianópolis, Brazil. I take web, mobile and AI products from concept to production.',
  },
  nav: {
    work: 'Work',
    experience: 'Experience',
    skills: 'Skills',
    contact: 'Contact',
    switchTo: 'PT',
    switchLabel: 'Ver em português',
  },
  hero: {
    role: 'Software engineer, applied AI',
    lede: 'I build web, mobile and AI products end to end, from the first conversation to a live product in production.',
    place: 'Florianópolis, Brazil',
    ctaWork: 'See the work',
    ctaCv: 'Download CV',
    scroll: 'Scroll',
  },
  statement: [
    [
      'For the past two and a half years at a startup I have built AI workflows that read court files of ',
      { mark: 'more than 10,000 pages' },
      ', a WhatsApp assistant that reached ',
      { mark: 'over 6,000 users' },
      ', and a platform that organizes ',
      { mark: '5,021 startups' },
      '.',
    ],
    [
      'Client project or in-house product, I take it from scope to production on my own, then ',
      { mark: 'keep shaping it around how people use it' },
      '.',
    ],
  ],
  work: {
    title: 'Selected work',
    intro: 'Five projects from Codevon (formerly Fintz) where I did most of the building.',
    roleLabel: 'My role',
    stackLabel: 'Stack',
  },
  cases: [
    {
      id: 'deepdive',
      name: 'Deep Dive',
      kind: 'AI analysis of bankruptcy and restructuring cases',
      years: '2024 – 2026',
      role: 'Developer of the AI workflows, in direct contact with the client',
      summary:
        'Investors in distressed assets need to know what is inside a bankruptcy case before they buy credit in it. The case file is a PDF that can pass 10,000 pages. Deep Dive reads it and writes the report.',
      points: [
        'Python pipeline in stages: find the relevant pages, transcribe them, extract structured data, merge everything into one report.',
        'Designed how context moves between stages and which model handles transcription, reasoning and extraction.',
        'Outputs a written report plus spreadsheets: list of creditors, credit assignments and pending incidents.',
        'Scrapers for the São Paulo court systems (e-SAJ and DJE) fill in what the PDF does not contain.',
      ],
      stack: ['Python', 'LLM APIs', 'OpenRouter', 'PDF processing', 'Web scraping', 'Pandas'],
      art: {
        a: 'Detect', b: 'Transcribe', c: 'Extract', d: 'Merge',
        report: 'Report', h1: 'The company', h2: 'Status of the case', h3: 'Risks and red flags',
        sheet: 'Creditors', c1: 'Creditor', c2: 'Class', c3: 'Value',
      },
    },
    {
      id: 'ventiur',
      name: 'Ventiur',
      kind: 'Startup database for an investor and accelerator',
      years: '2026',
      role: 'Built the platform and the data consolidation, working directly with the client',
      summary:
        'Ventiur had years of startup data spread across spreadsheets, Airtable bases and selection processes. I consolidated it into one platform the team searches every day.',
      points: [
        'Platform for 5,021 startups with search, filters, a page per startup and an audit trail for every edit.',
        'Python consolidator that merges and deduplicates the historical sources and checks whether each startup site is still online.',
        'Automated reports, plus an AI chatbot that drafts commercial proposals after client meetings.',
        'Deployed with Docker and Kamal through GitHub Actions.',
      ],
      stack: ['Nuxt', 'Vue', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind', 'Docker'],
      art: { count: '5,021 startups', search: 'Search by name, sector, program', f1: 'Sector', f2: 'Stage', f3: 'State', edited: 'Edited' },
    },
    {
      id: 'smartzap',
      name: 'SmartZap',
      kind: 'AI assistant inside WhatsApp',
      years: '2025 – 2026',
      role: 'Lead developer, running the project almost on my own',
      summary:
        'An assistant people talk to in the app they already use all day. I led development and iteration, and took part in getting it in front of people.',
      points: [
        'Gave a television interview about the product. It passed 6,000 users afterwards.',
        'Python service on the WhatsApp Cloud API, with Gemini generating the replies.',
        'Changes driven by what users asked for and how they used it.',
        'Deployed on Hetzner with Kamal.',
      ],
      stack: ['Python', 'Flask', 'WhatsApp Cloud API', 'Gemini', 'Kamal'],
      art: {
        status: 'online',
        audio: '1:42',
        u1: 'Summarize this audio for me',
        b1: 'Summary: the meeting moved to Thursday at 3 pm and the proposal is due Friday.',
        u2: 'Write a short reply confirming I will be there',
        b2: 'Sure: "Confirmed, see you Thursday at 3 pm. I will send the proposal by Friday."',
        input: 'Message',
      },
    },
    {
      id: 'beatfit',
      name: 'BeatFit',
      kind: 'Workout app for iOS and Android',
      years: '2026',
      role: 'Mobile developer, from onboarding to store release',
      summary:
        'An app that builds a workout for you and tracks what you do in the gym. I built it and worked on getting it into both stores.',
      points: [
        'Onboarding, exercise catalog, workout templates and session logging.',
        'Workout generation running in a Supabase edge function.',
        'Usage and funnel analysis with PostHog to decide what to change next.',
        'Published to the App Store and Google Play.',
      ],
      stack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'NativeWind', 'PostHog'],
      links: [
        { label: 'App Store', href: 'https://apps.apple.com/br/app/beatfit/id6807080270' },
        { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.codevon.beatfit' },
      ],
      art: { alt: 'BeatFit screens: weekly dashboard and workout duration setup' },
    },
    {
      id: 'fintz',
      name: 'Fintz API',
      kind: 'Brazilian financial market data API',
      years: '2024 – 2025',
      role: 'Backend and data engineer, my main focus in the first year',
      summary:
        'An API with data on stocks, real estate funds, treasury bonds and more, used by several B2B clients inside their own apps and BI tools.',
      points: [
        'ETL pipelines orchestrated in Dagster, from collection to the production database.',
        'Scrapers for the sources that have no API: B3, CVM, ANBIMA and others.',
        'PostgreSQL storage and the endpoints clients consume.',
      ],
      stack: ['Python', 'Dagster', 'Scrapy', 'PostgreSQL', 'Docker', 'GitHub Actions'],
      links: [{ label: 'Visit fintz.com.br', href: 'https://fintz.com.br' }],
      art: {
        a: 'Sources', b: 'Scrapers', c: 'Dagster ETL', d: 'PostgreSQL', e: 'API', f: 'B2B clients',
        g1: 'B3 exchange', e1: 'Historical quotes', e2: 'Fundamental indicators', e3: 'Dividends and corporate events',
        g2: 'Funds', e4: 'Daily fund data',
        g3: 'Treasury', e5: 'Historical prices and rates',
      },
    },
  ],
  more: {
    title: 'More projects',
    now: 'Working on it now',
    intro: 'Other things I built or contributed to, at work, on my own and at university.',
    groups: [
      {
        name: 'Codevon and Fintz',
        items: [
          { name: 'TakePics.AI', year: '2024', what: 'Realistic AI photos of you from custom-trained models, with payments.', stack: 'Nuxt, Replicate, Stripe' },
          { name: 'Lucro10', year: '2026', what: 'Profitability dashboard for marketplace sellers. Early development.', stack: 'Nuxt, Supabase, TypeScript' },
          { name: 'Meu Novo Cabelo', year: '2025', what: 'Try hairstyles and colors on your own photo with AI.', stack: 'Nuxt, Supabase, Replicate' },
          { name: 'Eletrificado', year: '2024', what: 'News site about electric vehicles that collects, rewrites and translates stories automatically.', stack: 'Python, Nuxt, LLMs' },
          { name: 'Fintz Bot', year: '2025', what: 'WhatsApp bot to log and understand daily expenses.', stack: 'Python, OpenAI Assistants' },
          { name: 'F1 Bot', year: '2024', what: 'Discord bot with race schedules, standings and weekly Grand Prix reminders.', stack: 'Python, AWS Lambda' },
        ],
      },
      {
        name: 'Personal',
        items: [
          { name: 'GestoClin', year: '2026', what: 'Patient records, scheduling and team management for clinics, with role-based access.', stack: 'Nuxt, Supabase, RLS', href: 'https://gestoclin.com', now: true },
          { name: 'Candidatos SC', year: '2025', what: 'Scraper and ETL pipeline for data on political candidates in Santa Catarina.', stack: 'Python, Dagster, Airflow', href: 'https://github.com/victorrgouvea/dagster-candidatos-sc' },
        ],
      },
      {
        name: 'University (UFSC)',
        items: [
          { name: 'GameScrapper', year: '2024', what: 'Crawlers that collect game prices from Steam, Epic Games and GOG.', stack: 'Python, Scrapy', href: 'https://github.com/victorrgouvea/GameScrapper' },
        ],
      },
    ],
    footnote: 'Codevon lists more client work I took part in at',
  },
  experience: {
    title: 'Experience',
    jobs: [
      {
        period: 'May 2024 – Nov 2026',
        company: 'Codevon (formerly Fintz)',
        role: 'Software Engineer',
        place: 'Remote',
        body: [
          'Worked on client projects and on the company’s own products: APIs, web and mobile apps, AI and automation.',
          'Owned delivery from client discovery to deployment and operations, including infrastructure on several projects.',
          'Took part in product, launch, marketing and conversion decisions on SmartZap and BeatFit.',
        ],
      },
      {
        period: 'Aug 2023 – Mar 2024',
        company: 'KHOMP',
        role: 'Mobile Software Developer',
        place: 'Florianópolis, Brazil',
        body: [
          'Contributed to a WebRTC and SIP calling SDK for Ionic/Cordova apps, focused on the native Android side in Java.',
          'Built OneSignal push notifications so calls ring while the app is inactive or closed.',
        ],
      },
      {
        period: 'Aug 2022 – Nov 2022',
        company: 'Federal University of Santa Catarina',
        role: 'Teaching Assistant, data science extension course',
        place: 'Florianópolis, Brazil',
        body: ['Helped teach a data science course the university offers to the general public.'],
      },
    ],
    educationTitle: 'Education',
    education: {
      period: '2021 – 2025',
      school: 'Federal University of Santa Catarina (UFSC)',
      degree: 'Bachelor’s degree in Computer Science',
    },
  },
  skills: {
    title: 'Skills',
    groups: [
      { name: 'Development', items: ['Python', 'TypeScript', 'Nuxt', 'Vue', 'React Native', 'Expo', 'REST APIs'] },
      {
        name: 'AI and data',
        items: [
          'LLM integration (provider APIs, OpenRouter)',
          'Prompt engineering',
          'Context management',
          'LLM workflow orchestration',
          'PDF processing',
          'Web scraping',
          'Pandas',
          'PostgreSQL',
          'Supabase',
          'Dagster and ETL pipelines',
        ],
      },
      {
        name: 'Practices and tools',
        items: ['Git', 'Docker', 'GitHub Actions', 'Kamal', 'App Store and Google Play releases', 'PostHog', 'AI-assisted development'],
      },
      { name: 'Languages', items: ['Portuguese (native)', 'English (advanced)'] },
    ],
    github: '1,100+ commits across 75 repositories on GitHub',
  },
  contact: {
    title: 'Have something to build?',
    body: 'I am open to software engineering roles and projects, remote or in Florianópolis. Email is the fastest way to reach me.',
    email: 'Send an email',
    cv: 'Download CV (PDF)',
    cvHref: '/cv/victor-gouvea-en.pdf',
  },
  footer: 'Designed and built by Victor Gouvêa.',
};

const pt: Content = {
  meta: {
    title: 'Victor Gouvêa, engenheiro de software',
    description:
      'Engenheiro de software em Florianópolis. Levo produtos web, mobile e de IA da concepção à produção.',
  },
  nav: {
    work: 'Projetos',
    experience: 'Experiência',
    skills: 'Habilidades',
    contact: 'Contato',
    switchTo: 'EN',
    switchLabel: 'View in English',
  },
  hero: {
    role: 'Engenheiro de software, IA aplicada',
    lede: 'Construo produtos web, mobile e de IA de ponta a ponta, da primeira conversa até o produto rodando em produção.',
    place: 'Florianópolis, Brasil',
    ctaWork: 'Ver projetos',
    ctaCv: 'Baixar currículo',
    scroll: 'Role',
  },
  statement: [
    [
      'Nos últimos dois anos e meio, em uma startup, construí fluxos de IA que leem processos judiciais de ',
      { mark: 'mais de 10 mil páginas' },
      ', um assistente no WhatsApp que chegou a ',
      { mark: 'mais de 6 mil usuários' },
      ' e uma plataforma que organiza ',
      { mark: '5.021 startups' },
      '.',
    ],
    [
      'Seja projeto de cliente ou produto da casa, levo do escopo à produção por conta própria, e depois ',
      { mark: 'sigo ajustando conforme as pessoas usam' },
      '.',
    ],
  ],
  work: {
    title: 'Projetos em destaque',
    intro: 'Cinco projetos da Codevon (antiga Fintz) em que fiz a maior parte do desenvolvimento.',
    roleLabel: 'Meu papel',
    stackLabel: 'Stack',
  },
  cases: [
    {
      id: 'deepdive',
      name: 'Deep Dive',
      kind: 'Análise de processos de falência e recuperação judicial com IA',
      years: '2024 – 2026',
      role: 'Desenvolvedor dos fluxos de IA, em contato direto com o cliente',
      summary:
        'Quem investe em ativos estressados precisa saber o que há em um processo de falência antes de comprar crédito nele. Os autos são um PDF que pode passar de 10 mil páginas. O Deep Dive lê tudo e escreve o relatório.',
      points: [
        'Pipeline em Python por etapas: localizar as páginas relevantes, transcrever, extrair dados estruturados e fundir tudo em um relatório.',
        'Estruturei como o contexto passa de uma etapa para outra e qual modelo cuida de transcrição, raciocínio e extração.',
        'Gera relatório escrito e planilhas: quadro de credores, cessões de crédito e incidentes pendentes.',
        'Scrapers dos sistemas do TJSP (e-SAJ e DJE) completam o que o PDF não traz.',
      ],
      stack: ['Python', 'APIs de LLM', 'OpenRouter', 'Processamento de PDF', 'Web scraping', 'Pandas'],
      art: {
        a: 'Detectar', b: 'Transcrever', c: 'Extrair', d: 'Fundir',
        report: 'Relatório', h1: 'A empresa', h2: 'Situação do processo', h3: 'Riscos e alertas',
        sheet: 'Credores', c1: 'Credor', c2: 'Classe', c3: 'Valor',
      },
    },
    {
      id: 'ventiur',
      name: 'Ventiur',
      kind: 'Base de startups para uma investidora e aceleradora',
      years: '2026',
      role: 'Construí a plataforma e a consolidação dos dados, em contato direto com o cliente',
      summary:
        'A Ventiur tinha anos de dados de startups espalhados em planilhas, bases do Airtable e processos seletivos. Consolidei tudo em uma plataforma que a equipe consulta todos os dias.',
      points: [
        'Plataforma para 5.021 startups com busca, filtros, página por startup e trilha de auditoria para cada edição.',
        'Consolidador em Python que une e deduplica as fontes históricas e verifica se o site de cada startup continua no ar.',
        'Relatórios automatizados e um chatbot de IA que redige propostas comerciais após reuniões com clientes.',
        'Deploy com Docker e Kamal via GitHub Actions.',
      ],
      stack: ['Nuxt', 'Vue', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind', 'Docker'],
      art: { count: '5.021 startups', search: 'Busque por nome, setor, programa', f1: 'Setor', f2: 'Estágio', f3: 'Estado', edited: 'Editado' },
    },
    {
      id: 'smartzap',
      name: 'SmartZap',
      kind: 'Assistente de IA dentro do WhatsApp',
      years: '2025 – 2026',
      role: 'Desenvolvedor principal, conduzindo o projeto praticamente sozinho',
      summary:
        'Um assistente com quem a pessoa conversa no aplicativo que já usa o dia todo. Liderei o desenvolvimento e a evolução, e participei da divulgação.',
      points: [
        'Dei uma entrevista na TV sobre o produto. Depois dela, passamos de 6 mil usuários.',
        'Serviço em Python sobre a WhatsApp Cloud API, com o Gemini gerando as respostas.',
        'Mudanças guiadas pelo que os usuários pediam e por como usavam.',
        'Deploy na Hetzner com Kamal.',
      ],
      stack: ['Python', 'Flask', 'WhatsApp Cloud API', 'Gemini', 'Kamal'],
      art: {
        status: 'online',
        audio: '1:42',
        u1: 'Resume esse áudio pra mim',
        b1: 'Resumo: a reunião passou para quinta às 15h e a proposta fica para sexta.',
        u2: 'Escreve uma resposta curta confirmando que eu vou',
        b2: 'Claro: "Confirmado, nos vemos quinta às 15h. Envio a proposta até sexta."',
        input: 'Mensagem',
      },
    },
    {
      id: 'beatfit',
      name: 'BeatFit',
      kind: 'App de treinos para iOS e Android',
      years: '2026',
      role: 'Desenvolvedor mobile, do onboarding à publicação nas lojas',
      summary:
        'Um app que monta o treino para você e registra o que você faz na academia. Desenvolvi o app e trabalhei na publicação nas duas lojas.',
      points: [
        'Onboarding, catálogo de exercícios, modelos de treino e registro de sessões.',
        'Geração de treinos em uma edge function do Supabase.',
        'Análise de uso e de funil com PostHog para decidir o que mudar.',
        'Publicado na App Store e no Google Play.',
      ],
      stack: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'NativeWind', 'PostHog'],
      links: [
        { label: 'App Store', href: 'https://apps.apple.com/br/app/beatfit/id6807080270' },
        { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.codevon.beatfit&hl=pt_BR' },
      ],
      art: { alt: 'Telas do BeatFit: painel da semana e escolha da duração do treino' },
    },
    {
      id: 'fintz',
      name: 'API Fintz',
      kind: 'API de dados do mercado financeiro brasileiro',
      years: '2024 – 2025',
      role: 'Engenheiro de backend e dados, meu foco principal no primeiro ano',
      summary:
        'Uma API com dados de ações, FIIs, tesouro direto e mais, usada por vários clientes B2B em seus próprios apps e ferramentas de BI.',
      points: [
        'Pipelines de ETL orquestrados no Dagster, da coleta ao banco de produção.',
        'Scrapers para as fontes que não têm API: B3, CVM, ANBIMA e outras.',
        'Armazenamento em PostgreSQL e os endpoints consumidos pelos clientes.',
      ],
      stack: ['Python', 'Dagster', 'Scrapy', 'PostgreSQL', 'Docker', 'GitHub Actions'],
      links: [{ label: 'Visitar fintz.com.br', href: 'https://fintz.com.br' }],
      art: {
        a: 'Fontes', b: 'Scrapers', c: 'ETL no Dagster', d: 'PostgreSQL', e: 'API', f: 'Clientes B2B',
        g1: 'Bolsa B3', e1: 'Cotação histórica', e2: 'Indicadores fundamentalistas', e3: 'Proventos e eventos corporativos',
        g2: 'Fundos', e4: 'Dados diários de fundos',
        g3: 'Tesouro', e5: 'Preços e taxas históricos',
      },
    },
  ],
  more: {
    title: 'Mais projetos',
    now: 'Trabalhando nele agora',
    intro: 'Outras coisas que construí ou para as quais contribuí, no trabalho, por conta própria e na universidade.',
    groups: [
      {
        name: 'Codevon e Fintz',
        items: [
          { name: 'TakePics.AI', year: '2024', what: 'Fotos realistas suas geradas por IA com modelos personalizados, com pagamentos.', stack: 'Nuxt, Replicate, Stripe' },
          { name: 'Lucro10', year: '2026', what: 'Painel de rentabilidade para vendedores de marketplaces. Fase inicial.', stack: 'Nuxt, Supabase, TypeScript' },
          { name: 'Meu Novo Cabelo', year: '2025', what: 'Teste cortes e cores de cabelo na sua própria foto com IA.', stack: 'Nuxt, Supabase, Replicate' },
          { name: 'Eletrificado', year: '2024', what: 'Site de notícias sobre carros elétricos que coleta, reescreve e traduz matérias automaticamente.', stack: 'Python, Nuxt, LLMs' },
          { name: 'Fintz Bot', year: '2025', what: 'Bot de WhatsApp para registrar e entender os gastos do dia a dia.', stack: 'Python, OpenAI Assistants' },
          { name: 'F1 Bot', year: '2024', what: 'Bot de Discord com calendário, classificação e lembretes semanais dos GPs.', stack: 'Python, AWS Lambda' },
        ],
      },
      {
        name: 'Pessoais',
        items: [
          { name: 'GestoClin', year: '2026', what: 'Prontuário, agenda e gestão de equipe para clínicas, com acesso por papel.', stack: 'Nuxt, Supabase, RLS', href: 'https://gestoclin.com', now: true },
          { name: 'Candidatos SC', year: '2025', what: 'Scraper e pipeline de ETL com dados de candidatos políticos de Santa Catarina.', stack: 'Python, Dagster, Airflow', href: 'https://github.com/victorrgouvea/dagster-candidatos-sc' },
        ],
      },
      {
        name: 'Universidade (UFSC)',
        items: [
          { name: 'GameScrapper', year: '2024', what: 'Crawlers que coletam preços de jogos na Steam, Epic Games e GOG.', stack: 'Python, Scrapy', href: 'https://github.com/victorrgouvea/GameScrapper' },
        ],
      },
    ],
    footnote: 'A Codevon lista outros projetos de clientes em que participei em',
  },
  experience: {
    title: 'Experiência',
    jobs: [
      {
        period: 'Mai 2024 – Nov 2026',
        company: 'Codevon (antiga Fintz)',
        role: 'Engenheiro de Software',
        place: 'Remoto',
        body: [
          'Atuei em projetos para clientes e em produtos próprios da empresa: APIs, aplicações web e mobile, IA e automações.',
          'Conduzi entregas da definição com o cliente à implantação e operação, incluindo a infraestrutura de vários projetos.',
          'Participei de decisões de produto, lançamento, marketing e conversão no SmartZap e no BeatFit.',
        ],
      },
      {
        period: 'Ago 2023 – Mar 2024',
        company: 'KHOMP',
        role: 'Desenvolvedor de Software Mobile',
        place: 'Florianópolis, SC',
        body: [
          'Contribuí para um SDK de chamadas WebRTC e SIP para apps Ionic/Cordova, com foco na parte nativa Android em Java.',
          'Desenvolvi notificações push com OneSignal para a chamada tocar com o app inativo ou fechado.',
        ],
      },
      {
        period: 'Ago 2022 – Nov 2022',
        company: 'Universidade Federal de Santa Catarina',
        role: 'Monitor de curso de extensão em ciência de dados',
        place: 'Florianópolis, SC',
        body: ['Apoiei as aulas de um curso de ciência de dados que a universidade oferece ao público em geral.'],
      },
    ],
    educationTitle: 'Formação',
    education: {
      period: '2021 – 2025',
      school: 'Universidade Federal de Santa Catarina (UFSC)',
      degree: 'Bacharelado em Ciência da Computação',
    },
  },
  skills: {
    title: 'Habilidades',
    groups: [
      { name: 'Desenvolvimento', items: ['Python', 'TypeScript', 'Nuxt', 'Vue', 'React Native', 'Expo', 'APIs REST'] },
      {
        name: 'IA e dados',
        items: [
          'Integração de LLMs (APIs diretas, OpenRouter)',
          'Engenharia de prompts',
          'Gerenciamento de contexto',
          'Orquestração de workflows com LLMs',
          'Processamento de PDFs',
          'Web scraping',
          'Pandas',
          'PostgreSQL',
          'Supabase',
          'Dagster e pipelines de ETL',
        ],
      },
      {
        name: 'Práticas e ferramentas',
        items: ['Git', 'Docker', 'GitHub Actions', 'Kamal', 'Publicação na App Store e no Google Play', 'PostHog', 'Desenvolvimento assistido por IA'],
      },
      { name: 'Idiomas', items: ['Português (nativo)', 'Inglês (avançado)'] },
    ],
    github: 'Mais de 1.100 commits em 75 repositórios no GitHub',
  },
  contact: {
    title: 'Tem algo para construir?',
    body: 'Estou aberto a vagas e projetos de engenharia de software, remotos ou em Florianópolis. O e-mail é o jeito mais rápido de falar comigo.',
    email: 'Enviar e-mail',
    cv: 'Baixar currículo (PDF)',
    cvHref: '/cv/victor-gouvea-pt-br.pdf',
  },
  footer: 'Projetado e desenvolvido por Victor Gouvêa.',
};

export const content: Record<Lang, Content> = { en, pt };
