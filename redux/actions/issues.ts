import { Dispatch } from 'redux';
import { get } from '../../api/issues';
import { IIssueAction } from '../reducers/issues/types';

// #get issues
export enum IssueActionType {
  GET_ISSUES_PENDING,
  GET_ISSUES_SUCCESS,
  GET_ISSUES_ERROR,
}

export const getIssues = (organizationSlug: string, repoSlug: string) => async (dispatch: Dispatch<IIssueAction>) => {
  dispatch({ type: IssueActionType.GET_ISSUES_ERROR });

  try {
    const issues = await get(organizationSlug, repoSlug);

    dispatch({ type: IssueActionType.GET_ISSUES_SUCCESS, payload: issues });
  } catch (error) {
    dispatch({ type: IssueActionType.GET_ISSUES_ERROR, payload: error });
  }
};
