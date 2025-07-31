import { messages } from '@/sources/messages';
import styles from './about-page.module.css';

export const AboutPage = () => {
  return (
    <div className={styles.aboutPage}>
      <h2>{messages.headers.appName}</h2>
      <p>
        {messages.paragraphs.aboutProject}{' '}
        <a href="https://github.com/ForgRS">{messages.paragraphs.RSSLink}.</a>
      </p>

      <a href="https://rs.school/courses/reactjs">
        {messages.paragraphs.myGitHub}
      </a>
      <p>{messages.paragraphs.year}</p>
    </div>
  );
};
