import { useEffect, useState } from 'react'
import './App.css'
import FloatingDock from './FloatingDock'
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

const dockItems = [
  { label: 'Ana sayfa', href: '#hero', icon: LuHouse },
  { label: 'Deneyim', href: '#deneyim', icon: LuBriefcase },
  { label: 'Projeler', href: '#projeler', icon: LuFolderGit2 },
  { label: 'Eğitim', href: '#egitim', icon: LuGraduationCap },
  { label: 'CV', href: CV_TR, icon: LuFileText, external: true },
  { label: 'GitHub', href: GITHUB_URL, icon: LuGithub, external: true },
  { label: 'LinkedIn', href: LINKEDIN_URL, icon: LuLinkedin, external: true },
  { label: 'E-posta', href: `mailto:${EMAIL}`, icon: LuMail, external: true },
]

const experience = [
  {
    company: 'FEV Türkiye',
    role: 'Yazılım Mühendisi Stajyeri',
    date: 'Oca 2026 — Haz 2026',
    points: [
      'Jaguar Land Rover / Tata için geliştirilen SOVD (Service-Oriented Vehicle Diagnostics) projesinde Python ve FastAPI ile backend tarafında çalıştım.',
      'REST tabanlı diagnostik servislerin uç noktalarının geliştirilmesinde yer aldım.',
      "Almanya ve Hindistan'dan mühendislerin olduğu bir ekipte, daily'ler ve kurumsal süreçlerin içinde çalıştım.",
    ],
    stack: ['Python', 'FastAPI', 'REST', 'Git'],
  },
  {
    company: 'CodeFirst',
    role: 'Java Backend Developer Stajyeri',
    date: 'Oca 2025 — Nis 2025',
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
    desc: 'El fotoğrafından kişiselleştirilmiş yorumlar üreten full-stack iOS uygulaması. Görüntü işlemeyle el çizgilerini tespit eden ve LangChain tabanlı bilgi tabanından yorum üreten bir AI pipeline kurdum. Backend tarafında API güvenliği, rate limiting ve test paketi var; Docker ile Google Cloud Run üzerinde yayında.',
    stack: ['FastAPI', 'LangChain', 'OpenCV', 'SwiftUI', 'Cloud Run'],
    link: null,
    note: 'kapalı kaynak',
  },
  {
    name: 'hatched-area-violation-detection',
    desc: 'Trafik videolarında araçların taralı yol alanlarına girişini tespit eden bilgisayarlı görü sistemi. Kendi topladığım İstanbul trafiği veri setiyle YOLOv8 fine-tune ettim (%85+ tespit), ByteTrack ile çoklu araç takibi yaptım. İhlal anında Türk plakalarını okuyan plaka tespiti + OCR + format doğrulama akışı da ekledim.',
    stack: ['YOLOv8', 'ByteTrack', 'OpenCV', 'EasyOCR', 'Shapely'],
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
  { label: 'backend', items: 'Java, Spring Boot, Spring Data JPA, Python, FastAPI' },
  { label: 'veritabanı', items: 'PostgreSQL, MySQL' },
  { label: 'ai', items: 'LangChain, RAG, OpenCV, YOLOv8' },
  { label: 'araçlar', items: 'Git, Docker, Postman, Firebase' },
]

function App() {
  const [activeSection, setActiveSection] = useState('hero')

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
          <h1 className="hero__name">Sertaç Akalın</h1>
          <p className="hero__role">
            Backend Developer — <span>Java / Spring Boot</span> · <span>Python / FastAPI</span>
          </p>
          <p className="hero__text">
            Bilgisayar Mühendisliği (İngilizce) mezunuyum. REST API'ler, veritabanı işlemleri ve
            servis entegrasyonları üzerine çalışıyorum; yanında da bilgisayarlı görü ve LLM tabanlı
            projeler geliştiriyorum. Öğrendiğimi gerçek projede kullanmayı, karşılığında da projeden
            yeni şeyler öğrenmeyi severim.
          </p>

          <div className="hero__links mono">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <LuGithub /> github
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              <LuLinkedin /> linkedin
            </a>
            <a href={`mailto:${EMAIL}`}>
              <LuMail /> e-posta
            </a>
            <a href={CV_TR} target="_blank" rel="noopener noreferrer" className="hero__cv">
              <LuFileText /> cv — tr
            </a>
            <a href={CV_EN} target="_blank" rel="noopener noreferrer" className="hero__cv">
              <LuFileText /> cv — en
            </a>
          </div>
        </section>

        <section id="deneyim" className="section reveal">
          <h2 className="section-label mono">deneyim</h2>
          <div className="entries">
            {experience.map((job) => (
              <article className="entry" key={job.company}>
                <div className="entry__head">
                  <h3>
                    {job.role} <span className="entry__at">· {job.company}</span>
                  </h3>
                  <span className="entry__date mono">{job.date}</span>
                </div>
                <ul className="entry__points">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <p className="entry__stack mono">{job.stack.join(' · ')}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projeler" className="section reveal">
          <h2 className="section-label mono">projeler</h2>
          <div className="entries">
            {featuredProjects.map((project) => (
              <article className="project" key={project.name}>
                <div className="entry__head">
                  <h3>
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project__link"
                      >
                        {project.name} <LuArrowUpRight className="project__arrow" />
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  {project.note && <span className="entry__date mono">{project.note}</span>}
                </div>
                <p className="project__desc">{project.desc}</p>
                <p className="entry__stack mono">{project.stack.join(' · ')}</p>
              </article>
            ))}
          </div>

          <div className="repos">
            <p className="repos__label mono">diğer repolar</p>
            <ul className="repos__list">
              {otherRepos.map((repo) => (
                <li key={repo.name}>
                  <a href={repo.link} target="_blank" rel="noopener noreferrer" className="mono">
                    {repo.name}
                    <span className="repos__lang">{repo.lang}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`${GITHUB_URL}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono repos__all"
                >
                  tümü <LuArrowUpRight />
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section id="egitim" className="section reveal">
          <h2 className="section-label mono">eğitim</h2>
          <div className="edu">
            {education.map((item) => (
              <div className="edu__row" key={item.degree}>
                <div>
                  <p className="edu__school">{item.school}</p>
                  <p className="edu__degree">{item.degree}</p>
                </div>
                <span className="entry__date mono">{item.date}</span>
              </div>
            ))}
          </div>

          <div className="skills">
            {skills.map((row) => (
              <p className="skills__row mono" key={row.label}>
                <span className="skills__label">{row.label}:</span> {row.items}
              </p>
            ))}
          </div>
        </section>

        <section id="iletisim" className="section section--contact reveal">
          <h2 className="section-label mono">iletişim</h2>
          <p className="contact__text">
            Bir pozisyon, bir proje ya da sadece selam vermek için — mail atman yeterli.
          </p>
          <a href={`mailto:${EMAIL}`} className="contact__mail mono">
            {EMAIL}
          </a>
          <div className="contact__cv mono">
            <a href={CV_TR} target="_blank" rel="noopener noreferrer">
              <LuFileText /> CV (Türkçe)
            </a>
            <a href={CV_EN} target="_blank" rel="noopener noreferrer">
              <LuFileText /> CV (English)
            </a>
          </div>
        </section>
      </main>

      <footer className="footer mono">
        <p>© 2026 Sertaç Akalın</p>
        <a
          href="https://github.com/sertacakalin/sertacakalin.github.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          kaynak kodu
        </a>
      </footer>
    </>
  )
}

export default App
