const profile = {
  identity: {
    name: 'Prashant Patil',
    title: 'DevOps Engineer | AWS | Kubernetes | Terraform | CI/CD',
    location: 'Pune, India',
    phone: '+91 93730 34327',
    email: 'prashant.patil25@outlook.com',
    linkedin: 'https://in.linkedin.com/in/prashant-patil-189990202',
    github: 'https://github.com/oneupon2',
  },
  summary:
    'DevOps Engineer with 3+ years of fintech experience at Nasdaq, building CI/CD pipelines, ' +
    'automating infrastructure with Terraform, and running containerized, cloud-native workloads ' +
    'on AWS and Kubernetes. Migrated 10+ environments from OCI-Exadata to AWS and resolved critical ' +
    'production issues for global banking clients through root cause analysis. Certified Kubernetes ' +
    'and Cloud Native Associate (KCNA), with Professional-level certification in the Nasdaq AxiomSL ' +
    'regulatory reporting platform.',
  stats: [
    { label: 'EXPERIENCE', value: '3+ years in fintech (Nasdaq)' },
    { label: 'SPECIALTY', value: 'AWS / Kubernetes / Terraform / CI/CD' },
    { label: 'MIGRATIONS', value: '10+ environments, OCI-Exadata → AWS' },
    { label: 'BASE', value: 'Pune, India' },
  ],
  skillGroups: [
    {
      category: 'Cloud (AWS)',
      skills: [
        'AWS: EC2, ECS, Lambda, Auto Scaling, S3, RDS, DynamoDB, IAM, CloudWatch, IMDS',
        'Oracle Cloud (OCI) Exadata',
        'Cloud Migration',
      ],
    },
    {
      category: 'Containers',
      skills: ['Docker', 'Kubernetes'],
    },
    {
      category: 'CI/CD & IaC',
      skills: ['CI/CD Pipelines', 'Git', 'Jenkins', 'GitLab CI/CD', 'GitHub Actions', 'Terraform', 'Infrastructure as Code (IaC)'],
    },
    {
      category: 'Monitoring & Observability',
      skills: ['Datadog', 'Splunk', 'Grafana', 'Amazon CloudWatch', 'Logging & Alerting', 'Troubleshooting & Root Cause Analysis (RCA)'],
    },
    {
      category: 'Scripting & OS',
      skills: ['Python', 'Bash', 'Linux'],
    },
    {
      category: 'Databases',
      skills: ['PostgreSQL', 'Oracle', 'Amazon RDS', 'DynamoDB'],
    },
    {
      category: 'Tools & Domain',
      skills: ['Jira', 'Confluence', 'ServiceNow', 'Salesforce', 'Fintech', 'Regulatory Reporting (Nasdaq AxiomSL)'],
    },
  ],
  experience: [
    {
      company: 'Nasdaq',
      role: 'DevOps Engineer',
      dates: 'Aug 2023 - Present · Pune, India',
      bullets: [
        'Migrated 10+ environments from OCI-Exadata to AWS in the AWS@Exadata cloud migration, coordinating cutover activities across teams to minimize downtime and ensure business continuity.',
        'Found the root cause of a critical Oracle wallet compatibility failure (outdated Oracle client libraries could not parse the modern Exadata wallet format); resolved it with a legacy -compat_v11 wallet instead of a risky library upgrade, keeping the customer migration cluster available.',
        'Resolved S3 connectivity failures for two major international banking clients after the S3 utility moved from AWS SDK v1 to v2, diagnosing missing HTTP/HTTPS proxy settings behind corporate proxies and fixing them on live client calls.',
        'Resolved workflow failures caused by AWS Instance Metadata Service (IMDS) request throttling, monitoring the ENA linklocal_allowance_exceeded metric and increasing timeout parameters in Amazon ECS.',
        'Automated provisioning and configuration of AWS resources with Terraform (Infrastructure as Code), replacing manual setup and improving platform stability and release velocity.',
        'Deployed containerized, cloud-native applications with Docker and Kubernetes, standardizing builds across dev, test, and production and improving high availability and fault tolerance.',
        'Administered AWS infrastructure (EC2, ECS, S3, RDS, DynamoDB, IAM, CloudWatch) supporting CI/CD pipelines and production monitoring; maintained CI/CD runbooks in Confluence.',
      ],
    },
    {
      company: 'Adenza (now part of Nasdaq)',
      role: 'Cloud Intern',
      dates: 'Jan 2023 - Aug 2023 · Pune, India',
      bullets: [
        'Automated deployments and environment provisioning with Jenkins, streamlining CI/CD build and release processes for client environments.',
        'Monitored system performance and infrastructure health with Datadog, Splunk, and Grafana, improving observability and troubleshooting.',
        'Managed and optimized PostgreSQL and Oracle databases, ensuring data integrity and performance.',
        'Resolved client issues through Jira, Salesforce, and ServiceNow, improving client satisfaction and operational efficiency.',
      ],
    },
  ],
  certifications: [
    'Kubernetes and Cloud Native Associate (KCNA) — Linux Foundation · ID LF-su9cdfcz4e (Oct 2026)',
    'Nasdaq AxiomSL Technical Certification - Professional — Nasdaq (Sep 2026)',
    'Nasdaq AxiomSL Technical Certification - Associate — Nasdaq (Mar 2025)',
    'HashiCorp Certified: Terraform Associate — HashiCorp (In Progress)',
  ],
  certificationsVerifyUrl: 'https://www.linkedin.com/in/prashant-patil-189990202/details/certifications/',
  education: [
    { degree: 'M.Sc. in Computer Science', school: 'MIT World Peace University, Pune', date: 'July 2023', percentage: '92%' },
    { degree: 'B.Sc. in Computer Science', school: 'MIT World Peace University, Pune', date: 'June 2021', percentage: '87%' },
  ],
  projects: [
    {
      id: 'jpmc-forage',
      number: '001',
      name: 'JPMorgan Chase Software Engineering Job Simulation',
      description:
        'Forage job simulation (Jan 2026): completed practical tasks in project setup, Kafka integration, ' +
        'H2 database integration, and REST API integration and controllers.',
      tech: ['Kafka', 'H2 Database', 'REST APIs'],
      link: { label: 'View GitHub profile', url: 'https://github.com/oneupon2' },
    },
    {
      id: 'anurup-collections',
      number: '002',
      name: 'Anurup Collections',
      description:
        'A full-stack e-commerce site built with Spring Boot and React: Google Sign-In for customers, ' +
        'Razorpay payment integration, and an admin panel for order and catalog management. Deployed and live.',
      tech: ['Spring Boot', 'React', 'PostgreSQL/H2', 'Razorpay', 'Google OAuth'],
      link: { label: 'View live site', url: 'https://anurup-collections-2026.vercel.app' },
    },
    {
      id: 'sasta-olx',
      number: '003',
      name: 'Sasta OLX',
      description:
        'An OLX-style marketplace academic project built with Angular: product browsing, posting, and purchase ' +
        'flows, Firebase authentication, and a custom carousel built with Angular directives.',
      tech: ['Angular', 'Firebase'],
      link: { label: 'View GitHub profile', url: 'https://github.com/oneupon2' },
    },
    {
      id: 'medical-image-classification',
      number: '004',
      name: 'Medical Image Classification (CNN)',
      description:
        'A research project on pneumonia detection from chest X-ray images using a ResNet V2-based ' +
        'convolutional neural network. Authored an accompanying research paper (Feb-May 2023).',
      tech: ['Python', 'Machine Learning', 'ResNet V2'],
      link: { label: 'View GitHub profile', url: 'https://github.com/oneupon2' },
    },
  ],
}

export default profile
