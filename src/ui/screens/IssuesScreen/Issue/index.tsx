import React from 'react';
import isDarkColor from 'is-dark-color';
import { View, TouchableOpacity } from 'react-native';
import { Color, Text } from '../../../components';
import { IssueItemProps } from '../../../../data/types/issues';
import styles from './styles';
import Header from './Header';

export default function Issue(props: IssueItemProps) {
  const { issue } = props;

  const goToDetails = () => {
    props.navigation.push('IssueDetails', { issue });
  };

  return (
    <TouchableOpacity testID="cardButton" activeOpacity={0.8} onPress={goToDetails} style={styles.card}>
      <Header issue={issue} />
      <Text style={styles.title}>{issue.title}</Text>
      <View style={styles.labels}>
        {issue.labels.map((label) => (
          <View key={label.id} style={[styles.label, { backgroundColor: '#' + label.color }]}>
            <Text style={[styles.labelText, { color: isDarkColor('#' + label.color) ? Color.white : Color.steel }]}>
              {label.name.replace(/\:([a-z]+)\:/g, '')}
            </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}
