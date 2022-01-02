import React from 'react';
import { signInUser } from '../../api/auth';

export default function SignInButton() {
  return (
    <button type="button" className="blue-button" onClick={signInUser}>
      Sign In
    </button>
  );
}
