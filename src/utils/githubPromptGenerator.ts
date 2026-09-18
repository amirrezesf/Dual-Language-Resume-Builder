import { DualResumeData, Language, ResumeContent, ResumeSettings } from '../types';
import { initialResumeData } from '../data/initialData';

export interface GitHubPromptOptions {
  githubUsername: string;
  targetRole?: string;
  languageOption: 'dual' | 'en' | 'fa';
  customNotes?: string;
  githubProfileData?: GitHubProfileInfo | null;
}

export interface GitHubRepoInfo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  html_url: string;
  topics: string[];
}

export interface GitHubProfileInfo {
  username: string;
  name: string | null;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  public_repos: number;
  followers: number;
  avatar_url: string;
  repos: GitHubRepoInfo[];
}

/**
 * Public GitHub API fetcher to extract public user profile & top repositories
 */
export async function fetchGitHubUserData(rawInput: string): Promise<GitHubProfileInfo> {
  const cleanUsername = rawInput
    .trim()
    .replace(/^https?:\/\/github\.com\//i, '')
    .replace(/^@/, '')
    .replace(/\/.*$/, '')
    .trim();

  if (!cleanUsername) {
    throw new Error('Please enter a valid GitHub username or profile URL.');
  }

  const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(cleanUsername)}`);
  if (!userRes.ok) {
    if (userRes.status === 404) {
      throw new Error(`GitHub user "${cleanUsername}" was not found.`);
    }
    if (userRes.status === 403) {
      throw new Error('GitHub API rate limit reached for anonymous requests. You can still use the prompt manually.');
    }
    throw new Error(`Failed to fetch GitHub profile (HTTP ${userRes.status}).`);
  }

  const userData = await userRes.json();

  let repos: GitHubRepoInfo[] = [];
  try {
    const reposRes = await fetch(
      `https://api.github.com/users/${encodeURIComponent(cleanUsername)}/repos?sort=pushed&per_page=12`
    );
    if (reposRes.ok) {
      const rawRepos = await reposRes.json();
      if (Array.isArray(rawRepos)) {
        repos = rawRepos
          .filter((r: any) => !r.fork)
          .map((r: any) => ({
            name: r.name,
            description: r.description || null,
            language: r.language || null,
            stars: r.stargazers_count || 0,
            forks: r.forks_count || 0,
            html_url: r.html_url,
            topics: Array.isArray(r.topics) ? r.topics : [],
          }));
      }
    }
  } catch (err) {
    console.warn('Failed to fetch repositories list', err);
  }

  return {
    username: cleanUsername,
    name: userData.name || null,
    bio: userData.bio || null,
    company: userData.company || null,
    location: userData.location || null,
    blog: userData.blog || null,
    public_repos: userData.public_repos || 0,
    followers: userData.followers || 0,
    avatar_url: userData.avatar_url,
    repos,
  };
}

/**
 * Builds a prompt tailored for LLMs (Gemini, Claude, ChatGPT, DeepSeek)
 * to analyze GitHub profile/repos and output clean resume JSON.
 */
