export interface Project {
  id: string;
  title: string;
  subtitle: string;
  stack: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  year: string;
  overview: string;
  howIBuilt: string[];
  features: string[];
  challenges: string[];
  learnings: string;
}

export const projects: Project[] = [
  {
    id: "url-shortener",
    title: "URL Shortener",
    subtitle: "High-performance link shortening with Redis & Docker",
    stack: ["Spring Boot", "Redis", "React", "Docker", "GitHub Actions", "Nginx", "Flyway", "Testcontainers"],
    image: "/assets/url-shortner.png",
    githubUrl: "https://github.com",
    year: "2025",
    overview:
      "A production-grade link-shortening service featuring Base62 key generation, custom aliases, TTL-based expiration, and per-user ownership isolation. Built with a resilient backend that handles high read throughput through intelligent caching.",
    howIBuilt: [
      "Designed a stateless Spring Boot REST API exposing endpoints for creating, resolving, and managing short links. Used Base62 encoding over a monotonic counter to guarantee unique, URL-safe keys.",
      "Integrated Redis as a read-through cache. On every redirect request, the service checks Redis first; on a miss it queries PostgreSQL, then populates the cache with a TTL matching the link's expiration.",
      "Implemented a sliding-window rate limiter backed by Redis sorted sets to cap per-user request volume without a database roundtrip.",
      "Containerised the entire stack with multi-stage Docker builds: a builder stage compiles the fat JAR, a slim JRE stage runs it. Nginx proxies the React frontend and routes /api calls to the backend.",
      "Automated schema evolution with Flyway migration scripts and wired GitHub Actions to run the full integration test suite via Testcontainers on every pull request."
    ],
    features: [
      "Base62 key generation with collision-safe monotonic counter",
      "Custom aliases with uniqueness validation",
      "TTL-based link expiration with Redis-side auto-eviction",
      "Per-user ownership isolation — users can only manage their own links",
      "Sliding-window rate limiting on redirect and creation endpoints",
      "Multi-stage Docker build with Nginx reverse proxy",
      "Flyway versioned migrations for zero-downtime schema changes",
      "GitHub Actions CI pipeline with Testcontainers integration tests"
    ],
    challenges: [
      "Handling cache-stampede on popular links: solved with a probabilistic early expiration strategy so cache rebuilds are staggered.",
      "Ensuring Base62 keys don't collide under concurrent writes: used a database sequence as the numeric seed, making each key globally unique before encoding.",
      "Testcontainers startup time in CI was slow — parallelised container spin-up and reused them across the test class via @Container with static scope."
    ],
    learnings:
      "This project deepened my understanding of Redis data structures beyond simple key-value — sorted sets for rate limiting are surprisingly elegant. It also reinforced that multi-stage Docker builds are non-negotiable for keeping production images lean."
  },
  {
    id: "edunest",
    title: "EduNest",
    subtitle: "Modular-monolith E-Learning platform with RBAC & JWT",
    stack: ["Java 21", "Spring Boot", "PostgreSQL", "Spring Security", "JWT", "Flyway", "Docker"],
    image: "/assets/e-learningp_platform.jpg",
    liveUrl: "https://edunest.live",
    year: "2025",
    overview:
      "A full-featured EdTech platform built as a modular monolith. Instructors can create courses segmented into sections and lessons; students enrol, track progress, and attempt quizzes. RBAC with JWT ensures each role — student, instructor, admin — sees only what it owns.",
    howIBuilt: [
      "Modelled the domain as Course → Section → Lesson, each entity carrying ownership metadata. Spring Security method-level security annotations enforce that only the owning instructor can mutate their content.",
      "Issued short-lived JWTs for authentication and stored refresh tokens in a httpOnly cookie to prevent XSS theft. A dedicated token-rotation endpoint invalidates old refresh tokens on use.",
      "Designed RESTful APIs for lesson progress tracking using a junction table recording (userId, lessonId, completedAt, progressPercent), giving the frontend a clean progress-percentage per course.",
      "Built a quiz engine supporting multiple-choice and open-ended questions. Automated grading runs synchronously; manual instructor review is triggered for open-ended answers.",
      "Used Flyway for incremental schema migrations and Testcontainers for spinning up a real PostgreSQL instance during integration tests, keeping the test suite deterministic."
    ],
    features: [
      "JWT authentication with refresh-token rotation",
      "Role-Based Access Control: Student, Instructor, Admin",
      "Instructor verification flow before course publishing",
      "Course → Section → Lesson curriculum hierarchy",
      "Lesson progress tracking with percentage completion",
      "Quiz engine: multiple-choice + open-ended with auto/manual grading",
      "Ownership-based access control on all write operations",
      "Dockerised infrastructure with Flyway migrations"
    ],
    challenges: [
      "Designing ownership-aware queries without N+1 problems: used JOIN FETCH in JPQL and validated with Hibernate statistics in tests.",
      "Refresh-token rotation in a stateless architecture: introduced a token family concept to detect replay attacks and immediately revoke the entire family on suspicion.",
      "Modular boundaries in a monolith: enforced package-private visibility between modules via ArchUnit tests to prevent accidental coupling."
    ],
    learnings:
      "Modular monoliths are a great middle ground — you get the simplicity of a single deployment unit without the tight coupling of a traditional monolith. The key discipline is treating module boundaries as seriously as microservice contracts."
  },
  {
    id: "api-management-platform",
    title: "Multi-Tenant API Management Platform",
    subtitle: "B2B SaaS for API key lifecycle, RBAC & Kafka metering",
    stack: ["Java 21", "Spring Boot", "Spring Security", "PostgreSQL", "Redis", "Apache Kafka", "React", "TypeScript", "Docker", "OpenAPI"],
    image: "/assets/api-management.png",
    githubUrl: "https://github.com/kundan424/api-management.git",
    year: "2026",
    overview:
      "A B2B SaaS platform that lets organisations register APIs, manage API-key lifecycles, enforce tenant-level quotas, and monitor usage. The architecture separates a control plane (management) from a data plane (gateway) within a modular monolith.",
    howIBuilt: [
      "Separated the application into two logical planes within a single deployable: the control plane handles API registration, key management, and RBAC; the data plane proxies incoming API calls, validates keys, and enforces rate limits.",
      "Secured control-plane endpoints with Spring Security using tenant-scoped authorities. Every database query is augmented with a tenantId predicate via a Hibernate filter, guaranteeing tenant data isolation at the ORM layer.",
      "Used Redis for two purposes: caching API-key metadata to avoid a DB hit on every gateway request, and maintaining per-tenant sliding-window rate-limit counters with Lua scripts for atomicity.",
      "Wired Apache Kafka to emit a metering event on every proxied request. A consumer aggregates these events into usage buckets in PostgreSQL, feeding the analytics dashboard and billing pipeline.",
      "Built the React + TypeScript frontend with a developer portal for key generation, OpenAPI spec upload, and usage graphs rendered with a lightweight charting library."
    ],
    features: [
      "Multi-tenant data isolation via Hibernate tenant filters",
      "API-key lifecycle: generate, rotate, revoke, set expiry",
      "RBAC with tenant-scoped roles (Owner, Developer, Viewer)",
      "Redis-backed API-key cache with TTL invalidation on revoke",
      "Atomic sliding-window rate limiting via Redis Lua scripts",
      "Kafka-driven async metering and usage analytics",
      "Audit log for all control-plane mutations via Kafka",
      "OpenAPI spec upload and developer portal UI"
    ],
    challenges: [
      "Ensuring tenant isolation didn't leak across async Kafka consumers: solved by embedding tenantId in every event envelope and reconstructing the security context before processing.",
      "Redis Lua atomicity for rate limiting: testing Lua scripts is awkward — built a dedicated integration test that spins up a real Redis instance via Testcontainers.",
      "OpenAPI spec parsing: vendors upload wildly non-conformant specs. Added a validation step on upload that returns structured errors per-field before persisting."
    ],
    learnings:
      "Kafka for async metering is a natural fit, but the operational complexity is real. Schema evolution of event payloads needs the same rigour as API versioning — something I'd formalise earlier next time with Avro schemas."
  },
  {
    id: "skyinvestments",
    title: "SkyInvestments",
    subtitle: "Production investment consulting platform — 5-day delivery",
    stack: ["Next.js", "TypeScript", "NextAuth", "Redis", "PostgreSQL"],
    image: "/assets/skyinvestment.jpg",
    liveUrl: "https://skyinvestments.live",
    year: "2026",
    overview:
      "A production-ready investment consulting web platform delivered from concept to deployment within a 5-day stakeholder turnaround. Features role-based session workflows and Redis-backed caching to eliminate redundant database lookups.",
    howIBuilt: [
      "Bootstrapped a Next.js 14 App Router project with TypeScript strict mode from day one. App Router's nested layouts made it trivial to scope authenticated and public routes without a custom middleware maze.",
      "Integrated NextAuth for session management, configuring a credentials provider for email/password and a JWT strategy. Role claims (advisor, client, admin) are embedded in the JWT and re-validated server-side on protected routes.",
      "Added an in-memory Redis caching layer for the two most-hit queries: the advisor list on the landing page and the authenticated user's own portfolio summary — cutting DB calls by ~80% under typical traffic.",
      "Deployed on a VPS behind Nginx with an SSL certificate from Let's Encrypt, completing the full deploy within the 5-day deadline."
    ],
    features: [
      "Role-based session workflows: Advisor, Client, Admin",
      "NextAuth JWT sessions with role claims",
      "Redis caching for high-frequency queries",
      "Server-side validation on all form submissions",
      "Responsive UI with dark/light investment dashboard",
      "Deployed to VPS with Nginx reverse proxy and HTTPS"
    ],
    challenges: [
      "Five days is tight. The biggest risk was scope creep — I wrote a one-page spec on day 0 and held firm to it, deferring nice-to-haves to a post-launch backlog.",
      "NextAuth session shape changes between minor versions caused type errors. Solved by extending the Session and JWT interfaces in a global declaration file.",
      "Redis cache invalidation on advisor profile updates: used a tag-based key naming convention so a single profile update could bust exactly the affected cache entries."
    ],
    learnings:
      "Speed and quality aren't mutually exclusive if you resist scope creep ruthlessly. Delivering on time built more stakeholder trust than any extra feature would have."
  }
];
