import React from 'react';
import { signOutUser } from '../../api/auth';

export default function SignOutButton() {
  return (
    <button type="button" className="orange-button" onClick={signOutUser}>
      Sign Out
    </button>
  );
}