export function buildGitHubResumePrompt(options: GitHubPromptOptions): string {
  const username = options.githubUsername
    .trim()
    .replace(/^https?:\/\/github\.com\//i, '')
    .replace(/^@/, '')
    .replace(/\/.*$/, '')
    .trim() || 'username';

  const role = options.targetRole?.trim() || 'Software Engineer';
  const profile = options.githubProfileData;

  let reposContext = '';
  if (profile && profile.repos.length > 0) {
    reposContext = `\n### Detected Public Repositories for @${username}:\n` +
      profile.repos
        .slice(0, 8)
        .map(
          (r, idx) =>
            `${idx + 1}. **${r.name}** (${r.language || 'Code'}, ⭐ ${r.stars} stars)
   - Description: ${r.description || 'No description provided'}
   - URL: ${r.html_url}
   ${r.topics.length > 0 ? `- Topics: ${r.topics.join(', ')}` : ''}`
        )
        .join('\n');
  }

  const languagePromptGuide =
    options.languageOption === 'dual'
      ? `Generate BOTH English ("en") and Persian ("fa") versions under a root object with keys "en" and "fa". Translate naturally into professional Persian (RTL technical resume standards).`
      : options.languageOption === 'fa'
      ? `Generate a Persian ("fa") resume JSON version with natural professional Persian phrasing (RTL technical resume standards). Wrap it under { "fa": { ... } }.`
      : `Generate an English ("en") resume JSON version with high-impact, professional technical English phrasing. Wrap it under { "en": { ... } }.`;

  return `You are a world-class Technical Resume Architect and Senior Engineering Recruiter.
Your task is to inspect the following GitHub profile and repositories, and transform this developer's work into a high-impact, production-ready Resume JSON object matching our exact schema.

---
### Developer GitHub Profile:
- GitHub Username: ${username}
- Profile URL: https://github.com/${username}
- Target Job Title: ${role}
${profile?.name ? `- Display Name: ${profile.name}` : ''}
${profile?.bio ? `- Bio: ${profile.bio}` : ''}
${profile?.location ? `- Location: ${profile.location}` : ''}
${profile?.company ? `- Company / Org: ${profile.company}` : ''}
${profile?.blog ? `- Portfolio / Website: ${profile.blog}` : ''}
${reposContext}

${
  options.customNotes?.trim()
    ? `### Additional Candidate Context (Education, Work History, Contact Info):\n${options.customNotes.trim()}\n`
    : ''
}
---

### Language Requirement:
${languagePromptGuide}

### Guidelines for High-Impact Content:
1. **Name & Role Title**: Use clear title capitalization (e.g. "${role.toUpperCase()}").
2. **Professional Summary**: 3–4 sentences showcasing system architecture, primary stack, open-source work, and passion for engineering excellence.
3. **Skill Categories**: Group skills into 4 to 6 categories (BACKEND, FRONTEND, CLOUD / DEVOPS, DATA / INFRA, MOBILE, TOOLS). Include modern tools and languages evident from the repositories.
4. **Selected Projects (Top 2-3)**: Extract the most substantial repositories into "selectedProjects". Provide:
   - title: Clean repository or product name
   - subtitle: Clear category (e.g. "Full-Stack Web App", "Open-Source CLI Tool", "Distributed Backend")
   - linkText: "View on GitHub" (or "مشاهده در گیت‌هاب")
   - linkUrl: exact repository URL
   - description: 2-3 sentences explaining purpose and impact
   - techStack: comma-separated list of technologies used
   - icon: one of "code", "dashboard", "food", "chat"
5. **Additional Projects (Next 2-4)**: Put other notable repositories in "moreProjects".
6. **Work Experience**:
   - Write 2 to 3 experience items (either from the additional context, or framing major open-source/freelance projects as Lead Developer).
   - Use Google X-Y-Z bullet points: "Accomplished [X] as measured by [Y], by doing [Z]".
7. **Engineering Highlights (Page 2)**:
   - Provide 6 distinct highlights (icon must be one of: "database", "zap", "shield", "cloud", "api", "monitor").
8. **Education**: Add degree/institution (use context if provided, or standard Software Engineering/Computer Science placeholder).

---
### Expected Output Schema:
Return ONLY a valid JSON object without markdown explanations or chat pleasantries. Ensure valid JSON syntax (no trailing commas, double-quoted keys).

\`\`\`json
{
  ${options.languageOption === 'fa' ? '"fa"' : '"en"'}: {
    "name": "${profile?.name || username}",
    "roleTitle": "${role}",
    "contact": {
      "email": "developer@example.com",
      "phone": "+1 234 567 8900",
      "location": "${profile?.location || 'Remote / Global'}",
      "github": "github.com/${username}",
      "linkedin": "linkedin.com/in/${username}",
      "website": "${profile?.blog || `${username}.github.io`}"
    },
    "summary": "High-impact professional summary...",
    "skillCategories": [
      {
        "id": "backend",
        "title": "BACKEND",
        "skills": ["Node.js", "TypeScript", "PostgreSQL", "Docker"]
      },
      {
        "id": "frontend",
        "title": "FRONTEND",
        "skills": ["React", "Tailwind CSS", "Next.js", "Vite"]
      }
    ],
    "languages": [
      { "name": "English", "level": "Fluent / Professional" }
    ],
    "experiences": [
      {
        "id": "exp-1",
        "company": "Open Source & Freelance",
        "badge": "Active Developer",
        "role": "Lead Software Developer",
        "location": "Remote",
        "period": "2023 – Present",
        "highlight": "Engineered scalable distributed applications and open-source packages.",
        "bullets": [
          "Architected responsive microservices and real-time APIs serving active user requests.",
          "Automated CI/CD workflows and automated testing suites reducing deployment overhead by 40%."
        ],
        "tags": ["TypeScript", "Docker", "REST APIs"]
      }
    ],
    "selectedProjects": [
      {
        "id": "proj-1",
        "title": "Featured Project Name",
        "subtitle": "Full-Stack Web Platform",
        "linkText": "View on GitHub",
        "linkUrl": "https://github.com/${username}/repo-name",
        "description": "Engineered a high-performance web platform featuring automated sync and secure authentication.",
        "techStack": "TypeScript, React, Node.js, PostgreSQL",
        "icon": "code"
      }
    ],
    "moreProjects": [
      {
        "id": "more-1",
        "title": "Tool or Library Name",
        "subtitle": "Open Source Utility",
        "linkText": "View on GitHub",
        "linkUrl": "https://github.com/${username}/tool",
        "description": "Developer tooling designed to streamline local environments and automate validation.",
        "techStack": "Go, Docker, Bash",
        "icon": "code"
      }
    ],
    "highlights": [
      { "id": "hl-1", "title": "Database Optimization", "description": "Indexed queries and caching strategies achieving sub-50ms latencies.", "icon": "database" },
      { "id": "hl-2", "title": "Performance Tuning", "description": "Optimized bundle sizes and asset delivery for high Lighthouse scores.", "icon": "zap" },
      { "id": "hl-3", "title": "Security & Auth", "description": "Hardened OAuth2 and JWT flows with CSRF protection and role validation.", "icon": "shield" },
      { "id": "hl-4", "title": "Cloud Infrastructure", "description": "Containerized workloads orchestrated via Docker and cloud deployment pipelines.", "icon": "cloud" },
      { "id": "hl-5", "title": "API Architecture", "description": "Designed clean RESTful and WebSocket endpoints with strict schema validations.", "icon": "api" },
      { "id": "hl-6", "title": "System Monitoring", "description": "Implemented centralized telemetry, structured logging, and health alerts.", "icon": "monitor" }
    ],
    "educations": [
      {
        "id": "edu-1",
        "degree": "B.Sc. in Computer Science / Software Engineering",
        "institution": "University / Institute",
        "period": "2019 – 2023"
      }
    ],
    "footerQuotePage1": "${profile?.name || username} — Professional Resume",
    "footerQuotePage2": "${profile?.name || username} — Engineering Highlights & Projects"
  }
}
\`\`\`
`;
}

