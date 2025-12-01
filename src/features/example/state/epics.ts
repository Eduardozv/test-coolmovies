import { gql } from '@apollo/client';
import { Epic, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { actions, SliceAction } from './slice';
import { RootState } from '../../../state/store';
import { EpicDependencies } from '../../../state/types';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  CurrentUserQueryResult,
  CurrentUserQueryVariables,
} from '../../../generated/graphql';

export const exampleEpic: Epic<
  SliceAction['increment'],
  any,
  RootState,
  EpicDependencies
> = (action$, state$) =>
  action$.pipe(
    filter(actions.increment.match),
    filter(() => Boolean(state$.value.example.value % 2)),
    map(() => actions.epicSideEffect())
  );

export const exampleAsyncEpic: Epic<
  SliceAction['increment'],
  any,
  RootState,
  EpicDependencies
> = (action$, state$, { client }) =>
  action$.pipe(
    filter(actions.fetch.match),
    switchMap(async () => {
      try {
        const result = await client.query<
          CurrentUserQueryResult,
          CurrentUserQueryVariables
        >({
          query: CurrentUserDocument,
          fetchPolicy: 'network-only',
        });
        return actions.loaded({ data: result.data });
      } catch (err) {
        return actions.loadError();
      }
    })
  );
