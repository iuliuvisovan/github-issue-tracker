import { lang } from "moment";
import { LayoutAnimation } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../redux";
import * as issueActions from "../redux/actions/issues";

export default function useIssues() {
  const { issues, loading, filters, sortCriteria, currentPage, error } = useSelector((state: IApplicationState) => state.issuesReducer);

  const dispatch = useDispatch();

  const getIssues = () => {
    dispatch(issueActions.getIssues());
  };

  const toggleFilter = (filterId: string) => {
    LayoutAnimation.easeInEaseOut();
    dispatch(issueActions.toggleFilter(filterId));
  };

  const setSortCriterion = (criterionId: string) => {
    LayoutAnimation.easeInEaseOut();
    dispatch(issueActions.setSortCriterion(criterionId));
  };

  const setOrganizationId = (id: string) => dispatch(issueActions.setOrganizationId(id));
  const setRepoId = (id: string) => dispatch(issueActions.setRepoId(id));

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
      setOrganizationId,
      setRepoId,
    },
  };
}
