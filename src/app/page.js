import { redirect } from 'next/navigation'

export default function Home() {
    redirect('/today')
    return (
        <div>
            <h1>Redirecting...</h1>
        </div>
    );
}