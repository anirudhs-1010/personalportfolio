import About from './comp/about';
import CertificationCards from './comp/certificate';
import ContactForms from './comp/contact';
import Footer from './comp/footer';
import Projects from './comp/projects';
import Experience from './comp/work';

export default function Home() {
  return <div className="portfolio"><main id="main"><About /><Projects /><Experience /><CertificationCards /><ContactForms /></main><Footer /></div>;
}
