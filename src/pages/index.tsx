import type { NextPage } from 'next';
import { Example, MovieReviews } from '../features/example/';

const Home: NextPage = () => {
  return (
    <>
      <Example />
      <MovieReviews />
    </>
  );
};

export default Home;
