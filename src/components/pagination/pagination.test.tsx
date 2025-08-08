import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { PaginationControls } from '@/components/pagination/pagination';
import { PAGINATION_DEFAULT_PAGE } from '@/sources/constants';
import { messages } from '@/sources/messages';

describe('PaginationControls', () => {
  it('Not rendered when totalPages < 2', () => {
    const { container } = render(
      <PaginationControls
        pagination={{
          limit: 10,
          page: PAGINATION_DEFAULT_PAGE,
          totalItems: 5,
          totalPages: 1,
        }}
        goToPage={() => {}}
      />
    );
    expect(container.innerHTML).toBe('');
  });

  it('displays buttons and disables the “Back” button on the first page', async () => {
    const goToPage = vi.fn();
    const pagination = {
      limit: 10,
      page: PAGINATION_DEFAULT_PAGE,
      totalItems: 25,
      totalPages: 5,
    };

    render(<PaginationControls pagination={pagination} goToPage={goToPage} />);

    const prevBtn = screen.getByRole('button', {
      name: messages.buttons.prev,
    });
    const nextBtn = screen.getByRole('button', {
      name: messages.buttons.next,
    });

    await userEvent.click(prevBtn);

    expect(prevBtn).toBeDisabled();
    expect(nextBtn).not.toBeDisabled();

    expect(
      screen.getByText(
        `${messages.paragraphs.currentPage} ${pagination.page} ${messages.paragraphs.of} ${pagination.totalPages}`
      )
    ).toBeInTheDocument();

    expect(goToPage).not.toHaveBeenCalled();
  });

  it('disables the “Forward” button on the last page', async () => {
    const goToPage = vi.fn();

    const pagination = {
      limit: 10,
      page: 5,
      totalItems: 25,
      totalPages: 5,
    };

    render(<PaginationControls pagination={pagination} goToPage={goToPage} />);

    const prevBtn = screen.getByRole('button', {
      name: messages.buttons.prev,
    });
    const nextBtn = screen.getByRole('button', {
      name: messages.buttons.next,
    });

    await userEvent.click(nextBtn);

    expect(prevBtn).not.toBeDisabled();
    expect(nextBtn).toBeDisabled();
    expect(goToPage).not.toHaveBeenCalled();
  });

  it('Both buttons are active on the intermediate page', async () => {
    const goToPage = vi.fn();

    const pagination = {
      limit: 10,
      page: 3,
      totalItems: 30,
      totalPages: 5,
    };

    render(<PaginationControls pagination={pagination} goToPage={goToPage} />);

    const prevBtn = screen.getByRole('button', {
      name: messages.buttons.prev,
    });
    const nextBtn = screen.getByRole('button', {
      name: messages.buttons.next,
    });

    expect(prevBtn).not.toBeDisabled();
    expect(nextBtn).not.toBeDisabled();

    await userEvent.click(prevBtn);
    await userEvent.click(nextBtn);

    expect(goToPage).toHaveBeenCalledTimes(2);
  });
});
