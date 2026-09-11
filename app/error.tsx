"use client";
export default function ErrorPage({ reset }: { reset: () => void }) { return <main className="standard-page empty-page"><p className="eyebrow">A small detour</p><h1>The road went quiet.</h1><button className="primary-action" onClick={reset}>Try again</button></main>; }