export interface ParseResult {
  valid: boolean;
  resumeData?: DualResumeData;
  settings?: Partial<ResumeSettings>;
  summary?: {
    enName?: string;
    faName?: string;
    expCount: number;
    projCount: number;
    skillsCount: number;
  };
  errors: string[];
}

/**
 * Strips markdown fences and parses/normalizes raw JSON input
 */
export function parseAndValidateResumeJson(
  rawText: string,
  existingData: DualResumeData,
  activeLanguage: Language
): ParseResult {
  if (!rawText || !rawText.trim()) {
    return { valid: false, errors: ['JSON input is empty.'] };
  }

  let cleaned = rawText.trim();
  // Remove markdown code fences like ```json ... ``` or ``` ... ```
  cleaned = cleaned.replace(/^```[a-z]*\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();

  let parsed: any;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err: any) {
    return {
      valid: false,
      errors: [
        `Syntax Error in JSON: ${err.message || 'Invalid JSON syntax'}. Please check for missing quotes or commas.`,
      ],
    };
  }

  if (typeof parsed !== 'object' || parsed === null) {
    return { valid: false, errors: ['Parsed JSON must be an object.'] };
  }

  // Check structure:
  // Case A: { resumeData: { en: ..., fa: ... }, settings?: ... }
  if (parsed.resumeData && (parsed.resumeData.en || parsed.resumeData.fa)) {
    const en = parsed.resumeData.en || existingData.en;
    const fa = parsed.resumeData.fa || existingData.fa;
    return buildSuccessfulResult({ en, fa }, parsed.settings);
  }

  // Case B: { en: {...}, fa: {...} }
  if (parsed.en && parsed.fa) {
    return buildSuccessfulResult({ en: parsed.en, fa: parsed.fa });
  }

  // Case C: { en: {...} } only
  if (parsed.en && typeof parsed.en === 'object') {
    return buildSuccessfulResult({ en: parsed.en, fa: existingData.fa });
  }

  // Case D: { fa: {...} } only
  if (parsed.fa && typeof parsed.fa === 'object') {
    return buildSuccessfulResult({ en: existingData.en, fa: parsed.fa });
  }

  // Case E: Single ResumeContent directly (has name, contact, summary, etc.)
  if (parsed.name && (parsed.contact || parsed.roleTitle || parsed.summary)) {
    const updatedDual: DualResumeData = {
      ...existingData,
      [activeLanguage]: {
        ...existingData[activeLanguage],
        ...parsed,
      },
    };
    return buildSuccessfulResult(updatedDual);
  }

  return {
    valid: false,
    errors: [
      'Unrecognized resume format. Expected an object containing "en", "fa", "resumeData", or standard resume fields (name, roleTitle, contact).',
    ],
  };
}

function buildSuccessfulResult(
  data: DualResumeData,
  settings?: Partial<ResumeSettings>
): ParseResult {
  const enSkills = (data.en?.skillCategories || []).reduce(
    (acc, cat) => acc + (cat.skills?.length || 0),
    0
  );
  const faSkills = (data.fa?.skillCategories || []).reduce(
    (acc, cat) => acc + (cat.skills?.length || 0),
    0
  );

  return {
    valid: true,
    resumeData: data,
    settings,
    summary: {
      enName: data.en?.name,
      faName: data.fa?.name,
      expCount: Math.max(data.en?.experiences?.length || 0, data.fa?.experiences?.length || 0),
      projCount: Math.max(
        (data.en?.selectedProjects?.length || 0) + (data.en?.moreProjects?.length || 0),
        (data.fa?.selectedProjects?.length || 0) + (data.fa?.moreProjects?.length || 0)
      ),
      skillsCount: Math.max(enSkills, faSkills),
    },
    errors: [],
  };
}
