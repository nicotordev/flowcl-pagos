import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import Link from '@docusaurus/Link';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Bienvenido a ${siteConfig.title}`}
      description="SDK open-source para integrar fácilmente pagos con Flow.cl en aplicaciones Node.js y JavaScript."
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div
          className="container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <img
            src="https://gateway.flow.cl/app/img/logo-flow-black.svg"
            alt="SDK para integración de pagos"
            className={styles.heroImage}
          />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">
            Un SDK open-source que facilita la integración de pagos con Flow.cl
            en aplicaciones Node.js y JavaScript.
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro"
            >
              Ver Documentación
            </Link>
          </div>
        </div>
      </header>

      <main className={`container margin-vert--xl ${styles.main}`}>
        <section className="row">
          <div className="col col--6">
            <h2>¿Qué ofrece este SDK?</h2>
            <p>
              Este proyecto open-source facilita la implementación rápida y
              segura de pagos usando Flow.cl, simplificando el proceso con una
              interfaz clara y bien documentada.
            </p>
          </div>
          <div className={
            `col col--6 text--center ${styles.featureMainImageContainer}`
          }>
            <img
              src="https://www.flow.cl/images/soluciones/boton_pagar_flow.png"
              alt="Ejemplo de uso del SDK"
            />
          </div>
        </section>

        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className="col col--4">
                <div className={`text--center ${styles.featureImage}`}>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4kz8qujy3cUsSCic3B9-0FBQnCBzWrf0xjg&s"
                    alt="Integración sencilla"
                  />
                </div>
                <h3>Integración Sencilla</h3>
                <p>
                  Rápido setup con documentación clara y ejemplos prácticos para
                  empezar fácilmente.
                </p>
              </div>
              <div className="col col--4">
                <div className={`text--center ${styles.featureImage}`}>
                  <img src="img/open-source.png" alt="Código abierto" />
                </div>
                <h3>Código Abierto</h3>
                <p>
                  Accede al código fuente, colabora y contribuye al desarrollo
                  de nuevas funcionalidades.
                </p>
              </div>
              <div className="col col--4">
                <div className={`text--center ${styles.featureImage}`}>
                  <img
                    src="https://www.flow.cl/img/6.png"
                    alt="Documentación completa"
                  />
                </div>
                <h3>Documentación Completa</h3>
                <p>
                  Encuentra guías detalladas, referencias claras y ejemplos para
                  utilizar el SDK sin complicaciones.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
