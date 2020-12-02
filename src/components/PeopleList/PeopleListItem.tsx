import React from 'react';
import { Avatar, Box, Text } from '@chakra-ui/react';
import { Person } from '../../types';

export type Props = Pick<Person, 'imageUrl' | 'name' | 'teamName'>;

export function PeopleListItem({
  imageUrl,
  name,
  teamName,
}: Props) {
  return (
    <Box
      display="flex"
      alignItems="center"
      paddingY={4}
    >
      <Avatar width="32px" height="32px" name={name} src={imageUrl} />
      <Box marginLeft={2}>
        <Text fontSize="sm">{name}</Text>
        <Text fontSize="xs">{teamName}</Text>
      </Box>
    </Box>
  );
}

export const PeopleListItemMemo = React.memo(PeopleListItem)
