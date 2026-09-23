import { useEffect } from 'react'
import './App.css'
import {
  LuBriefcase,
  LuFileText,
  LuGithub,
  LuLinkedin,
  LuMail,
  LuArrowUpRight,
  LuCircleCheck,
  LuCode,
  LuTrophy,
} from 'react-icons/lu'

const GITHUB_URL = 'https://github.com/sertacakalin'
const LINKEDIN_URL = 'https://linkedin.com/in/sertacakalin'
const EMAIL = 'sertac@sertacakalin.com'
const CV_TR = '/cv/SertacAkalin_CV_TR.pdf'
const CV_EN = '/cv/SertacAkalin_CV_EN.pdf'

const focusAreas = [
  {
    title: 'Computer Vision',
    desc: 'Object detection, tracking, and spatial-temporal decision logic for real traffic video.',
  },
  {
    title: 'Applied Research',
    desc: 'Dataset collection and annotation, model training, quantitative evaluation, and field testing.',
  },
  {
    title: 'Backend Systems',
    desc: 'Python/FastAPI and Java/Spring Boot services, REST APIs, and cloud deployment.',
  },
]

const experience = [
  {
    company: 'FEV Türkiye',
    logo: '/img/fev.jpg',
    role: 'Software Engineering Intern',
    date: 'Jan — Jun 2026',
    points: [
      'Developed Python/FastAPI backend services for SOVD (Service-Oriented Vehicle Diagnostics), an external project delivered to Jaguar Land Rover / Tata.',
      'Designed and implemented REST-based diagnostic endpoints for vehicle-diagnostics workflows.',
      'Worked daily with engineering teams across Germany and India in an Agile/Scrum environment.',
    ],
    chips: ['Python', 'FastAPI', 'REST', 'Git'],
  },
  {
    company: 'CodeFirst',
    logo: '/img/codefirst.jpg',
    role: 'Java Backend Developer Intern',
    date: 'Jan — Apr 2025',
    points: [
      'Developed RESTful APIs for a Spring Boot microservice system with a layered Controller–Service–Repository architecture.',
      'Implemented JWT-based authentication and Spring Data JPA database operations.',
      'Used Git, Docker, and Maven for development and builds; tested and documented APIs with Postman and Swagger.',
    ],
    chips: ['Java', 'Spring Boot', 'JPA', 'PostgreSQL', 'Docker'],
  },
]

const featuredProjects = [
  {
    name: 'Hatched Area Violation Detection',
    desc: 'An end-to-end computer vision system for detecting vehicles entering hatched road areas in Istanbul traffic. I independently collected and annotated the dataset, fine-tuned YOLOv8m, and combined tracking with polygon geometry and multi-frame confirmation.',
    details: 'Evaluated on 11 real traffic videos, with precision, recall, and F1 each reaching 0.889. Includes severity scoring, evidence logging, and license-plate recognition in a Gradio interface. Dataset and code publicly released.',
    metrics: [
      { value: '3,897', label: 'Source frames' },
      { value: '9,353', label: 'Exported images' },
      { value: '0.773', label: 'Detection mAP50' },
    ],
    status: 'First-author paper · IDAP 2026',
    tags: ['YOLOv8m', 'ByteTrack', 'OpenCV', 'PaddleOCR', 'Shapely', 'Gradio'],
    link: 'https://github.com/sertacakalin/hatched-area-violation-detection',
    thumb: '/img/hatched.jpg',
    thumbAlt: 'Traffic scene with a hatched road area',
  },
  {
    name: 'Palmystra — AI-Powered Mobile App',
    desc: 'A shipped full-stack iOS app combining computer vision with a LangChain-based RAG pipeline to generate personalized readings from a palm photo.',
    details: 'Built the FastAPI backend with authentication, rate limiting, and automated tests; containerized the service with Docker and deployed it to Google Cloud Run.',
    status: 'Shipped application',
    tags: ['FastAPI', 'LangChain', 'RAG', 'Computer Vision', 'SwiftUI', 'Cloud Run'],
    link: null,
    note: 'Private repository',
    thumb: '/img/palmystra-app.jpg',
    thumbIcon: '/img/palmystra-icon.jpg',
    brandThumb: '/img/palmystra-brand.jpg',
    thumbAlt: 'Palmystra app screen',
    gallery: [
      { src: '/img/palmystra-app.jpg', alt: 'Palmystra home screen' },
      { src: '/img/palmystra-readings.jpg', alt: 'Palmystra topic readings screen' },
      { src: '/img/palmystra-tarot.jpg', alt: 'Palmystra tarot screen' },
    ],
    fit: 'contain',
  },
]

