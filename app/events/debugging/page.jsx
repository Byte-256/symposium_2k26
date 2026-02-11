'use client';

import PasswordProtection from '@/components/PasswordProtection';
import DebuggingContestPageContent from '@/components/debugging-contest/DebuggingContestPageContent';

const CONTEST_PASSWORD = 'DataVaganza2k26';

export default function DebuggingContestPage() {
  return (
    <PasswordProtection correctPassword={CONTEST_PASSWORD}>
      <DebuggingContestPageContent />
    </PasswordProtection>
  );
}
