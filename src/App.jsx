import { useEffect, useState } from 'react'
import './App.css'
import FloatingDock from './FloatingDock'
import { FaGithub, FaLinkedin, FaFileDownload, FaArrowUp } from 'react-icons/fa'
import {
  LuHouse,
  LuBriefcase,
  LuFolderGit2,
  LuGraduationCap,
  LuFileText,
  LuGithub,
  LuLinkedin,
  LuMail,
  LuArrowUpRight,
} from 'react-icons/lu'

const GITHUB_URL = 'https://github.com/sertacakalin'
const LINKEDIN_URL = 'https://linkedin.com/in/sertacakalin'
const EMAIL = 'sertacakalin0@gmail.com'
const CV_TR = '/cv/SertacAkalin_CV_TR.pdf'
const CV_EN = '/cv/SertacAkalin_CV_EN.pdf'

const roles = ['Backend Developer', 'Java / Spring Boot', 'Python / FastAPI', 'Bilgisayar Mühendisi']

const dockItems = [
  { label: 'Ana Sayfa', href: '#hero', icon: LuHouse },
  { label: 'Deneyim', href: '#deneyim', icon: LuBriefcase },
  { label: 'Projeler', href: '#projeler', icon: LuFolderGit2 },
  { label: 'Eğitim', href: '#egitim', icon: LuGraduationCap },
  { label: 'CV', href: CV_TR, icon: LuFileText, external: true },
  { label: 'GitHub', href: GITHUB_URL, icon: LuGithub, external: true },
  { label: 'LinkedIn', href: LINKEDIN_URL, icon: LuLinkedin, external: true },
  { label: 'İletişim', href: '#iletisim', icon: LuMail },
]

const experience = [
  {
    company: 'FEV Türkiye',
    role: 'Yazılım Mühendisi Stajyeri',
    date: 'OCAK 2026 — HAZİRAN 2026',
    points: [
      'Jaguar Land Rover / Tata için geliştirilen SOVD (Service-Oriented Vehicle Diagnostics) projesinde Python ve FastAPI ile backend tarafında çalıştım.',
      'REST tabanlı diagnostik servislerin uç noktalarının geliştirilmesinde yer aldım.',
      "Almanya ve Hindistan'dan mühendislerin olduğu uluslararası bir ekipte, daily'ler ve kurumsal süreçlerin içinde çalıştım.",
    ],
    stack: ['Python', 'FastAPI', 'REST', 'Git'],
  },
  {
    company: 'CodeFirst',
    role: 'Java Backend Developer Stajyeri',
    date: 'OCAK 2025 — NİSAN 2025',
    points: [
      'Spring Boot tabanlı, mikroservis ve katmanlı mimaride (Controller–Service–Repository) RESTful API ve harici servis entegrasyonları geliştirdim.',
      'Spring Data JPA / Hibernate ile veritabanı işlemleri; DTO yapıları, transaction yönetimi ve JWT tabanlı kimlik doğrulama üzerinde çalıştım.',
      'Test ve dokümantasyon için Postman/Swagger, ortam yönetimi için Git/Docker kullandım.',
    ],
    stack: ['Java', 'Spring Boot', 'JPA', 'PostgreSQL', 'Docker'],
  },
]

const featuredProjects = [
  {
    name: 'Palmystra',
    desc: 'El fotoğrafından kişiselleştirilmiş yorumlar üreten full-stack iOS uygulaması. Görüntü işlemeyle el çizgisi tespiti, LangChain tabanlı bilgi tabanından yorum üretimi. Backend tarafında API güvenliği, rate limiting ve test paketi; Docker ile Google Cloud Run üzerinde yayında.',
    tags: ['FastAPI', 'LangChain', 'OpenCV', 'SwiftUI', 'Cloud Run'],
    link: null,
    note: 'Kapalı kaynak',
  },
  {
    name: 'Hatched Area Violation Detection',
    desc: 'Trafik videolarında araçların taralı yol alanlarına girişini tespit eden bilgisayarlı görü sistemi. Kendi topladığım İstanbul trafiği veri setiyle fine-tune edilmiş YOLOv8 (%85+ tespit), ByteTrack ile çoklu araç takibi, ihlal anında plaka tespiti + OCR.',
    tags: ['YOLOv8', 'ByteTrack', 'OpenCV', 'EasyOCR'],
    link: 'https://github.com/sertacakalin/hatched-area-violation-detection',
    note: null,
  },
]

const otherRepos = [
  {
    name: 'multi-threaded-image-pipeline',
    lang: 'C++',
    link: 'https://github.com/sertacakalin/multi-threaded-image-pipeline',
  },
  { name: 'AutoDiag', lang: 'Python', link: 'https://github.com/sertacakalin/AutoDiag' },
  { name: 'WalletLogSAD', lang: 'JavaScript', link: 'https://github.com/sertacakalin/WalletLogSAD' },
]

const education = [
  {
    school: 'İstanbul Arel Üniversitesi',
    degree: 'Bilgisayar Mühendisliği (İngilizce), Lisans',
    date: '2022 — 2026',
  },
  { school: 'Önlisans', degree: 'Web Tasarım ve Kodlama', date: '2020 — 2022' },
  { school: 'Akdeniz Üniversitesi', degree: 'Harita ve Kadastro', date: '2018 — 2020' },
]

const skills = [
  { label: 'Backend', items: ['Java', 'Spring Boot', 'Spring Data JPA', 'Python', 'FastAPI'] },
  { label: 'Veritabanı', items: ['PostgreSQL', 'MySQL'] },
  { label: 'AI', items: ['LangChain', 'RAG', 'OpenCV', 'YOLOv8'] },
  { label: 'Araçlar', items: ['Git', 'Docker', 'Postman', 'Firebase'] },
]

