export const profile = {
  name: 'Kartikey Kushwah',
  title: 'Senior DevOps & Platform Engineer (SRE)',
  location: 'Dehradun, India (Relocating to Germany)',
  relocation: 'Actively relocating to Germany (Saarbrücken region). Available for remote and onsite roles across Germany.',
  email: 'kartikmysterio@gmail.com',
  phone: '+91 78198 00649',
  linkedin: 'https://linkedin.com/in/kartikey-kushwah-57283614b',
  github: 'https://github.com/lstdevfriend',
  summary:
    'Senior DevOps & Platform Engineer with 6+ years of experience designing, automating and maintaining high-availability infrastructure across AWS, Kubernetes and Hetzner bare-metal environments. Strong background in Infrastructure as Code, CI/CD, observability, open-source platforms and production operations for enterprise, startup and government clients.',
};

export const skills = {
  Infrastructure: [
    'AWS (EC2, IAM, VPC, Route53, S3, CloudFront, ALB, ACM, ECR, CloudWatch)',
    'Hetzner',
    'DigitalOcean',
    'Contabo',
  ],
  'Containers & IaC': ['Kubernetes (CKAD)', 'Docker', 'Docker Compose', 'Helm', 'Portainer', 'Terraform', 'AWS CloudFormation'],
  'CI/CD': ['GitHub Actions', 'GitLab CI', 'Jenkins', 'Drone CI', 'TeamCity', 'Fastlane'],
  Monitoring: ['Prometheus', 'Grafana', 'Sentry', 'GlitchTip', 'Uptime Kuma'],
  Linux: ['Ubuntu', 'Debian', 'Bash', 'systemd', 'PM2'],
  Databases: ['PostgreSQL', 'PostGIS', 'MySQL', 'TiDB', 'Redis', 'Elasticsearch', 'MinIO', 'Celery'],
  Web: ['Nginx', 'Apache', 'HAProxy', 'Reverse Proxy', 'SSL', "Let's Encrypt"],
  Development: ['Node.js', 'Express.js', 'Flask', 'React', 'Next.js', 'Git'],
};

export const experience = [
  {
    role: 'Senior DevOps & Full Stack Engineer',
    company: 'Koders Korp LLP',
    period: '2020 – Present',
    highlights: [
      'Managed multi-cloud production infrastructure across AWS, Hetzner bare-metal, DigitalOcean and Contabo supporting 200+ production services.',
      'Designed highly available Kubernetes and Docker platforms for scalable microservices.',
      'Built CI/CD pipelines with GitHub Actions, Jenkins, GitLab CI, Drone CI, TeamCity and Fastlane.',
      'Provisioned AWS infrastructure using Terraform across VPC, ALB, CloudFront and ECR.',
      'Implemented Prometheus, Grafana, Sentry and GlitchTip observability.',
      'Improved reliability using Redis caching and Celery workers.',
      'Led infrastructure architecture, mentoring, documentation and self-hosted open-source adoption.',
    ],
  },
];

export const keyProjects = [
  {
    name: 'Instaride',
    description: 'Germany Government Mobility Platform using AWS, Flask, PostgreSQL/PostGIS and automated Flutter deployments.',
  },
  {
    name: 'Defendia',
    description: 'CI/CD for browser extensions, Electron, React and Postfix mail infrastructure.',
  },
  {
    name: 'Wrencho',
    description: 'AWS infrastructure, Docker, monitoring, Strapi CMS and mobile release pipelines.',
  },
  {
    name: 'RFID Attendance System (Indian Army)',
    description: 'Secure isolated deployment of hardware-integrated Flask backend.',
  },
];

// Certifications without a public verification link. Verified, linkable
// certificates (Coursera etc.) live in src/data/certifications.json and are
// added via `node scripts/add-certification.mjs <share-url>` or the
// "Add Certification" GitHub Action — see README.
export const certifications = [
  'AWS Solutions Architect',
  'CKAD',
  'Terraform Fundamentals',
  'IBM Applied DevOps Engineering',
  'DevOps Mastery',
];

export const education = {
  degree: 'B.Tech + LL.B. (Cyber Law)',
  school: 'UPES',
  period: '2016 – 2020',
  gpa: 'CGPA 8.0/10',
};

export const languages = [
  { name: 'English', level: 'Professional' },
  { name: 'Hindi', level: 'Native' },
  { name: 'German', level: 'Basic, learning' },
];
