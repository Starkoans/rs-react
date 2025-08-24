import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './modal';

vi.mock('./modal.module.css', () => ({
  default: {
    overlay: 'overlay',
    dialog: 'dialog',
    dialogContent: 'dialogContent',
    scrollarea: 'scrollarea',
    closeBtn: 'closeBtn',
  },
}));

vi.mock('react-icons/hi2', () => ({
  HiMiniXMark: (props: any) => <svg data-testid="x-icon" {...props} />,
}));

describe('Modal', () => {
  it('does not render when open=false', () => {
    render(<Modal open={false} onClose={vi.fn()}>Hello</Modal>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.querySelector('.overlay')).toBeNull();
  });

  it('renders when open=true and shows children', () => {
    render(<Modal open onClose={vi.fn()}>Hello</Modal>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('clicking overlay calls onClose', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal open onClose={onClose}>Hi</Modal>);

    const overlay = document.querySelector('.overlay') as HTMLElement;
    expect(overlay).toBeInTheDocument();

    await user.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('clicking inside dialog does NOT call onClose (stopPropagation works)', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal open onClose={onClose}><div>Inside</div></Modal>);

    const dialog = screen.getByRole('dialog');
    await user.click(dialog);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('clicking the close button calls onClose', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Modal open onClose={onClose}>X</Modal>);

    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('closeBtn');

    await user.click(btn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
