import Link from "next/link";
export default function NotFound() { return <main className="standard-page empty-page"><p className="eyebrow">Lost on the road</p><h1>This world isn’t on our map.</h1><Link className="primary-action" href="/discover">Find a world</Link></main>; }
