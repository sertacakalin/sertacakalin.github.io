import { useEffect, useState, useRef, lazy, Suspense } from 'react'
import './App.css'

const Lanyard = lazy(() => import('./Lanyard'))
import VariableProximity from './VariableProximity'
import FloatingDock from './FloatingDock'
import { FaGithub, FaLinkedin, FaFileDownload, FaArrowUp } from 'react-icons/fa'
import {
  LuHouse,
  LuBriefcase,
  LuUser,
  LuBookOpen,
  LuGithub,
  LuLinkedin,
  LuMail,
} from 'react-icons/lu'

const GITHUB_URL = 'https://github.com/sertacakalin'
const LINKEDIN_URL = 'https://linkedin.com/in/sertacakalin'
const EMAIL = 'sertacakalin0@gmail.com'

const roles = ['Bilgisayar Mühendisi', 'Full-Stack Developer', 'IoT Enthusiast']

const dockItems = [
  { label: 'Ana Sayfa', href: '#hero', icon: LuHouse },
  { label: 'Projeler', href: '#projeler', icon: LuBriefcase },
  { label: 'Deneyim', href: '#deneyim', icon: LuUser },
  { label: 'Eğitim', href: '#egitim', icon: LuBookOpen },
  { label: 'GitHub', href: GITHUB_URL, icon: LuGithub, external: true },
  { label: 'LinkedIn', href: LINKEDIN_URL, icon: LuLinkedin, external: true },
  { label: 'İletişim', href: '#iletisim', icon: LuMail },
]

const projects = [
  {
    icon: '◆',
    title: 'AI-Powered Translation System',
    text: 'Python ve NLP kullanarak çok dilli otomatik belge çeviri sistemi geliştirdim. FastAPI ve n8n ile iş akışı otomasyonu entegre ettim, Docker ile dağıttım.',
    tags: ['Python', 'FastAPI', 'Docker', 'NLP'],
    hasDemo: true,
  },
  {
    icon: '▲',
    title: 'Smart Beehive Monitoring',
    text: 'ESP32-S3 için düşük güçlü firmware geliştirdim: sensör sürücüleri, LoRa telemetri ve TensorFlow Lite Micro ile cihaz üstü ML anomali tespiti.',
    tags: ['ESP32', 'LoRa', 'TinyML', 'C++'],
    hasDemo: false,
  },
  {
    icon: '●',
    title: 'Task Management System',
    text: 'React kullanarak web tabanlı toplantı ve görev yönetimi uygulaması geliştirdim. Hooks, Zustand ve RESTful API entegrasyonu sağladım.',
    tags: ['React', 'Zustand', 'Figma', 'REST API'],
    hasDemo: true,
  },
]

