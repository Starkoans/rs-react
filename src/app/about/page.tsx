import { messages } from '../lib/messages';
import styles from './about-page.module.css';

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <h2>{messages.headers.appName}</h2>
      <p>
        {messages.paragraphs.aboutProject}{' '}
        <a href="https://rs.school/courses/reactjs">
          {messages.paragraphs.RSSLink}.
        </a>
      </p>

      <a href="https://github.com/Starkoans">{messages.paragraphs.myGitHub}</a>
      <p>{messages.paragraphs.year}</p>
    </div>
  );
}
