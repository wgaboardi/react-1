import { render, screen } from '@testing-library/react';
import { PostCard } from '.';
import { postCardPropsMock } from './mock';

const props = postCardPropsMock;

describe('<PostCard />', () => {
  it('should render Postcard correctly', () => {
    //const { debug } = render(<PostCard {...props} />);
    //debug();
    render(<PostCard {...props} />);

    expect(screen.getByAltText(/title 1/)).toHaveAttribute('src', 'img/img.png');
    expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
    expect(screen.getByText('body 1')).toBeInTheDocument();
  });
  it('should match snapshot', () => {
    const { container } = render(<PostCard {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
