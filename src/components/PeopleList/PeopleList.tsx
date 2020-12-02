import React from 'react';
import { Box, Input } from '@chakra-ui/react';
import { useState, useCallback } from 'react';

import { Person } from '../../types';

import { PeopleListItem, PeopleListItemMemo } from './PeopleListItem';

export interface Props {
  people: Person[];
}

const DEBOUNCE_TIME = 500 // milliseconds

const debounce = (cb, waitTime=DEBOUNCE_TIME) => {
  return (...args) => {
    return setTimeout(() => (cb(...args)), waitTime);
    //let currentTime = (new Date()).getTime()
    //const delta = (DEBOUNCE_INIT - currentTime)
    //console.log({event: args, creationTime, currentTime, waitTime, delta})
    //if (delta >= waitTime) {
      //cb(...args)
    //} else {
      //setTimeout(() => (cb(...args)), waitTime);
    //}
  }
}

export function PeopleList({
  people,
}: Props) {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');

  //const [debounceTime, setDebounce] = useState((new Date).getTime())

  //useEffect(() {
  //  if (debounce)
  //}, [setSearchValue])

  const filteredPeople = searchValue
    ? people
      .filter((person) => {
        let validPerson = false;
        if (person.name.toLowerCase().includes(debouncedSearchValue.toLowerCase())) {
          validPerson = true;
        } else if (person.teamName.toLowerCase().includes(debouncedSearchValue.toLowerCase())) {
          validPerson = true;
        }
        return validPerson;
      })
    : people;

  const sortedPeople = filteredPeople.sort((personA, personB) => {
    if (personA.name === personB.name) {
      return 0;
    }

    return personA.name > personB.name ? 1 : -1;
  });


  const [timeoutId, setTimeoutId] = useState(null)
  function createHandleChange(event) {
    const value = event.currentTarget.value
    setSearchValue(event.currentTarget.value);
    console.log('creating')
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    const tid = debounce(() => {
      console.log('updating', value)
      setDebouncedSearchValue(value);
    }, DEBOUNCE_TIME)()
    setTimeoutId(tid)
  }

  //const handleChangeCb = useCallback(createHandleChange, [setSearchValue, setDebouncedSearchValue])
  const handleChangeCb = useCallback(createHandleChange, [])

  //const debounceHandleChange = debounce(handleChange, DEBOUNCE_TIME)
  //function debounceHandleChange(cb, event) {
  //  setSearchTerm(event.currentTarget.value)
  //  setDebouncedSearchValue(searchTerm)
  //  debounce(cb, DEBOUNCE_TIME)(event)
  //}

  return (
    <Box>
      <Input
        aria-label="Search"
        marginY={4}
        onChange={handleChangeCb}
        placeholder="Search people"
        variant="outline"
        value={searchValue}
      />

      {sortedPeople.map((person, i) => (
        <PeopleListItemMemo
          key={person.id}
          {...person}
        />
      ))}
    </Box>
  );
}
