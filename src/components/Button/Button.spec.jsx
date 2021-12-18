import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '.';

describe('<Button />', () => {
  it('should render the button with text "Load more"', () => {
    const fn = jest.fn();

    render(<Button text="Load more" onClick={fn} />);
    //expect.assertions(1); // espera uma asserção
    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('class', 'button');
  });
  it('should call function on button click', () => {
    const fn = jest.fn();
    render(<Button text="Load more" onClick={fn} />);
    const button = screen.getByRole('button', { name: /load more/i });
    fireEvent.click(button);
    fireEvent.click(button);
    userEvent.click(button);
    expect(fn).toHaveBeenCalled();
    //expect(fn).toHaveBeenCalledTimes(2);
  });
  it('should be disabled when disabled is true', () => {
    const fn = jest.fn();
    render(<Button text="Load more" disabled={true} onclick={fn} />);
    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeDisabled();
    //expect(fn).toHaveBeenCalledTimes(2);
  });
  it('should be enabled when disabled is false', () => {
    render(<Button text="Load more" disabled={false} />);
    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeEnabled();
    //expect(fn).toHaveBeenCalledTimes(2);
  });
  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<Button text="Load more" disabled={false} onclick={fn} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
