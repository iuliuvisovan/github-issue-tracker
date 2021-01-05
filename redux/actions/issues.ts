import { Dispatch } from 'redux';
import * as issuesApi from '../../api/issues';
import { IssueActionType, IIssueAction } from '../../types/issues';
import store from '..';

export const getIssues = () => async (dispatch: Dispatch<IIssueAction>) => {
  dispatch({ type: IssueActionType.GET_ISSUES_PENDING });

  const { organizationSlug, repoSlug, filters, sortCriteria, page } = store.getState().issuesReducer;

  let filterCriterion = filters.find((x) => x.isActive)?.id || 'all';
  if (filters.every((x) => x.isActive)) {
    filterCriterion = 'all';
  }

  try {
    const issues = await issuesApi.get({
      organizationSlug,
      repoSlug,
      filter: filterCriterion,
      sort: sortCriteria.find((x) => x.isActive)?.id || 'created',
      page: page,
    });

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

export const setPage = (pageNumber: number) => async (dispatch: Dispatch<IIssueAction>) => {
  dispatch({ type: IssueActionType.SET_PAGE, payload: pageNumber });
};

export const toggleFilter = (filterId: string) => async (dispatch: Dispatch<IIssueAction>) => {
  dispatch({ type: IssueActionType.TOGGLE_FILTER, payload: filterId });
};

export const setSortCriterion = (criterionId: string) => async (dispatch: Dispatch<IIssueAction>) => {
  dispatch({ type: IssueActionType.SET_SORT_CRITERION, payload: criterionId });
};
