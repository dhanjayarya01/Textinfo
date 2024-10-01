import Head from 'next/head';
import TextForm from '../app/componants/TextForm'

export default function Home() {
    return (
        <div
            className="flex min-h-screen flex-col items-center justify-between p-24"
            style={{
                backgroundImage: "url('https://wallpapercave.com/wp/wp5282645.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Head>
                <title>Text Submission App</title>
                <meta name="description" content="Submit your text here" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="z-10 flex justify-center ali w-full max-w-5xl items-center  font-mono text-sm lg:flex">
                
                <TextForm />
            </main>
        </div>
    );
}
