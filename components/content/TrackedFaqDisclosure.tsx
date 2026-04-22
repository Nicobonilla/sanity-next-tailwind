'use client';

import { trackFaqExpand } from '@/components/lib/GTMTrackers';

export default function TrackedFaqDisclosure({
  answer,
  answerClassName,
  className,
  question,
  source,
  summaryClassName,
}: {
  answer: string;
  answerClassName?: string;
  className?: string;
  question: string;
  source: string;
  summaryClassName?: string;
}) {
  return (
    <details
      className={className}
      onToggle={(event) => {
        if (event.currentTarget.open) {
          trackFaqExpand(source, question);
        }
      }}
    >
      <summary className={summaryClassName}>{question}</summary>
      <p className={answerClassName}>{answer}</p>
    </details>
  );
}