function App() {
  const [showLoader, setShowLoader] = useState(true)
  const [typedText, setTypedText] = useState('SERTAÇ AKALIN')
  const [activeSection, setActiveSection] = useState('hero')
  const containerRef = useRef(null)

  useEffect(() => {
    document.title = 'SERTAÇ AKALIN | Bilgisayar Mühendisi Portfolyosu'
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => setShowLoader(false), 1500)
    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    let roleIndex = 0
    let charIndex = 0
    let isDeleting = false
    let timerId

    const typeEffect = () => {
      const currentRole = roles[roleIndex]
      const nextCharIndex = isDeleting ? charIndex - 1 : charIndex + 1

      setTypedText(currentRole.substring(0, nextCharIndex))
      charIndex = nextCharIndex

      let typeSpeed = isDeleting ? 50 : 100

      if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        roleIndex = (roleIndex + 1) % roles.length
        typeSpeed = 500
      }

      timerId = setTimeout(typeEffect, typeSpeed)
    }

    timerId = setTimeout(typeEffect, 1000)

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
      { threshold: 0.15 },
    )

    const revealItems = document.querySelectorAll('.reveal')
    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')

    const onScroll = () => {
      let current = 'hero'
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 200) {
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
      {showLoader && (
        <div id="loader">
          <div className="loader-content">
            <h1 className="loader-title">SERTAÇ AKALIN</h1>
            <div className="loader-bar" />
          </div>
        </div>
      )}

      <div className="grid-bg" aria-hidden="true" />

      <FloatingDock items={dockItems} activeSection={activeSection} />

      <main className="wrap" ref={containerRef}>
        <section className="hero reveal" id="hero">
          <div className="profile">
            <Suspense fallback={null}>
              <Lanyard position={[0, 0, 30]} gravity={[0, -40, 0]} fov={20} transparent />
            </Suspense>
            <VariableProximity
              label="SERTAÇ AKALIN"
              className="profile-name"
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 900"
              radius={100}
              falloff="linear"
              containerRef={containerRef}
            />
          </div>

          <div className="hero__content">
            <h1>
              <span id="typewriter">{typedText}</span>
              <span className="cursor">_</span>
            </h1>
            <p className="subtitle">Bilgisayar Mühendisi & Full-Stack Developer</p>
            <p className="bio">
              Web ve mobil teknolojilerde uzmanlaşmış yazılım geliştiricisi. Modern çözümler üreten,
              kullanıcı odaklı projeler geliştiren mühendis.
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
              <a href="/cv.pdf" className="social-link cv-download" download>
                <FaFileDownload className="social-icon" />
                <span>CV İndir</span>
              </a>
            </div>
          </div>
        </section>

        <section className="projects reveal" id="projeler">
          <h2 className="section-title">
            <VariableProximity
              label="PROJELER"
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 900"
              radius={100}
              falloff="linear"
              containerRef={containerRef}
            />
          </h2>
          <div className="projects__grid">
            {projects.map((project) => (
              <article className="card" key={project.title}>
                <div className="card__top">
                  <div className="card__icon">{project.icon}</div>
                </div>
                <h3 className="card__heading">{project.title}</h3>
                <p className="card__text">{project.text}</p>
                <div className="card__meta">
                  {project.tags.map((tag) => (
                    <span className="pill" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="card__links">
                  <a
                    href={GITHUB_URL}
                    className="card-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  {project.hasDemo && (
                    <a href="#" className="card-btn">
                      Demo
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience reveal" id="deneyim">
          <h2 className="section-title">
            <VariableProximity
              label="DENEYİM"
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 900"
              radius={100}
              falloff="linear"
              containerRef={containerRef}
            />
          </h2>
          <div className="timeline">
            <div className="timeline__item">
              <span className="timeline__date">2023 - DEVAM</span>
              <h3 className="timeline__title">Yazılım Mühendisi</h3>
              <p className="timeline__company">Şirket Adı A.Ş.</p>
              <p className="timeline__desc">
                Full-stack web uygulamaları geliştirme, API tasarımı ve veritabanı optimizasyonu.
                Agile metodolojileri ile takım çalışması.
              </p>
            </div>
            <div className="timeline__item">
              <span className="timeline__date">2022 - 2023</span>
              <h3 className="timeline__title">Stajyer Yazılım Geliştirici</h3>
              <p className="timeline__company">Teknoloji Firması Ltd.</p>
              <p className="timeline__desc">
                Backend servislerinin geliştirilmesi ve test süreçlerine katkı. CI/CD pipeline
                kurulumu ve dokümantasyon süreçlerinin yönetimi.
              </p>
            </div>
          </div>
        </section>

        <section className="education reveal" id="egitim">
          <h2 className="section-title">
            <VariableProximity
              label="EĞİTİM"
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 900"
              radius={100}
              falloff="linear"
              containerRef={containerRef}
            />
          </h2>
          <div className="education__item">
            <h3 className="education__degree">Bilgisayar Mühendisliği, Lisans</h3>
            <p className="education__school">X Üniversitesi</p>
            <span className="education__date">2019 - 2023</span>
          </div>
        </section>

        <section className="contact reveal" id="iletisim">
          <h2 className="section-title">
            <VariableProximity
              label="İletişime Geçin"
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 900"
              radius={100}
              falloff="linear"
              containerRef={containerRef}
            />
          </h2>
          <p className="contact__text">
            Projeleriniz veya iş birliği fırsatları hakkında konuşmak isterseniz aşağıdaki form
            üzerinden bana mesaj gönderebilirsiniz.
          </p>

          <form className="contact-form" action={`https://formsubmit.co/${EMAIL}`} method="POST">
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="Portfolyo iletişim formu" />
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Adınız Soyadınız"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="E-posta Adresiniz"
                required
              />
            </div>
            <div className="form-group">
              <textarea name="message" className="form-input" placeholder="Mesajınız..." required />
            </div>
            <button type="submit" className="submit-btn">
              Gönder
            </button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <p>
          © 2026 <span>SERTAÇ AKALIN</span>. Tüm hakları saklıdır.
        </p>
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <FaArrowUp className="back-to-top-icon" />
          <span>Başa Dön</span>
        </button>
      </footer>
    </>
  )
}

export default App
