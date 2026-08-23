const profile = {
  identity: {
    name: 'Prashant Patil',
    title: 'DevOps Engineer | CI/CD | AWS | Kubernetes',
    location: 'Pune, Maharashtra, India',
    phone: '+91 93730 34327',
    email: 'prashant.patil25@outlook.com',
    linkedin: 'https://linkedin.com/in/prashant-patil',
    github: 'https://github.com/oneupon2',
  },
  summary:
    'DevOps Engineer with 3.2+ years of experience building CI/CD pipelines, ' +
    'automating infrastructure provisioning, and managing containerized, ' +
    'cloud-native applications on AWS. Skilled in Docker, Kubernetes, ' +
    'Terraform, and Infrastructure as Code, with hands-on experience ' +
    'administering cloud infrastructure and leading large-scale environment ' +
    'migrations (OCI-Exadata to AWS@Exadata).',
  stats: [
    { label: 'YEARS OF EXPERIENCE', value: '3.2+' },
    { label: 'SPECIALTY', value: 'AWS / Kubernetes / Terraform' },
    { label: 'BASE', value: 'Pune, India' },
  ],
  skillGroups: [
    {
      category: 'Cloud & Infra',
      skills: ['AWS (EC2, S3, RDS, DynamoDB, IAM, CloudWatch)', 'Terraform', 'Infrastructure as Code', 'Kubernetes', 'Docker', 'Linux', 'Cloud Computing'],
    },
    {
      category: 'CI/CD & Automation',
      skills: ['Jenkins', 'GitLab CI/CD', 'DevOps'],
    },
    {
      category: 'Languages',
      skills: ['Python', 'Core Java'],
    },
    {
      category: 'Monitoring & Tools',
      skills: ['Datadog', 'Splunk', 'Grafana', 'Jira', 'Salesforce', 'ServiceNow'],
    },
    {
      category: 'Other',
      skills: ['Machine Learning', 'Angular'],
    },
  ],
  experience: [
    {
      company: 'NASDAQ',
      role: 'DevOps Engineer',
      dates: 'Aug 2023 - Present',
      bullets: [
        'Applied Terraform for Infrastructure as Code automation, streamlining cloud resource provisioning and configuration management.',
        'Delivered infrastructure upgrades using IaC methodologies, improving platform stability, maintainability, and release velocity.',
        'Designed and managed containerized applications using Docker, improving build consistency and deployment efficiency.',
        'Deployed and orchestrated cloud-native applications using Kubernetes, enhancing availability and fault tolerance.',
        'Administered AWS cloud infrastructure (EC2, DynamoDB, S3, RDS, IAM, CloudWatch) supporting CI/CD and production monitoring.',
        'Contributed to AWS@Exadata, migrating environments from OCI-Exadata to AWS, coordinating cutover activities to minimize downtime.',
        'Maintained Confluence documentation, keeping CI/CD runbooks and operational procedures current.',
      ],
    },
    {
      company: 'Adenza',
      role: 'Cloud Intern',
      dates: 'Jan 2023 - Aug 2023',
      bullets: [
        'Automated deployment and environment provisioning using Jenkins, streamlining CI/CD build and release processes.',
        'Monitored system performance and infrastructure health using Datadog, Splunk, and Grafana.',
        'Managed and optimized relational databases, including PostgreSQL and Oracle.',
        'Provided technical support and resolved customer issues through Jira, Salesforce, and ServiceNow.',
      ],
    },
  ],
  certifications: [
    'edX Verified Certificate — Introduction to Linux',
    'edX Verified Certificate — AWS Cloud Practitioner Essentials',
    'Nasdaq AxiomSL v10 Associate Technical Certification',
  ],
  education: [
    { degree: 'M.Sc. in Computer Science', school: 'MIT World Peace University, Pune', date: 'July 2023', percentage: '92%' },
    { degree: 'B.Sc. in Computer Science', school: 'MIT World Peace University, Pune', date: 'June 2021', percentage: '87%' },
  ],
  projects: [
    {
      id: 'anurup-collections',
      number: '001',
      name: 'Anurup Collections',
      description:
        'A full-stack e-commerce site built with Spring Boot and React: Google Sign-In for customers, ' +
        'Razorpay payment integration, and an admin panel for order and catalog management. Deployed and live.',
      tech: ['Spring Boot', 'React', 'PostgreSQL/H2', 'Razorpay', 'Google OAuth'],
      link: { label: 'View live site', url: 'https://anurup-collections-2026.vercel.app' },
    },
    {
      id: 'sasta-olx',
      number: '002',
      name: 'Sasta OLX',
      description:
        'An OLX-style marketplace academic project built with Angular: product browsing, posting, and purchase ' +
        'flows, Firebase authentication, and a custom carousel built with Angular directives.',
      tech: ['Angular', 'Firebase'],
      link: { label: 'View GitHub profile', url: 'https://github.com/oneupon2' },
    },
    {
      id: 'medical-image-classification',
      number: '003',
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
