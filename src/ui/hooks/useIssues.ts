import { LayoutAnimation } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as issueActions from '../../data/redux/actions/issues';
import { ApplicationState } from '../../data/redux';
import { useIssuesReturnValue } from '../../data/types/issues';

export default function useIssues(): useIssuesReturnValue {
  const { issues, loading, filters, sortCriteria, currentPage, error } = useSelector((state: ApplicationState) => state.issuesReducer);

  const dispatch = useDispatch();

  const getIssues = () => {
    dispatch(issueActions.getIssues());
  };

  const toggleFilter = (filterId: string) => {
    LayoutAnimation.easeInEaseOut();
    dispatch(issueActions.toggleFilter(filterId));
    getIssues();
  };

  const setSortCriterion = (criterionId: string) => {
    LayoutAnimation.easeInEaseOut();
    dispatch(issueActions.setSortCriterion(criterionId));
    getIssues();
  };

  const setPage = (pageNumber: number) => {
    LayoutAnimation.easeInEaseOut();
    dispatch(issueActions.setPage(pageNumber));
    getIssues();
  };

  return {
    data: {
      issues,
      loading,
      filters,
      sortCriteria,
      currentPage,
      error,
    },
    actions: {
      getIssues,
      toggleFilter,
      setSortCriterion,
      setPage,
    },
  };
}
