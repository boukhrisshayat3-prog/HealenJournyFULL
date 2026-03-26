import { useEffect, useMemo, useState } from "react"
import "./homePage.css"

interface HealingSpace {
  _id: string
  image: string
  title: string
  paragraph: string
  buttonText: string
  buttonLink: string
}

const API_URL = "https://ap-ihealen-journy.vercel.app/api/healing-spaces"

const toImageUrl = (value: string) => {
  if (!value) return ""
  if (value.startsWith("http")) return value
  const cleaned = value.replace(/^\.\/?/, "/")
  return `https://ap-ihealen-journy.vercel.app${cleaned}`
}

const HomePage = () => {
  const [spaces, setSpaces] = useState<HealingSpace[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()

    const loadSpaces = async () => {
      try {
        setLoading(true)
        const response = await fetch(API_URL, { signal: controller.signal })

        if (!response.ok) {
          throw new Error("No se pudo cargar la información")
        }

        const data = (await response.json()) as HealingSpace[]
        setSpaces(Array.isArray(data) ? data : [])
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return
        setError("No pudimos cargar los espacios de sanación en este momento.")
      } finally {
        setLoading(false)
      }
    }

    void loadSpaces()

    return () => controller.abort()
  }, [])

  const sliderContent = useMemo(() => {
    if (loading) {
      return <p className="status">Cargando espacios de sanación...</p>
    }

    if (error) {
      return <p className="status status--error">{error}</p>
    }

    if (!spaces.length) {
      return <p className="status">No hay datos disponibles por ahora.</p>
    }

    return spaces.map((item) => (
      <article className="slide-card" key={item._id}>
        <img src={toImageUrl(item.image)} alt={item.title} loading="lazy" />
        <div className="slide-card__body">
          <h3>{item.title}</h3>
          <p>{item.paragraph}</p>
          <a href={item.buttonLink || "#"}>{item.buttonText || "Ver más"}</a>
        </div>
      </article>
    ))
  }, [error, loading, spaces])

  return (
    <div className="home-page">
      <header className="header">
        <div className="header__shop">
          <div className="header__container container">
            <p>You are not alone. Support is available 24/7.</p>
            <select aria-label="Idioma">
              <option>Español</option>
              <option>English</option>
            </select>
          </div>
        </div>

        <div className="header__nav container">
          <h1>Healen Journey</h1>
          <nav>
            <a href="#">Home</a>
            <a href="#">Professionals</a>
            <a href="#">Community</a>
            <a href="#">About Us</a>
            <a href="#">Support</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="section slider container">
          <h2>Healing Spaces</h2>
          <div className="slider__container">{sliderContent}</div>
        </section>

        <section className="section about container">
          <h2>Why We Are Here</h2>
          <h3>Healing begins with connection</h3>
          <p>
            We believe in the power of shared stories and professional guidance to transform lives.
          </p>
        </section>

        <section className="section hero container">
          <div>
            <h2>Find a Mentor</h2>
            <p>
              Connecting with someone who has walked this path before can make all the difference.
              Our mentorship program pairs you with experienced individuals who offer guidance and
              understanding.
            </p>
            <button type="button">Find Your Mentor</button>
          </div>
        </section>

        <section className="section account container">
          <h3>Ready to start your journey?</h3>
          <p>
            Create an account today to access resources, join support groups, and begin your healing
            process in a safe, anonymous environment.
          </p>
          <div className="account__actions">
            <button type="button">Register Now</button>
            <button type="button">Contact Support</button>
          </div>
        </section>
      </main>

      <footer className="footer container">
        <p>© 2026 Healen Journey. All rights reserved.</p>
        <p>If you or someone you know is in immediate danger, call emergency services immediately.</p>
      </footer>
    </div>
  )
}

export default HomePage