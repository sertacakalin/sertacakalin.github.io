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
} from 'react-icons/lu'

const GITHUB_URL = 'https://github.com/sertacakalin'
const LINKEDIN_URL = 'https://linkedin.com/in/sertacakalin'
const EMAIL = 'sertacakalin0@gmail.com'
const CV_TR = '/cv/SertacAkalin_CV_TR.pdf'
const CV_EN = '/cv/SertacAkalin_CV_EN.pdf'

const focusAreas = [
  {
    title: 'Backend APIs',
    desc: 'REST services, data models, authentication, and clean endpoint contracts.',
  },
  {
    title: 'Image Processing',
    desc: 'Video/image pipelines, object tracking, OCR output, and validation logic.',
  },
  {
    title: 'Delivery',
    desc: 'Dockerized services, Cloud Run deployments, Git workflow, and integrations.',
  },
]

const experience = [
  {
    company: 'FEV Turkey',
    role: 'Software Engineering Intern',
    date: 'Jan — Jun 2026',
    points: [
      'Worked on backend services for an SOVD (Service-Oriented Vehicle Diagnostics) project for Jaguar Land Rover / Tata using Python and FastAPI.',
      'Contributed to REST-based diagnostic service endpoints and backend implementation details.',
      'Collaborated with an international engineering team across Germany and India through daily workflow and corporate development processes.',
    ],
    chips: ['Python', 'FastAPI', 'REST', 'Git'],
  },
  {
    company: 'CodeFirst',
    role: 'Java Backend Developer Intern',
    date: 'Jan — Apr 2025',
    points: [
      'Built RESTful APIs and external service integrations with Spring Boot in a layered microservice architecture.',
      'Worked with Spring Data JPA / Hibernate, DTO structures, transaction handling, and JWT-based authentication.',
      'Used Postman/Swagger for testing and documentation, with Git/Docker for development workflow and environment management.',
    ],
    chips: ['Java', 'Spring Boot', 'JPA', 'PostgreSQL', 'Docker'],
  },
]

const featuredProjects = [
  {
    name: 'Palmystra — iOS App',
    desc: 'A full-stack iOS app that creates personalized palm readings from a hand photo. The FastAPI backend handles image processing, app services, and deployment on Docker + Cloud Run.',
    tags: ['FastAPI', 'OpenCV', 'SwiftUI', 'Cloud Run'],
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
  {
    name: 'Hatched Area Violation Detection',
    desc: 'A video processing system that detects hatched-area traffic violations. It combines YOLOv8, ByteTrack, OCR, and geometric region checks for vehicle tracking and plate-reading flow.',
    tags: ['YOLOv8', 'ByteTrack', 'OpenCV', 'PaddleOCR', 'Shapely'],
    link: 'https://github.com/sertacakalin/hatched-area-violation-detection',
    note: null,
    thumb: '/img/hatched.jpg',
    thumbIcon: null,
    thumbAlt: 'Traffic scene with a hatched road area',
  },
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
        {/* ============ TOP: ABOUT (LEFT) + PROJECTS (RIGHT) ============ */}
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
            <p className="profile__role">Computer Engineer · Backend Developer</p>
            <p className="about__text">
              I am a Computer Engineering graduate focused on backend systems. I build Java/Spring
              Boot and Python/FastAPI services with clear API contracts, data models, and deployment
              paths. My strongest work sits where backend engineering meets image and video
              processing: turning messy input into reliable application behavior.
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
                  <span className="xp__icon">
                    <LuBriefcase />
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

        <section id="projects" className="section reveal">
          <SectionHead label="WORK" title="Projects" />
          <div className="projects-grid">
            {featuredProjects.map((project) => {
              const hasGallery = Boolean(project.gallery?.length)

              return (
                <article
                  className={`pcard${hasGallery ? '' : ' pcard--compact'}`}
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
                    <h3 className="pcard__title">{project.name}</h3>
                    <p className="pcard__desc">{project.desc}</p>
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
