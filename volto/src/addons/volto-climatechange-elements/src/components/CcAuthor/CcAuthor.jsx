import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@plone/volto/actions';

export const CcAuthor = ({ authors }) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  let user = null;

  user = useSelector((state) => {
    if (state.users.get.error) {
      if (state.users.get.error.status == 404) {
        // User not found
        return authors;
      } else {
        return null;
      }
    } else {
      let foundUser = null;
      authors?.split(',').forEach((author) => {
        if (state.users.get.loaded && state.users.user.id == author) {
          foundUser = state.users.user?.fullname;
        }
      });
      return foundUser;
    }
  });

  useEffect(() => {
    if (authors) {
      authors.split(',').forEach((author) => {
        dispatch(getUser(author));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const useArr = [user];
      setUsers(useArr);
    }
  }, [user]);

  return users.length > 0 ? (
    <p className="govuk-caption-m govuk-!-margin-bottom-6">
      Written by {users.join(', ')}
    </p>
  ) : null;
};