const publications = [
  {
    title: 'A deployable dual-mode vision framework for adaptive intersection control and traffic analytics',
    authors: 'M. F. Şen, H. Gümüşkaya, and S. Akalın',
    award: 'Best Applied Research Paper',
    status: 'Co-author',
    ongoing: 'Journal extension in preparation with H. Gümüşkaya and M. F. Şen.',
  },
  {
    title: 'Computer vision-based detection of vehicles violating hatched road areas in Istanbul traffic',
    authors: 'S. Akalın and H. Gümüşkaya',
    status: 'First author · Accepted',
    ongoing: 'Journal extension in preparation with H. Gümüşkaya.',
  },
]

const skillGroups = [
  { title: 'AI & Computer Vision', skills: ['PyTorch', 'YOLOv8', 'ByteTrack', 'OpenCV', 'Model training & evaluation'] },
  { title: 'Data & Research', skills: ['Dataset collection & annotation', 'Roboflow', 'Quantitative evaluation', 'Real-video field testing'] },
  { title: 'Backend & Databases', skills: ['Python', 'Java', 'FastAPI', 'Spring Boot', 'REST APIs', 'PostgreSQL', 'MySQL', 'JWT'] },
  { title: 'Tools & Deployment', skills: ['Git', 'Docker', 'GitHub Actions', 'Google Cloud Run', 'Postman', 'Swagger'] },
]

const otherRepos = [
  {
    name: 'multi-threaded-image-pipeline',
    desc: 'A multithreaded image processing pipeline built with C++.',
    chips: ['C++', 'Multithreading'],
    link: 'https://github.com/sertacakalin/multi-threaded-image-pipeline',
  },
  {
    name: 'AutoDiag',
    desc: 'An experimental Python tool for vehicle diagnostic data.',
    chips: ['Python'],
    link: 'https://github.com/sertacakalin/AutoDiag',
  },
]

