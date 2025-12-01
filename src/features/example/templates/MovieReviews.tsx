import { css } from '@emotion/react';
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid2 as Grid,
  Rating,
  Typography,
} from '@mui/material';
import { memo } from 'react';
import { useAllMovieReviewsQuery } from '../../../generated/graphql';

const MovieReviews = () => {
  const { data, loading, error } = useAllMovieReviewsQuery({
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return (
      <div css={styles.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div css={styles.errorContainer}>
        <Typography color="error">Error loading reviews: {error.message}</Typography>
      </div>
    );
  }

  const reviews = data?.allMovieReviews?.nodes || [];

  return (
    <div css={styles.container}>
      <Typography variant="h4" css={styles.heading}>
        Movie Reviews
      </Typography>

      {reviews.length === 0 ? (
        <Typography variant="body1" css={styles.emptyState}>
          No reviews available yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {reviews.map((review) => {
            if (!review) return null;

            const movie = review.movieByMovieId;
            const user = review.userByUserReviewerId;

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={review.id}>
                <Card css={styles.card}>
                  {movie?.imgUrl && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={movie.imgUrl}
                      alt={movie.title || 'Movie poster'}
                      css={styles.cardMedia}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" css={styles.movieTitle}>
                      {movie?.title || 'Unknown Movie'}
                    </Typography>

                    {movie?.releaseDate && (
                      <Typography variant="caption" color="text.secondary" css={styles.releaseDate}>
                        {new Date(movie.releaseDate).getFullYear()}
                      </Typography>
                    )}

                    <div css={styles.ratingContainer}>
                      <Rating value={review.rating || 0} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary">
                        {review.rating}/5
                      </Typography>
                    </div>

                    <Typography variant="subtitle1" css={styles.reviewTitle}>
                      {review.title}
                    </Typography>

                    {review.body && (
                      <Typography variant="body2" color="text.secondary" css={styles.reviewBody}>
                        {review.body}
                      </Typography>
                    )}

                    {user?.name && (
                      <Typography variant="caption" css={styles.reviewer}>
                        - {user.name}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

const styles = {
  container: css({
    padding: '32px',
    maxWidth: '1200px',
    margin: '0 auto',
  }),
  heading: css({
    marginBottom: '24px',
    textAlign: 'center',
  }),
  loadingContainer: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
  }),
  errorContainer: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
    padding: '32px',
  }),
  emptyState: css({
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.6)',
    marginTop: '48px',
  }),
  card: css({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    },
  }),
  cardMedia: css({
    objectFit: 'cover',
  }),
  movieTitle: css({
    fontWeight: 600,
    marginBottom: '4px',
  }),
  releaseDate: css({
    display: 'block',
    marginBottom: '8px',
  }),
  ratingContainer: css({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  }),
  reviewTitle: css({
    fontWeight: 500,
    marginBottom: '8px',
  }),
  reviewBody: css({
    marginBottom: '12px',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }),
  reviewer: css({
    display: 'block',
    fontStyle: 'italic',
    marginTop: '8px',
  }),
};

export default memo(MovieReviews);
