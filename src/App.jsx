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
  LuCircleCheck,
  LuServer,
  LuBrain,
  LuWorkflow,
  LuCode,
  LuScanEye,
  LuClock,
  LuSend,
} from 'react-icons/lu'
import {
  SiSpringboot,
  SiFastapi,
  SiPython,
  SiPostgresql,
  SiMysql,
  SiDocker,
  SiGit,
  SiPostman,
  SiFirebase,
  SiOpencv,
  SiReact,
  SiLangchain,
  SiGooglecloud,
  SiN8N,
} from 'react-icons/si'
import { DiJava } from 'react-icons/di'

const GITHUB_URL = 'https://github.com/sertacakalin'
const LINKEDIN_URL = 'https://linkedin.com/in/sertacakalin'
const EMAIL = 'sertacakalin0@gmail.com'
const CV_TR = '/cv/SertacAkalin_CV_TR.pdf'
const CV_EN = '/cv/SertacAkalin_CV_EN.pdf'

const dockItems = [
  { label: 'Ana Sayfa', href: '#hakkimda', icon: LuHouse },
  { label: 'Deneyim', href: '#deneyim', icon: LuBriefcase },
  { label: 'Projeler', href: '#projeler', icon: LuFolderGit2 },
  { label: 'Eğitim', href: '#egitim', icon: LuGraduationCap },
  { label: 'CV', href: CV_TR, icon: LuFileText, external: true },
  { label: 'GitHub', href: GITHUB_URL, icon: LuGithub, external: true },
  { label: 'LinkedIn', href: LINKEDIN_URL, icon: LuLinkedin, external: true },
  { label: 'İletişim', href: '#iletisim', icon: LuMail },
]

const services = [
  {
    icon: LuServer,
    title: 'Backend Geliştirme',
    desc: 'Spring Boot ve FastAPI ile katmanlı mimaride, üretime dönük REST API geliştirme.',
    checks: [
      'Controller–Service–Repository katmanlı mimari ve mikroservis pratiği',
      'Spring Data JPA / Hibernate ile veritabanı işlemleri ve DTO yapıları',
      'JWT tabanlı kimlik doğrulama ve transaction yönetimi',
      'Postman/Swagger ile test ve API dokümantasyonu',
    ],
    chips: ['Java', 'Spring Boot', 'Python', 'FastAPI'],
  },
  {
    icon: LuBrain,
    tone: 'purple',
    title: 'AI & Bilgisayarlı Görü',
    desc: 'LLM entegrasyonları ve görüntü işleme pipeline’ları — demolar değil, çalışan sistemler.',
    checks: [
      'LangChain tabanlı RAG ve bilgi tabanı entegrasyonları',
      'YOLOv8 fine-tuning ve ByteTrack ile çoklu nesne takibi',
      'OpenCV ile görüntü işleme akışları',
      'EasyOCR ile plaka okuma ve format doğrulama',
    ],
    chips: ['LangChain', 'RAG', 'YOLOv8', 'OpenCV'],
  },
  {
    icon: LuWorkflow,
    tone: 'green',
    title: 'Deployment & Araçlar',
    desc: 'Geliştirmeden yayına kadar sürecin tamamında kullandığım araç seti.',
    checks: [
      'Docker ile konteynerleştirme ve ortam yönetimi',
      'Google Cloud Run üzerinde yayına alma',
      'Git ile versiyon kontrolü ve ekip içi iş akışları',
      'Firebase servis entegrasyonları',
    ],
    chips: ['Docker', 'Git', 'Cloud Run', 'Firebase'],
  },
]

