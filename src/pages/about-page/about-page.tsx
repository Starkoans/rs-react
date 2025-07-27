import { messages } from '@/sources/messages';
import styles from './about-page.module.css';

export const AboutPage = () => {
  return (
    <div className={styles.aboutPage}>
      <h3>{messages.headers.appName}</h3>
      <p>
        {messages.paragraphs.aboutProject}{' '}
        <a href="https://github.com/ForgRS">{messages.paragraphs.RSSLink}.</a>
      </p>

      <a href="https://rs.school/courses/reactjs">
        {messages.paragraphs.myGitHub}
      </a>
    </div>
  );
};
