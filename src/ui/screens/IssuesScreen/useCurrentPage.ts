import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../data/redux';
import { ActionSheetIOS, FlatList, LayoutAnimation } from 'react-native';
import { useRef, useState } from 'react';
import { Issue, IssueSortCriteria, CurrentPageHookReturnValue as useCurrentPageReturnValue } from '../../../data/types/issues';
import * as issueActions from '../../../data/redux/actions/issues';

export default function usePage(): useCurrentPageReturnValue {
  const issuesReducer = useSelector((state: ApplicationState) => state.issuesReducer);
  const { error, organizationId, repoId } = issuesReducer;

  const dispatch = useDispatch();

  const commitOrganizationId = (id: string) => {
    dispatch(issueActions.commitOrganizationId(id));
  };
  const commitRepoId = (id: string) => {
    dispatch(issueActions.commitRepoId(id));
  };

  const flatListRef = useRef<FlatList<Issue>>(null);

  const pickSortCriterion = (sortCriteria: IssueSortCriteria[]): Promise<string> => {
    return new Promise((resolve, reject) => {
      const onPick = (buttonIndex: number) => {
        if (buttonIndex > 0) {
          resolve(sortCriteria[buttonIndex - 1].id);
        } else {
          reject();
        }
      };

      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', ...sortCriteria.map((x) => x.label)],
          cancelButtonIndex: 0,
        },
        onPick
      );
    });
  };

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  return {
    data: {
      organizationId,
      repoId,
      isPickerOpen,
      isScrolled,
      flatListRef,
      error,
    },
    actions: {
      commitOrganizationId,
      commitRepoId,
      pickSortCriterion,
      setIsPickerOpen: (value: boolean) => {
        LayoutAnimation.easeInEaseOut();
        setIsPickerOpen(value);
      },
      setIsScrolled,
    },
  };
}
