import { Link } from 'react-router-dom';

export const Home = () => {

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome to Our Store</h1>
        <p style={styles.heroSubtitle}>Your one-stop shop for quality products, available 24/7</p>
        <Link to="/products" style={styles.ctaButton}>
          Browse Products
        </Link>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Why Shop With Us?</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>🕐</div>
            <h3 style={styles.featureTitle}>Open 24/7</h3>
            <p style={styles.featureText}>Always here when you need us</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>🚀</div>
            <h3 style={styles.featureTitle}>Fast Delivery</h3>
            <p style={styles.featureText}>Quick delivery to your doorstep</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>💯</div>
            <h3 style={styles.featureTitle}>Quality Products</h3>
            <p style={styles.featureText}>Only the best for our customers</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={styles.aboutSection}>
        <h2 style={styles.sectionTitle}>About Our Store</h2>
        <p style={styles.aboutText}>
          We're committed to providing the best shopping experience with high-quality products,
          excellent customer service, and fast delivery. Our store is always open, so you can
          shop whenever it's convenient for you.
        </p>
        <div style={styles.statsGrid}>
          <div style={styles.stat}>
            <div style={styles.statNumber}>1000+</div>
            <div style={styles.statLabel}>Products</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNumber}>50k+</div>
            <div style={styles.statLabel}>Happy Customers</div>
          </div>
          <div style={styles.stat}>
            <div style={styles.statNumber}>24/7</div>
            <div style={styles.statLabel}>Support</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to Start Shopping?</h2>
        <p style={styles.ctaText}>Discover our wide selection of products</p>
        <div style={styles.ctaButtons}>
          <Link to="/products" style={styles.ctaButtonLarge}>
            Get Started
          </Link>
          <a href="/studio" style={styles.adminButton}>
            Sanity Studio
          </a>
        </div>
      </section>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#121212',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontSize: '1.5rem',
    color: '#fff',
  },
  hero: {
    minHeight: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    textAlign: 'center',
    padding: '4rem 2rem',
  },
  heroTitle: {
    fontSize: '3.5rem',
    margin: '0 0 1rem 0',
    color: '#fff',
    fontWeight: 'bold',
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    margin: '0 0 2rem 0',
    color: '#e0e0e0',
    maxWidth: '600px',
  },
  ctaButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '1rem 2.5rem',
    fontSize: '1.1rem',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    transition: 'transform 0.2s, background-color 0.2s',
    display: 'inline-block',
  },
  featuresSection: {
    maxWidth: '1200px',
    margin: '4rem auto',
    padding: '2rem',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    margin: '0 0 3rem 0',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  feature: {
    textAlign: 'center',
    padding: '2.5rem 2rem',
    backgroundColor: '#1e1e1e',
    borderRadius: '12px',
    transition: 'transform 0.2s',
  },
  featureIcon: {
    fontSize: '4rem',
    marginBottom: '1.5rem',
  },
  featureTitle: {
    fontSize: '1.5rem',
    margin: '0 0 1rem 0',
    color: '#fff',
  },
  featureText: {
    color: '#aaa',
    fontSize: '1rem',
    lineHeight: '1.6',
    margin: 0,
  },
  aboutSection: {
    maxWidth: '1200px',
    margin: '4rem auto',
    padding: '4rem 2rem',
    backgroundColor: '#1e1e1e',
    borderRadius: '12px',
  },
  aboutText: {
    fontSize: '1.2rem',
    color: '#ccc',
    lineHeight: '1.8',
    textAlign: 'center',
    marginBottom: '3rem',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
  },
  stat: {
    textAlign: 'center',
    padding: '2rem',
  },
  statNumber: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: '0.5rem',
  },
  statLabel: {
    fontSize: '1.1rem',
    color: '#aaa',
  },
  ctaSection: {
    textAlign: 'center',
    padding: '5rem 2rem',
    background: 'linear-gradient(135deg, #2a5298 0%, #1e3c72 100%)',
  },
  ctaTitle: {
    fontSize: '2.5rem',
    margin: '0 0 1rem 0',
    color: '#fff',
    fontWeight: 'bold',
  },
  ctaText: {
    fontSize: '1.3rem',
    color: '#e0e0e0',
    margin: '0 0 2rem 0',
  },
  ctaButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  ctaButtonLarge: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '1.2rem 3rem',
    fontSize: '1.2rem',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    transition: 'transform 0.2s, background-color 0.2s',
    display: 'inline-block',
  },
  adminButton: {
    backgroundColor: '#2a5298',
    color: '#fff',
    padding: '1.2rem 3rem',
    fontSize: '1.2rem',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    transition: 'transform 0.2s, background-color 0.2s',
    display: 'inline-block',
    border: '2px solid #4a72b8',
  },
};
