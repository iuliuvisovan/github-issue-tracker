import { Dispatch } from 'redux';
import * as issuesApi from '../../../api/issues';
import { IssueActionType, IssueAction } from '../../../types/issues';
import { ApplicationState } from '../..';

export const getIssues = () => async (dispatch: Dispatch<IssueAction>, getState: () => ApplicationState) => {
  dispatch({ type: IssueActionType.GET_ISSUES_PENDING });

  const { organizationId, repoId, filters, sortCriteria, currentPage } = getState().issuesReducer;

  let filterCriterion = filters.find((x) => x.isActive)?.id;

  if (filters.every((x) => x.isActive) || !filterCriterion) {
    filterCriterion = 'all';
  }

  try {
    const issues = await issuesApi.get({
      organizationId,
      repoId,
      filter: filterCriterion,
      sort: sortCriteria.find((x) => x.isActive)?.id || 'created',
      page: currentPage,
    });

    dispatch({ type: IssueActionType.GET_ISSUES_SUCCESS, payload: issues });
  } catch (error) {
    dispatch({ type: IssueActionType.GET_ISSUES_ERROR, payload: error });
  }
};

export const commitOrganizationId = (organizationId: string) => (dispatch: Dispatch<IssueAction>) => {
  dispatch({ type: IssueActionType.COMMIT_ORGANIZATION_ID, payload: organizationId });
};

export const commitRepoId = (repoId: string) => (dispatch: Dispatch<IssueAction>) => {
  dispatch({ type: IssueActionType.COMMIT_REPO_ID, payload: repoId });
};

export const setPage = (pageNumber: number) => (dispatch: Dispatch<IssueAction>) => {
  dispatch({ type: IssueActionType.SET_PAGE, payload: pageNumber });
};

export const toggleFilter = (filterId: string) => (dispatch: Dispatch<IssueAction>) => {
  dispatch({ type: IssueActionType.TOGGLE_FILTER, payload: filterId });
};

export const setSortCriterion = (criterionId: string) => (dispatch: Dispatch<IssueAction>) => {
  dispatch({ type: IssueActionType.SET_SORT_CRITERION, payload: criterionId });
};
