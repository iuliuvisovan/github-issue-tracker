import { Dispatch } from 'redux';
import * as issueEndpoints from '../../api/issues';
import * as issueEndpoints from '../../api/issues';
import { IIssueAction } from '../reducers/issues/types';
import store from '../index';

// #get issues
export enum IssueActionType {
  GET_ISSUES_PENDING,
  GET_ISSUES_SUCCESS,
  GET_ISSUES_ERROR,
  SET_ORGANIZATION_SLUG,
  SET_REPO_SLUG,
  TOGGLE_FILTER,
  SET_SORT_CRITERION,
  GET_COMMENTS_PENDING,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_ERROR,
}

export const getIssues = () => async (dispatch: Dispatch<IIssueAction>) => {
  dispatch({ type: IssueActionType.GET_ISSUES_PENDING });

  const { organizationSlug, repoSlug, filters, sortCriteria } = store.getState().issuesReducer;

  let filterCriterion = filters.find((x) => x.isActive)?.id || 'all';
  if (filters.every((x) => x.isActive)) {
    filterCriterion = 'all';
  }

  try {
    const issues = await get({
      organizationSlug,
      repoSlug,
      filter: filterCriterion,
      sort: sortCriteria.find((x) => x.isActive)?.id || 'created',
    });

    dispatch({ type: IssueActionType.GET_ISSUES_SUCCESS, payload: issues });
  } catch (error) {
    dispatch({ type: IssueActionType.GET_ISSUES_ERROR, payload: error });
  }
};

export const getComments = (commentsUrl: string) => async (dispatch: Dispatch<IIssueAction>) => {
  dispatch({ type: IssueActionType.GET_COMMENTS_PENDING });

  try {
    const issues = await get( );

    dispatch({ type: IssueActionType.GET_ISSUES_SUCCESS, payload: issues });
  } catch (error) {
    dispatch({ type: IssueActionType.GET_ISSUES_ERROR, payload: error });
  }
};

export const setOrganizationSlug = (organizationSlug: string) => async (dispatch: Dispatch<IIssueAction>) => {
  dispatch({ type: IssueActionType.SET_ORGANIZATION_SLUG, payload: organizationSlug });
};

export const setRepoSlug = (repoSlug: string) => async (dispatch: Dispatch<IIssueAction>) => {
  dispatch({ type: IssueActionType.SET_REPO_SLUG, payload: repoSlug });
};

export const toggleFilter = (filterId: string) => async (dispatch: Dispatch<IIssueAction>) => {
  dispatch({ type: IssueActionType.TOGGLE_FILTER, payload: filterId });
};

export const setSortCriterion = (criterionId: string) => async (dispatch: Dispatch<IIssueAction>) => {
  dispatch({ type: IssueActionType.SET_SORT_CRITERION, payload: criterionId });
};
