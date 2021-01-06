import { Dispatch } from 'redux';
import * as issuesApi from '../../api/issues';
import { IssueActionType, IIssueAction } from '../../types/issues';
import store from '..';

export const getList = () => async (dispatch: Dispatch<IIssueAction>) => {
  dispatch({ type: IssueActionType.GET_ISSUES_PENDING });

  const { organizationId, repoId, filters, sortCriteria, currentPage: page } = store.getState().issuesReducer;

  let filterCriterion = filters.find((x) => x.isActive)?.id || 'all';
  if (filters.every((x) => x.isActive)) {
    filterCriterion = 'all';
  }

  try {
    const issues = await issuesApi.get({
      organizationId,
      repoId,
      filter: filterCriterion,
      sort: sortCriteria.find((x) => x.isActive)?.id || 'created',
      page: page,
    });

    dispatch({ type: IssueActionType.GET_ISSUES_SUCCESS, payload: issues });
  } catch (error) {
    dispatch({ type: IssueActionType.GET_ISSUES_ERROR, payload: error });
  }
};

export const setOrganizationId = (organizationId: string) => async (dispatch: Dispatch<IIssueAction>) => {
  dispatch({ type: IssueActionType.SET_ORGANIZATION_SLUG, payload: organizationId });
};

export const setRepoId = (repoId: string) => async (dispatch: Dispatch<IIssueAction>) => {
  dispatch({ type: IssueActionType.SET_REPO_SLUG, payload: repoId });
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
