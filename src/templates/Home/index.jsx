import './styles.css';

import { Component } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component {
  //  constructor(props) {
  //    super(props);
  //    //melhor jeito para nao usar bind é usar arrow function
  //    //this.handleClick = this.handleClick.bind(this); // informar para a funcao para pegar stateful
  //    this.state = {
  //      name: 'Wellington Luiz',
  //      counter: 0
  //    }
  //  }

  //json placeholder
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: ''

  }
  timeoutUpdate = null;

  async componentDidMount() {
    //this.handleTimeout();
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    })
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    //spread Operator - espalhar posts sem criar array
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });

  }

  componentDidUpdate() {
    //this.handleTimeout();
  }

  componentDidUnmount() {
    //clearTimeout(this.timeoutUpdate);
  }

  handleTimeout = () => {
    const { posts, counter } = this.state;
    posts[0].title = 'Mudou';

    this.timeoutUpdate = setTimeout(() => {
      this.setState({ posts, counter: counter + 1 });
    }, 500);
  }


  //lifecycle methods (componentDidMount)

  //class fields (javascript) - comentario no constructor acima
  // nao precisa fazer bind

  handleClick = () => {
    this.setState({ name: 'Legal' });
    //const { name } = this.state;

    //console.log(`p clicado ${name}`);
  }



  handleAClick = (event) => {
    event.preventDefault();
    const { counter } = this.state;
    this.setState({ counter: counter + 1 })
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    //const name = this.state.name; // java descructing
    const { name, counter, posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
        );
      })
      : posts;


    return (
      <section className="container">
        <div class="search-container">
          {!!searchValue && (
            <>
              <h1> Search Value: {searchValue}</h1>
            </>
          )}
          <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        </div>
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}
        {filteredPosts.length === 0 && (
          <p>Não existem posts.</p>
        )}
        <div class="button-container">
          {!searchValue && (
            <Button text="Load more posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
