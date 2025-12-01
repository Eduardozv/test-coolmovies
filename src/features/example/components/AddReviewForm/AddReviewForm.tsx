import { css } from '@emotion/react';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { memo, useState } from 'react';
import {
  useAllMoviesQuery,
  useCreateMovieReviewMutation,
  useCurrentUserQuery,
} from '../../../../generated/graphql';

interface AddReviewFormProps {
  onReviewAdded?: () => void;
}

const AddReviewForm = ({ onReviewAdded }: AddReviewFormProps) => {
  const [movieId, setMovieId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [rating, setRating] = useState<number | null>(0);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { data: userData, loading: userLoading } = useCurrentUserQuery();
  const { data: moviesData, loading: moviesLoading } = useAllMoviesQuery();
  const [createReview, { loading: submitting }] = useCreateMovieReviewMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!userData?.currentUser?.id) {
      setSubmitError('User not logged in');
      return;
    }

    if (!movieId) {
      setSubmitError('Please select a movie');
      return;
    }

    if (!title.trim()) {
      setSubmitError('Please enter a review title');
      return;
    }

    try {
      await createReview({
        variables: {
          input: {
            movieReview: {
              movieId,
              title: title.trim(),
              body: body.trim() || undefined,
              rating: rating || undefined,
              userReviewerId: userData.currentUser.id,
            },
          },
        },
      });

      setSubmitSuccess(true);
      setMovieId('');
      setTitle('');
      setBody('');
      setRating(0);

      if (onReviewAdded) {
        onReviewAdded();
      }

      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to create review');
    }
  };

  const loading = userLoading || moviesLoading;
  const movies = moviesData?.allMovies?.nodes || [];
  const currentUser = userData?.currentUser;

  if (loading) {
    return (
      <Card css={styles.card}>
        <CardContent css={styles.loadingContainer}>
          <CircularProgress size={24} />
        </CardContent>
      </Card>
    );
  }

  if (!currentUser) {
    return (
      <Card css={styles.card}>
        <CardContent>
          <Alert severity="warning">Please log in to add a review</Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card css={styles.card}>
      <CardContent>
        <Typography variant="h5" css={styles.heading}>
          Add a New Review
        </Typography>

        {submitSuccess && (
          <Alert severity="success" css={styles.alert}>
            Review added successfully!
          </Alert>
        )}

        {submitError && (
          <Alert severity="error" css={styles.alert}>
            {submitError}
          </Alert>
        )}

        <form onSubmit={handleSubmit} css={styles.form}>
          <FormControl fullWidth required>
            <InputLabel id="movie-select-label">Movie</InputLabel>
            <Select
              labelId="movie-select-label"
              id="movie-select"
              value={movieId}
              onChange={(e) => setMovieId(e.target.value)}
              label="Movie"
              disabled={submitting}
              MenuProps={{
                keepMounted: true,
                PaperProps: {
                  id: 'movie-select-menu',
                },
              }}
              SelectDisplayProps={{
                'aria-controls': 'movie-select-menu',
              }}
            >
              {movies.map((movie) => {
                if (!movie) return null;
                return (
                  <MenuItem key={movie.id} value={movie.id}>
                    {movie.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            required
            id="review-title"
            label="Review Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={submitting}
            placeholder="Enter a catchy title for your review"
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            id="review-body"
            label="Review Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={submitting}
            placeholder="Share your thoughts about this movie..."
          />

          <div css={styles.ratingContainer}>
            <Typography id="rating-label" component="legend">Rating</Typography>
            <Rating
              name="movie-rating"
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              disabled={submitting}
              size="large"
              getLabelText={(value) => `${value} Star${value !== 1 ? 's' : ''}`}
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={submitting}
            css={styles.submitButton}
          >
            {submitting ? <CircularProgress size={24} /> : 'Submit Review'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const styles = {
  card: css({
    marginBottom: '32px',
  }),
  loadingContainer: css({
    display: 'flex',
    justifyContent: 'center',
    padding: '24px',
  }),
  heading: css({
    marginBottom: '16px',
    textAlign: 'center',
  }),
  alert: css({
    marginBottom: '16px',
  }),
  form: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  }),
  ratingContainer: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  }),
  submitButton: css({
    marginTop: '8px',
    minHeight: '42px',
  }),
};

export default memo(AddReviewForm);