const experience = [
  {
    company: 'FEV Türkiye',
    role: 'Yazılım Mühendisi Stajyeri',
    date: 'Ocak — Haziran 2026',
    points: [
      'Jaguar Land Rover / Tata için geliştirilen SOVD (Service-Oriented Vehicle Diagnostics) projesinde Python ve FastAPI ile backend tarafında çalıştım.',
      'REST tabanlı diagnostik servislerin uç noktalarının geliştirilmesinde yer aldım.',
      "Almanya ve Hindistan'dan mühendislerin olduğu uluslararası bir ekipte, daily'ler ve kurumsal süreçlerin içinde çalıştım.",
    ],
    chips: ['Python', 'FastAPI', 'REST', 'Git'],
  },
  {
    company: 'CodeFirst',
    tone: 'orange',
    role: 'Java Backend Developer Stajyeri',
    date: 'Ocak — Nisan 2025',
    points: [
      'Spring Boot tabanlı, mikroservis ve katmanlı mimaride RESTful API ve harici servis entegrasyonları geliştirdim.',
      'Spring Data JPA / Hibernate ile veritabanı işlemleri; DTO yapıları, transaction yönetimi ve JWT tabanlı kimlik doğrulama üzerinde çalıştım.',
      'Test ve dokümantasyon için Postman/Swagger, ortam yönetimi için Git/Docker kullandım.',
    ],
    chips: ['Java', 'Spring Boot', 'JPA', 'PostgreSQL', 'Docker'],
  },
]

const featuredProjects = [
  {
    name: 'Palmystra — AI Destekli iOS Uygulaması',
    desc: 'El fotoğrafından kişiselleştirilmiş yorumlar üreten full-stack iOS uygulaması. Görüntü işlemeyle el çizgisi tespiti, LangChain tabanlı bilgi tabanından yorum üretimi. API güvenliği, rate limiting ve test paketiyle Docker + Google Cloud Run üzerinde yayında.',
    tags: ['FastAPI', 'LangChain', 'OpenCV', 'SwiftUI', 'Cloud Run'],
    link: null,
    note: 'Kapalı kaynak',
    thumbClass: 'thumb--palmystra',
    thumbIcon: LuScanEye,
    thumbText: 'Palmystra',
  },
  {
    name: 'Hatched Area Violation Detection',
    desc: 'Trafik videolarında araçların taralı yol alanlarına girişini tespit eden bilgisayarlı görü sistemi. Kendi topladığım İstanbul trafiği veri setiyle fine-tune edilmiş YOLOv8 (%85+ tespit), ByteTrack ile çoklu araç takibi, ihlal anında plaka tespiti + OCR.',
    tags: ['YOLOv8', 'ByteTrack', 'OpenCV', 'EasyOCR', 'Shapely'],
    link: 'https://github.com/sertacakalin/hatched-area-violation-detection',
    note: null,
    thumbClass: 'thumb--hatched',
    thumbIcon: LuScanEye,
    thumbText: 'Violation Detection',
  },
]

const otherRepos = [
  {
    name: 'multi-threaded-image-pipeline',
    desc: 'C++ ile çok iş parçacıklı görüntü işleme pipeline’ı.',
    chips: ['C++', 'Multithreading'],
    link: 'https://github.com/sertacakalin/multi-threaded-image-pipeline',
  },
  {
    name: 'AutoDiag',
    desc: 'Python ile araç diagnostik verileri üzerine deneysel araç.',
    chips: ['Python'],
    link: 'https://github.com/sertacakalin/AutoDiag',
  },
]

const stackCategories = [
  {
    title: 'Backend & Frameworks',
    desc: 'API geliştirmede kullandığım diller ve framework’ler.',
    tiles: [
      { icon: DiJava, name: 'Java' },
      { icon: SiSpringboot, name: 'Spring Boot' },
      { icon: SiPython, name: 'Python' },
      { icon: SiFastapi, name: 'FastAPI' },
      { icon: SiReact, name: 'React' },
    ],
  },
  {
    title: 'AI & Görüntü İşleme',
    tone: 'purple',
    desc: 'LLM entegrasyonları ve bilgisayarlı görü projelerinde kullandıklarım.',
    tiles: [
      { icon: SiLangchain, name: 'LangChain' },
      { icon: LuBrain, name: 'RAG' },
      { icon: SiOpencv, name: 'OpenCV' },
      { icon: LuScanEye, name: 'YOLOv8' },
      { icon: SiN8N, name: 'n8n' },
    ],
  },
]