function App() {
  const [typedText, setTypedText] = useState(roles[0])
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    let roleIndex = 0
    let charIndex = roles[0].length
    let isDeleting = false
    let timerId

    const typeEffect = () => {
      const currentRole = roles[roleIndex]
      const nextCharIndex = isDeleting ? charIndex - 1 : charIndex + 1

      setTypedText(currentRole.substring(0, nextCharIndex))
      charIndex = nextCharIndex

      let typeSpeed = isDeleting ? 45 : 90

      if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2400
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        roleIndex = (roleIndex + 1) % roles.length
        typeSpeed = 400
      }

      timerId = setTimeout(typeEffect, typeSpeed)
    }

    timerId = setTimeout(typeEffect, 2400)
    return () => clearTimeout(timerId)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll('.reveal').forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')

    const onScroll = () => {
      let current = 'hero'
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 250) {
          current = section.getAttribute('id') || 'hero'
        }
      })
      setActiveSection(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="grid-bg" aria-hidden="true" />

      <FloatingDock items={dockItems} activeSection={activeSection} />

      <main className="wrap">
        <section id="hero" className="hero reveal">
          <p className="hero__hi mono">merhaba, ben</p>
          <h1 className="hero__name">SERTAÇ AKALIN</h1>
          <p className="hero__type">
            <span>{typedText}</span>
            <span className="cursor">_</span>
          </p>
          <p className="bio">
            Bilgisayar Mühendisliği (İngilizce) mezunuyum. Java/Spring Boot ve Python/FastAPI ile
            backend geliştiriyorum; REST API'ler, veritabanı işlemleri ve servis entegrasyonları
            üzerine çalışıyorum. Yanında da bilgisayarlı görü ve LLM tabanlı projeler geliştiriyorum.
          </p>

          <div className="socials">
            <a href={GITHUB_URL} className="social-link" target="_blank" rel="noopener noreferrer">
              <FaGithub className="social-icon" />
              <span>GitHub</span>
            </a>
            <a href={LINKEDIN_URL} className="social-link" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="social-icon" />
              <span>LinkedIn</span>
            </a>
            <a
              href={CV_TR}
              className="social-link cv-download"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFileDownload className="social-icon" />
              <span>CV — TR</span>
            </a>
            <a
              href={CV_EN}
              className="social-link cv-download"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFileDownload className="social-icon" />
              <span>CV — EN</span>
            </a>
          </div>
        </section>

        <section id="deneyim" className="section reveal">
          <h2 className="section-title">Deneyim</h2>
          <div className="timeline">
            {experience.map((job) => (
              <div className="timeline__item" key={job.company}>
                <span className="timeline__date mono">{job.date}</span>
                <h3 className="timeline__title">
                  {job.role} <span className="timeline__company-accent">· {job.company}</span>
                </h3>
                <ul className="timeline__points">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="tags">
                  {job.stack.map((tag) => (
                    <span className="pill" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projeler" className="section reveal">
          <h2 className="section-title">Projeler</h2>
          <div className="projects__grid">
            {featuredProjects.map((project) => (
              <article className="card" key={project.name}>
                <div className="card__top">
                  <h3 className="card__heading">{project.name}</h3>
                  {project.note && <span className="card__note mono">{project.note}</span>}
                </div>
                <p className="card__text">{project.desc}</p>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span className="pill" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <div className="card__links">
                    <a
                      href={project.link}
                      className="card-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub /> GitHub'da incele
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="repos">
            <p className="repos__label mono">diğer repolar</p>
            <div className="repos__list">
              {otherRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-chip mono"
                >
                  {repo.name}
                  <span className="repo-chip__lang">{repo.lang}</span>
                </a>
              ))}
              <a
                href={`${GITHUB_URL}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-chip mono"
              >
                tümü <LuArrowUpRight />
              </a>
            </div>
          </div>
        </section>

        <section id="egitim" className="section reveal">
          <h2 className="section-title">Eğitim</h2>
          <div className="edu__list">
            {education.map((item) => (
              <div className="education__item" key={item.degree}>
                <div>
                  <h3 className="education__degree">{item.school}</h3>
                  <p className="education__school">{item.degree}</p>
                </div>
                <span className="education__date mono">{item.date}</span>
              </div>
            ))}
          </div>

          <div className="skills">
            {skills.map((row) => (
              <div className="skills__row" key={row.label}>
                <span className="skills__label mono">{row.label}</span>
                <div className="tags">
                  {row.items.map((item) => (
                    <span className="pill" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="iletisim" className="section contact reveal">
          <h2 className="section-title">İletişim</h2>
          <p className="contact__text">
            Bir pozisyon, bir proje ya da sadece selam vermek için — mail atman yeterli.
          </p>
          <a href={`mailto:${EMAIL}`} className="contact__mail mono">
            {EMAIL}
          </a>
          <div className="contact__actions">
            <a href={CV_TR} className="social-link" target="_blank" rel="noopener noreferrer">
              <FaFileDownload className="social-icon" />
              <span>CV (Türkçe)</span>
            </a>
            <a href={CV_EN} className="social-link" target="_blank" rel="noopener noreferrer">
              <FaFileDownload className="social-icon" />
              <span>CV (English)</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          © 2026 <span>SERTAÇ AKALIN</span>
        </p>
        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <FaArrowUp className="back-to-top-icon" />
          <span>Başa Dön</span>
        </button>
      </footer>
    </>
  )
}

export default App
