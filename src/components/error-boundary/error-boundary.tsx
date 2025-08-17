import { Component } from 'react';
import styles from './error-boundary.module.css';
import { messages } from '../../app/lib/messages';
interface Props {
  children: React.ReactNode;
}

interface State {
  errorMessage: string;
  info: string | undefined;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { errorMessage: '', info: '' };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      errorMessage: error.toString(),
      info: errorInfo.componentStack?.toString(),
    });
  }

  render() {
    if (this.state.errorMessage)
      return (
        <div className={styles.errorOverlay}>
          <div className={styles.errorBox}>
            <h4>{messages.errors.oops}</h4>
            <p>{this.state.errorMessage}</p>
            <p>{this.state.info}</p>
            <button onClick={() => window.location.reload()}>
              {messages.buttons.reload}
            </button>
          </div>
        </div>
      );
    return this.props.children;
  }
}
