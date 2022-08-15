import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@plone/volto/actions';

export const CcAuthor = ({ authors }) => {
  const dispatch = useDispatch();
  const users = [];
  const user = useSelector((state) => {
    if (state.users.get.error && authors) {
      return authors;
    } else if (!state.users.get.error) {
      return state.users.user.fullname;
    } else {
      return null;
    }
  });

  if (user) {
    users.push(user);
  }
  useEffect(() => {
    if (users.length == 0 && authors) {
      authors.split(',').forEach((author) => {
        dispatch(getUser(author));
      });
    }
  }, [dispatch]);

  return (
    <p className="govuk-caption-m govuk-!-margin-bottom-6">
      Written by {users.join(', ')}
    </p>
  );
};
