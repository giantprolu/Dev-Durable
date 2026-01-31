import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const services = [
  {
    slug: 'strategie-rse',
    title: 'Stratégie RSE',
    summary: 'Construisez une démarche de responsabilité sociétale structurée, alignée avec vos valeurs et créatrice de valeur pour votre entreprise et vos parties prenantes.',
    description: `<h2>Pourquoi une stratégie RSE ?</h2>
<p>La responsabilité sociétale des entreprises n'est plus une option. Face aux attentes croissantes des clients, des collaborateurs et des investisseurs, une démarche RSE structurée devient un facteur clé de compétitivité.</p>
<p>Mais une stratégie RSE efficace ne se résume pas à une liste de bonnes intentions. Elle doit être ancrée dans la réalité de votre entreprise, alignée avec votre stratégie globale et traduite en actions concrètes.</p>

<h2>Notre accompagnement</h2>
<p>Nous vous guidons à chaque étape, du diagnostic initial à la mise en œuvre opérationnelle. Notre approche privilégie le pragmatisme : des objectifs atteignables, des actions mesurables, des résultats tangibles.</p>
<p>Nous travaillons en étroite collaboration avec vos équipes pour garantir l'appropriation de la démarche et sa pérennité dans le temps.</p>`,
    pageTitle: 'Stratégie RSE',
    pageDescription: 'Construisez une stratégie RSE structurée et créatrice de valeur. Accompagnement sur-mesure de AC-ingiénierie.',
    sidebarTitle: 'Livrables',
    sidebarItems: [
      'Diagnostic RSE initial et cartographie des parties prenantes',
      'Matrice de matérialité et identification des enjeux prioritaires',
      'Feuille de route RSE avec objectifs et indicateurs',
      'Plan de communication interne et externe',
      'Accompagnement à la rédaction du rapport extra-financier',
    ],
    ctaTitle: 'Prêt à structurer votre démarche RSE ?',
    ctaText: 'Échangeons sur votre situation et vos objectifs.',
    formats: [
      {
        title: 'Diagnostic',
        duration: '2 à 4 semaines',
        description: 'Analyse de votre situation actuelle, identification des forces et axes d\'amélioration.',
      },
      {
        title: 'Stratégie',
        duration: '4 à 6 semaines',
        description: 'Définition des priorités, des objectifs et de la feuille de route RSE.',
      },
      {
        title: 'Déploiement',
        duration: 'Variable',
        description: 'Mise en œuvre des actions, mobilisation des équipes et suivi des indicateurs.',
      },
    ],
    published: true,
    order: 1,
  },
  {
    slug: 'bilan-carbone',
    title: 'Bilan Carbone',
    summary: 'Mesurez et réduisez votre empreinte carbone avec une méthodologie reconnue. Du diagnostic à la définition d\'une trajectoire de réduction alignée sur les accords de Paris.',
    description: `<h2>Comprendre votre empreinte carbone</h2>
<p>Le Bilan Carbone® est un outil de diagnostic qui permet de comptabiliser les émissions de gaz à effet de serre (GES) de votre organisation. C'est la première étape indispensable pour agir efficacement contre le changement climatique.</p>
<p>Au-delà de l'obligation réglementaire pour certaines entreprises (BEGES), le bilan carbone est un outil stratégique qui permet d'identifier les postes les plus émetteurs et de prioriser les actions de réduction.</p>

<h2>Notre approche</h2>
<p>Nous réalisons votre Bilan Carbone selon la méthodologie de l'ADEME, en couvrant les scopes 1, 2 et 3. Notre objectif : vous fournir une vision complète et actionnable de votre empreinte carbone.</p>
<p>Nous ne nous arrêtons pas au diagnostic. Nous vous accompagnons dans la définition d'une trajectoire de réduction ambitieuse mais réaliste, alignée sur les objectifs de l'Accord de Paris.</p>`,
    pageTitle: 'Bilan Carbone & Stratégie Climat',
    pageDescription: 'Mesurez et réduisez votre empreinte carbone. Bilan GES, trajectoire de réduction et plan d\'action climat.',
    sidebarTitle: 'Livrables',
    sidebarItems: [
      'Bilan Carbone complet (scopes 1, 2 et 3)',
      'Analyse des postes d\'émissions prioritaires',
      'Benchmark sectoriel',
      'Trajectoire de réduction alignée SBTi',
      'Plan d\'action chiffré et priorisé',
      'Formation de vos équipes à la méthodologie',
    ],
    ctaTitle: 'Prêt à mesurer votre impact ?',
    ctaText: 'Discutons de votre projet de bilan carbone.',
    formats: [
      {
        title: 'Bilan Carbone simplifié',
        duration: '4 à 6 semaines',
        description: 'Premier diagnostic de vos émissions, idéal pour les PME souhaitant s\'engager.',
      },
      {
        title: 'Bilan Carbone complet',
        duration: '8 à 12 semaines',
        description: 'Analyse exhaustive couvrant l\'ensemble de votre chaîne de valeur.',
      },
      {
        title: 'Stratégie climat',
        duration: '4 à 8 semaines',
        description: 'Définition de votre trajectoire et plan d\'action de réduction.',
      },
    ],
    published: true,
    order: 2,
  },
  {
    slug: 'economie-circulaire',
    title: 'Économie Circulaire',
    summary: 'Transformez votre modèle économique en intégrant les principes de l\'économie circulaire : réduction des déchets, éco-conception, réemploi et recyclage.',
    description: `<h2>Vers un modèle plus circulaire</h2>
<p>L'économie circulaire vise à découpler la création de valeur de la consommation de ressources. C'est une opportunité de repenser vos produits, vos processus et votre modèle d'affaires pour gagner en résilience et en compétitivité.</p>
<p>De la réduction à la source à la valorisation des déchets, en passant par l'éco-conception et les modèles serviciel, les leviers sont nombreux et adaptables à chaque contexte.</p>

<h2>Notre accompagnement</h2>
<p>Nous vous aidons à identifier les opportunités circulaires spécifiques à votre activité et à construire une feuille de route pragmatique. Notre approche combine analyse des flux, benchmark des meilleures pratiques et co-construction avec vos équipes.</p>`,
    pageTitle: 'Économie Circulaire',
    pageDescription: 'Intégrez l\'économie circulaire dans votre stratégie : éco-conception, réduction des déchets, nouveaux modèles économiques.',
    sidebarTitle: 'Domaines d\'intervention',
    sidebarItems: [
      'Diagnostic de circularité et analyse des flux',
      'Éco-conception de produits et services',
      'Stratégie de réduction des déchets',
      'Mise en place de filières de réemploi/recyclage',
      'Développement de modèles serviciel',
      'Symbioses industrielles',
    ],
    ctaTitle: 'Envie d\'aller vers plus de circularité ?',
    ctaText: 'Échangeons sur les opportunités pour votre entreprise.',
    formats: [
      {
        title: 'Diagnostic circularité',
        duration: '3 à 4 semaines',
        description: 'Cartographie des flux et identification des opportunités circulaires.',
      },
      {
        title: 'Accompagnement éco-conception',
        duration: 'Variable',
        description: 'Intégration des critères environnementaux dans la conception de vos produits.',
      },
      {
        title: 'Stratégie déchets',
        duration: '4 à 6 semaines',
        description: 'Plan d\'action pour réduire et valoriser vos déchets.',
      },
    ],
    published: true,
    order: 3,
  },
  {
    slug: 'formation-sensibilisation',
    title: 'Formation & Sensibilisation',
    summary: 'Engagez vos équipes avec des formations adaptées aux enjeux du développement durable. De la sensibilisation au climat à la formation technique RSE.',
    description: `<h2>L'engagement commence par la compréhension</h2>
<p>Une démarche de développement durable ne peut réussir sans l'adhésion des équipes. Former et sensibiliser vos collaborateurs, c'est leur donner les clés pour comprendre les enjeux et devenir acteurs du changement.</p>
<p>Nos formations allient rigueur scientifique et pédagogie accessible. Nous adaptons le contenu et le format à votre public et à vos objectifs.</p>

<h2>Une pédagogie active</h2>
<p>Nos formations privilégient l'interactivité et la mise en pratique. Études de cas, ateliers collaboratifs, quiz : chaque session est conçue pour favoriser l'appropriation des concepts et leur application concrète.</p>
<p>Nous pouvons également former des référents internes qui deviendront les relais de la démarche au sein de votre organisation.</p>`,
    pageTitle: 'Formation & Sensibilisation',
    pageDescription: 'Formations en développement durable pour vos équipes : sensibilisation climat, RSE, bilan carbone, économie circulaire.',
    sidebarTitle: 'Thématiques',
    sidebarItems: [
      'Les fondamentaux du développement durable',
      'Comprendre le changement climatique et ses impacts',
      'La RSE en pratique : de la stratégie à l\'action',
      'Bilan carbone : méthodologie et mise en œuvre',
      'Économie circulaire : principes et opportunités',
      'Communication responsable et greenwashing',
    ],
    ctaTitle: 'Formez vos équipes',
    ctaText: 'Discutons de vos besoins en formation et sensibilisation.',
    formats: [
      {
        title: 'Ateliers de sensibilisation',
        duration: '2 à 4 heures',
        description: 'Sessions interactives pour comprendre les enjeux climatiques et environnementaux.',
      },
      {
        title: 'Formations thématiques',
        duration: '1 à 2 jours',
        description: 'Approfondissement sur des sujets spécifiques : bilan carbone, économie circulaire, reporting.',
      },
      {
        title: 'Parcours sur-mesure',
        duration: 'Variable',
        description: 'Programme de formation adapté à vos enjeux et à votre contexte.',
      },
    ],
    published: true,
    order: 4,
  },
  {
    slug: 'reporting-extra-financier',
    title: 'Reporting Extra-Financier',
    summary: 'Répondez aux nouvelles exigences réglementaires (CSRD, taxonomie) et valorisez votre performance ESG auprès de vos parties prenantes.',
    description: `<h2>Le reporting, levier de transformation</h2>
<p>Le reporting extra-financier n'est pas qu'une contrainte réglementaire. C'est un outil de pilotage qui permet de structurer votre démarche RSE, de mesurer vos progrès et de communiquer de manière crédible sur vos engagements.</p>
<p>Avec la CSRD et la taxonomie européenne, les exigences se renforcent. Notre accompagnement vous permet d'anticiper ces évolutions et de transformer cette obligation en opportunité.</p>

<h2>Notre approche</h2>
<p>Nous vous accompagnons dans la production de rapports conformes aux standards les plus exigeants (GRI, ESRS) tout en veillant à ce qu'ils servent réellement votre stratégie et votre communication.</p>`,
    pageTitle: 'Reporting Extra-Financier & CSRD',
    pageDescription: 'Accompagnement CSRD, rapport de durabilité, taxonomie européenne. Transformez vos obligations en opportunités.',
    sidebarTitle: 'Services',
    sidebarItems: [
      'Diagnostic de conformité CSRD',
      'Double matérialité',
      'Collecte et structuration des données ESG',
      'Rédaction du rapport de durabilité',
      'Analyse de taxonomie',
      'Préparation à l\'assurance',
    ],
    ctaTitle: 'Besoin d\'accompagnement CSRD ?',
    ctaText: 'Échangeons sur votre situation réglementaire.',
    formats: [
      {
        title: 'Diagnostic CSRD',
        duration: '2 à 3 semaines',
        description: 'Évaluation de votre niveau de préparation et identification des gaps.',
      },
      {
        title: 'Accompagnement complet',
        duration: '4 à 6 mois',
        description: 'De l\'analyse de matérialité à la production du rapport.',
      },
      {
        title: 'Formation CSRD',
        duration: '1 jour',
        description: 'Comprendre les exigences et préparer votre organisation.',
      },
    ],
    published: true,
    order: 5,
  },
];

async function main() {
  console.log('Seeding services...');

  for (const service of services) {
    const existing = await prisma.service.findUnique({
      where: { slug: service.slug },
    });

    if (existing) {
      console.log(`Service "${service.title}" already exists, updating...`);
      await prisma.service.update({
        where: { slug: service.slug },
        data: service,
      });
    } else {
      console.log(`Creating service "${service.title}"...`);
      await prisma.service.create({
        data: service,
      });
    }
  }

  console.log('Done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
