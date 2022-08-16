import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@plone/volto/actions';

export const CcAuthor = ({ authors }) => {
  console.log(authors);
  const dispatch = useDispatch();
  const users = [];
  let user = null;
  useEffect(() => {
    if (authors) {
      authors.split(',').forEach((author) => {
        dispatch(getUser(author));
      });
    }
  });

  user = useSelector((state) => {
    if (state.users.get.error) {
      if (state.users.get.error.status == 404) {
        // User not found
        users.push(authors);
      }
    } else {
      authors?.split(',').forEach((author) => {
        if (state.users.get.loaded && state.users.user.id == author) {
          users.push(state.users.user?.fullname);
        } else {
          users.push(author);
        }
      });
    }
  });

  return users.length > 0 ? (
    <p className="govuk-caption-m govuk-!-margin-bottom-6">
      Written by {users.join(', ')}
    </p>
  ) : null;
};