function SectionHead({ label, title, sub }) {
  return (
    <div className="shead">
      <p className="shead__label mono">
        <span className="shead__line" />
        <span className="shead__dot" />
        {label}
        <span className="shead__dot" />
        <span className="shead__line" />
      </p>
      <h2 className="shead__title">{title}</h2>
      {sub && <p className="shead__sub">{sub}</p>}
    </div>
  )
}

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.08 },
    )

    document.querySelectorAll('.reveal').forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="grid-bg" aria-hidden="true" />

      <main className="wrap">
        {/* ============ TOP: ABOUT + EXPERIENCE ============ */}
        <div className="top">
          <section id="about" className="profile reveal">
            <img
              className="about__avatar"
              src="/img/profile.jpg"
              alt="Sertaç Akalın"
              width="150"
              height="150"
            />
            <div className="profile__links" aria-label="Profile links">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <LuGithub />
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LuLinkedin />
              </a>
              <a href={`mailto:${EMAIL}`} aria-label="Email">
                <LuMail />
              </a>
            </div>
            <h1 className="profile__name">Sertaç Akalın</h1>
            <p className="profile__role">Computer Engineer · AI Engineer</p>
            <p className="about__text">
              I work at the intersection of computer vision, applied AI, and backend systems.
              I build the evidence alongside the software: collecting data, running experiments,
              measuring failure cases, and validating systems on real video. My traffic research
              led to a first-author paper accepted at IDAP 2026, alongside hands-on backend
              experience with Python/FastAPI and Java/Spring Boot.
            </p>

            <div className="focus-list">
              {focusAreas.map((item) => (
                <div className="focus-item" key={item.title}>
                  <p className="focus-item__title">{item.title}</p>
                  <p className="focus-item__desc">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="cv-panel">
              <p className="cv-panel__label mono">RESUME</p>
              <div className="cv-panel__actions">
                <a href={CV_EN} className="btn btn--cyan" target="_blank" rel="noopener noreferrer">
                  <LuFileText /> Resume — English
                </a>
                <a
                  href={CV_TR}
                  className="btn btn--outline-cyan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LuFileText /> Resume — Turkish
                </a>
              </div>
            </div>

          </section>

          <section id="experience" className="projects-col reveal">
            <div className="shead shead--inline">
              <h2 className="shead__title shead__title--sm">Experience</h2>
            </div>
            <div className="xp__list">
            {experience.map((job) => (
              <article className="xp" key={job.company}>
                <div className="xp__head">
                  <span className={`xp__icon${job.logo ? ' xp__icon--logo' : ''}`}>
                    {job.logo ? (
                      <img src={job.logo} alt={`${job.company} logo`} loading="lazy" />
                    ) : (
                      <LuBriefcase />
                    )}
                  </span>
                  <div className="xp__meta">
                    <h3 className="xp__role">
                      {job.role} <span className="xp__company">· {job.company}</span>
                    </h3>
                    <span className="xp__date mono">{job.date}</span>
                  </div>
                </div>
                <ul className="checks">
                  {job.points.map((point) => (
                    <li key={point}>
                      <LuCircleCheck className="checks__icon" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="chips">
                  {job.chips.map((chip) => (
                    <span className="chip" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
              </article>
            ))}
            </div>
          </section>

        </div>

        <section id="publications" className="section reveal">
          <SectionHead
            label="RESEARCH"
            title="Publications & Research"
            sub="10th International Artificial Intelligence and Data Processing Symposium · IDAP 2026"
          />
          <div className="publications-list">
            {publications.map((paper) => (
              <article className="publication" key={paper.title}>
                <div className="publication__meta">
                  <span className="mono">{paper.status}</span>
                  {paper.award && <span className="publication__award"><LuTrophy aria-hidden="true" /> {paper.award}</span>}
                </div>
                <h3>{paper.title}</h3>
                <p className="publication__authors">{paper.authors}</p>
                <p className="publication__venue">IDAP 2026 · Istanbul, Türkiye · September 5–6, 2026</p>
                <p className="publication__ongoing">{paper.ongoing}</p>
              </article>
            ))}
          </div>
          <p className="research-note">Both journal extensions are being prepared for submission to Q1/Q2-indexed journals.</p>
        </section>

        <section id="projects" className="section reveal">
          <SectionHead label="WORK" title="Projects" />
          <div className="projects-grid">
            {featuredProjects.map((project) => {
              const hasGallery = Boolean(project.gallery?.length)

              return (
                <article
                  className="pcard"
                  key={project.name}
                >
                  <div className={`pcard__thumb${hasGallery ? ' pcard__thumb--gallery' : ''}`}>
                    {hasGallery ? (
                      <>
                        <img
                          className="pcard__thumb-bg"
                          src={project.gallery[0].src}
                          alt=""
                          aria-hidden="true"
                        />
                        <div className="pcard__gallery">
                          {project.gallery.map((shot) => (
                            <img
                              className="pcard__gallery-img"
                              src={shot.src}
                              alt={shot.alt}
                              key={shot.src}
                            />
                          ))}
                        </div>
                        {project.brandThumb && (
                          <img
                            className="pcard__brand-thumb"
                            src={project.brandThumb}
                            alt=""
                            aria-hidden="true"
                          />
                        )}
                      </>
                    ) : (
                      <>
                        {project.fit === 'contain' && (
                          <img
                            className="pcard__thumb-bg"
                            src={project.thumb}
                            alt=""
                            aria-hidden="true"
                          />
                        )}
                        <img
                          className={`pcard__thumb-img${
                            project.fit === 'contain' ? ' pcard__thumb-img--contain' : ''
                          }`}
                          src={project.thumb}
                          alt={project.thumbAlt}
                        />
                      </>
                    )}
                    {project.thumbIcon && !hasGallery && (
                      <img
                        className="pcard__thumb-appicon"
                        src={project.thumbIcon}
                        alt=""
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="pcard__body">
                    <p className="pcard__status mono">{project.status}</p>
                    <h3 className="pcard__title">{project.name}</h3>
                    <p className="pcard__desc">{project.desc}</p>
                    {project.metrics && (
                      <dl className="project-metrics">
                        {project.metrics.map((metric) => (
                          <div key={metric.label}>
                            <dt>{metric.label}</dt>
                            <dd>{metric.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    <p className="pcard__desc">{project.details}</p>
                    <div className="chips">
                      {project.tags.map((tag) => (
                        <span className="chip" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="pcard__foot">
                      {project.link ? (
                        <a
                          href={project.link}
                          className="btn btn--small"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <LuGithub /> GitHub
                        </a>
                      ) : (
                        <span className="pcard__note mono">{project.note}</span>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}

          </div>

          <div className="repos-row repos-row--center">
              {otherRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.link}
                  className="repo-chip mono"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LuCode /> {repo.name}
                </a>
              ))}
              <a
                href={`${GITHUB_URL}?tab=repositories`}
                className="repo-chip repo-chip--all mono"
                target="_blank"
                rel="noopener noreferrer"
              >
                all <LuArrowUpRight />
              </a>
          </div>
        </section>

        <section id="skills" className="section reveal">
          <SectionHead label="TOOLKIT" title="Technical Skills" />
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <div className="chips">
                  {group.skills.map((skill) => <span className="chip" key={skill}>{skill}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section reveal">
          <SectionHead label="BACKGROUND" title="Education" />
          <div className="education-list">
            <article>
              <div><h3>İstanbul Arel University</h3><p>B.Sc. in Computer Engineering (English)</p></div>
              <span className="mono">2022–2026</span>
            </article>
            <article>
              <div><h3>Web Design and Coding</h3><p>Associate Degree</p></div>
              <span className="mono">2020–2022</span>
            </article>
          </div>
          <p className="research-note">Turkish (native) · English (B2) · Military service completed</p>
        </section>

      </main>

      <a className="contact-fab" href={`mailto:${EMAIL}`}>
        <span className="contact-fab__dot" />
        <LuMail />
        <span className="contact-fab__text">Contact</span>
        <span className="contact-fab__email mono">{EMAIL}</span>
      </a>
    </>
  )
}

export default App