const stackWide = {
  title: 'Veritabanı, Araçlar & Deployment',
  desc: 'Veri katmanı, versiyon kontrolü ve yayına alma tarafında kullandıklarım.',
  tiles: [
    { icon: SiPostgresql, name: 'PostgreSQL' },
    { icon: SiMysql, name: 'MySQL' },
    { icon: SiDocker, name: 'Docker' },
    { icon: SiGit, name: 'Git' },
    { icon: SiPostman, name: 'Postman' },
    { icon: SiFirebase, name: 'Firebase' },
    { icon: SiGooglecloud, name: 'Cloud Run' },
  ],
}

const education = [
  {
    school: 'İstanbul Arel Üniversitesi',
    degree: 'Bilgisayar Mühendisliği (İngilizce), Lisans',
    date: '2022 — 2026',
  },
  { school: 'Önlisans', degree: 'Web Tasarım ve Kodlama', date: '2020 — 2022' },
  { school: 'Akdeniz Üniversitesi', degree: 'Harita ve Kadastro', date: '2018 — 2020' },
]

const quickFacts = [
  { label: 'İngilizce', value: 'B2 — eğitim dilim İngilizce' },
  { label: 'Askerlik', value: 'Tamamlandı' },
  { label: 'Konum', value: 'İstanbul' },
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
  const [activeSection, setActiveSection] = useState('hakkimda')

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

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')

    const onScroll = () => {
      let current = 'hakkimda'
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 300) {
          current = section.getAttribute('id') || 'hakkimda'
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
        {/* ============ ÜST BLOK: HAKKIMDA (SOL) + PROJELER (SAĞ) ============ */}
        <div className="top">
          <section id="hakkimda" className="profile reveal">
            <div className="about__avatar">SA</div>
            <p className="eyebrow mono">
              <span className="eyebrow__dot" /> YENİ FIRSATLARA AÇIĞIM
            </p>
            <h1 className="profile__name">Sertaç Akalın</h1>
            <p className="profile__role">Bilgisayar Mühendisi · Backend Developer</p>
            <p className="about__text">
              İstanbul Arel Üniversitesi Bilgisayar Mühendisliği (İngilizce) mezunuyum. Java/Spring
              Boot ve Python/FastAPI ile backend geliştiriyorum; yanında bilgisayarlı görü ve LLM
              tabanlı projeler yapıyorum. Stajlarımda kurumsal yazılım süreçlerinin ve uluslararası
              ekiplerin içinde bulundum.
            </p>
            <div className="profile__actions">
              <a href={CV_TR} className="btn btn--cyan" target="_blank" rel="noopener noreferrer">
                <LuFileText /> CV — Türkçe
              </a>
              <a
                href={CV_EN}
                className="btn btn--outline-cyan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LuFileText /> CV — English
              </a>
              <a href="#iletisim" className="btn btn--white">
                İletişime Geç
              </a>
            </div>

            <h3 className="about__col-title mono" id="egitim">
              EĞİTİM
            </h3>
            <div className="mini__list">
              {education.map((item) => (
                <div className="mini card--purple" key={item.degree}>
                  <span className="mini__icon tone--purple">
                    <LuGraduationCap />
                  </span>
                  <div>
                    <p className="mini__title">{item.school}</p>
                    <p className="mini__desc">{item.degree}</p>
                  </div>
                  <span className="mini__date mono">{item.date}</span>
                </div>
              ))}
            </div>

            <p className="profile__facts mono">
              {quickFacts.map((fact, i) => (
                <span key={fact.label}>
                  {i > 0 && <span className="profile__facts-dot">·</span>}
                  {fact.label}: {fact.value.split(' — ')[0]}
                </span>
              ))}
            </p>
          </section>

          <section id="projeler" className="projects-col reveal">
            <div className="shead shead--inline">
              <p className="shead__label mono">
                <span className="shead__line" />
                <span className="shead__dot" />
                PORTFOLYO
                <span className="shead__dot" />
                <span className="shead__line" />
              </p>
              <h2 className="shead__title shead__title--sm">Neler Yaptım</h2>
            </div>
            {featuredProjects.map((project) => {
              const ThumbIcon = project.thumbIcon
              return (
                <article className="pcard" key={project.name}>
                  <div className={`pcard__thumb ${project.thumbClass}`}>
                    <span className="pcard__badge mono">Öne Çıkan</span>
                    <ThumbIcon className="pcard__thumb-icon" />
                    <span className="pcard__thumb-text">{project.thumbText}</span>
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

            <div className="repos-row">
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
                tümü <LuArrowUpRight />
              </a>
            </div>
          </section>
        </div>

        {/* ============ DENEYİM ============ */}
        <section id="deneyim" className="section reveal">
          <SectionHead
            label="DENEYİM"
            title="Nerelerde Çalıştım"
            sub="İki stajda kurumsal yazılım geliştirme süreçlerinin içinde bulundum."
          />
          <div className="xp__list">
            {experience.map((job) => (
              <article
                className={`xp${job.tone ? ` card--${job.tone}` : ''}`}
                key={job.company}
              >
                <div className="xp__head">
                  <span className={`xp__icon${job.tone ? ` tone--${job.tone}` : ''}`}>
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

        {/* ============ YETKİNLİKLER ============ */}
        <section id="yetkinlikler" className="section reveal">
          <SectionHead
            label="NELER YAPIYORUM"
            title="Yetkinlikler"
            sub="Stajlarda ve kendi projelerimde kullandığım, üzerine gitmeye devam ettiğim alanlar."
          />
          <div className="grid3">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <article
                  className={`scard${service.tone ? ` card--${service.tone}` : ''}`}
                  key={service.title}
                >
                  <span className={`scard__icon${service.tone ? ` tone--${service.tone}` : ''}`}>
                    <Icon />
                  </span>
                  <h3 className="scard__title">{service.title}</h3>
                  <p className="scard__desc">{service.desc}</p>
                  <ul className="checks">
                    {service.checks.map((check) => (
                      <li key={check}>
                        <LuCircleCheck className="checks__icon" />
                        {check}
                      </li>
                    ))}
                  </ul>
                  <div className="chips">
                    {service.chips.map((chip) => (
                      <span className="chip" key={chip}>
                        {chip}
                      </span>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* ============ TEKNOLOJİLER ============ */}
        <section id="stack" className="section reveal">
          <SectionHead
            label="TEMEL STACK"
            title="Kullandığım Teknolojiler"
            sub="Backend sistemleri ve AI destekli uygulamalar geliştirmek için kullandığım araç seti."
          />
          <div className="grid2 stack__cols">
            {stackCategories.map((cat) => (
              <div key={cat.title}>
                <h3 className="stack__title">{cat.title}</h3>
                <p className="stack__desc">{cat.desc}</p>
                <div className="tiles">
                  {cat.tiles.map((tile) => {
                    const Icon = tile.icon
                    return (
                      <div
                        className={`tile${cat.tone ? ` tile--${cat.tone}` : ''}`}
                        key={tile.name}
                      >
                        <Icon className="tile__icon" />
                        <span className="tile__name">{tile.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="stack__wide">
            <h3 className="stack__title stack__title--center">{stackWide.title}</h3>
            <p className="stack__desc stack__desc--center">{stackWide.desc}</p>
            <div className="tiles tiles--center">
              {stackWide.tiles.map((tile) => {
                const Icon = tile.icon
                return (
                  <div className="tile tile--green" key={tile.name}>
                    <Icon className="tile__icon" />
                    <span className="tile__name">{tile.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ============ İLETİŞİM ============ */}
        <section id="iletisim" className="section reveal">
          <SectionHead
            label="İLETİŞİM"
            title="Benimle İletişime Geç"
            sub="Bir pozisyon, bir proje ya da sadece selam vermek için — aşağıdan ulaşabilirsin."
          />
          <div className="contact">
            <div className="contact__info">
              <a href={`mailto:${EMAIL}`} className="cinfo">
                <span className="cinfo__icon">
                  <LuMail />
                </span>
                <div>
                  <p className="cinfo__label mono">E-POSTA</p>
                  <p className="cinfo__value">{EMAIL}</p>
                </div>
              </a>
              <a href={GITHUB_URL} className="cinfo" target="_blank" rel="noopener noreferrer">
                <span className="cinfo__icon">
                  <LuGithub />
                </span>
                <div>
                  <p className="cinfo__label mono">GITHUB</p>
                  <p className="cinfo__value">github.com/sertacakalin</p>
                </div>
              </a>
              <a href={LINKEDIN_URL} className="cinfo" target="_blank" rel="noopener noreferrer">
                <span className="cinfo__icon">
                  <LuLinkedin />
                </span>
                <div>
                  <p className="cinfo__label mono">LINKEDIN</p>
                  <p className="cinfo__value">linkedin.com/in/sertacakalin</p>
                </div>
              </a>
              <div className="cinfo cinfo--static">
                <span className="cinfo__icon">
                  <LuClock />
                </span>
                <div>
                  <p className="cinfo__label mono">DÖNÜŞ SÜRESİ</p>
                  <p className="cinfo__value">Genelde 24 saat içinde</p>
                </div>
              </div>
              <div className="contact__cvs">
                <a href={CV_TR} className="btn btn--small" target="_blank" rel="noopener noreferrer">
                  <LuFileText /> CV (Türkçe)
                </a>
                <a href={CV_EN} className="btn btn--small" target="_blank" rel="noopener noreferrer">
                  <LuFileText /> CV (English)
                </a>
              </div>
            </div>

            <form className="cform" action={`https://formsubmit.co/${EMAIL}`} method="POST">
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="Portfolyo iletişim formu" />
              <h3 className="cform__title">Mesaj Gönder</h3>
              <div className="cform__row">
                <input type="text" name="name" placeholder="Adınız" required />
                <input type="email" name="email" placeholder="E-posta adresiniz" required />
              </div>
              <textarea name="message" placeholder="Mesajınız..." rows="6" required />
              <button type="submit" className="btn btn--cyan cform__submit">
                Gönder <LuSend />
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <p className="footer__name">Sertaç Akalın</p>
            <p className="footer__desc">
              Backend odaklı çalışan, AI ve bilgisayarlı görü projeleri geliştiren bilgisayar
              mühendisi.
            </p>
            <div className="footer__socials">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <LuGithub />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LuLinkedin />
              </a>
              <a href={`mailto:${EMAIL}`} aria-label="E-posta">
                <LuMail />
              </a>
            </div>
          </div>
          <div className="footer__col">
            <p className="footer__col-title mono">SİTE</p>
            <a href="#projeler">Projeler</a>
            <a href="#deneyim">Deneyim</a>
            <a href="#yetkinlikler">Yetkinlikler</a>
            <a href="#stack">Teknolojiler</a>
          </div>
          <div className="footer__col">
            <p className="footer__col-title mono">BAĞLANTILAR</p>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={CV_TR} target="_blank" rel="noopener noreferrer">
              CV (Türkçe)
            </a>
            <a href={CV_EN} target="_blank" rel="noopener noreferrer">
              CV (English)
            </a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2026 Sertaç Akalın. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </>
  )
}

export default App
