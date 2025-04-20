import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import FormattedDate from './FormattedDate.astro'

export default function BlogViewer({ posts, postContents }) {
    const [currentSlug, setCurrentSlug] = useState(posts[0].id)
    const currentPost = posts.find((post) => post.id === currentSlug)
    const markdown = postContents[currentPost.id]

    return (
        <>
            <aside className="lg:col-span-1 overflow-y-auto">
                <ul className="space-y-1 pr-4">
                    {posts.map((post) => (
                        <li key={post.id}>
                            <button
                                className={`block w-full font-merri text-left my-1 p-4 rounded-lg hover:bg-amber-100 transition-colors ${currentSlug === post.id ? 'bg-amber-100' : 'bg-amber-50'
                                    }`}
                                onClick={() => setCurrentSlug(post.id)}
                            >
                                <time className="text-lg text-gray-500">
                                    {new Date(post.pubDate).toLocaleDateString('de-DE', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>

                                <h3 className="font-bold">{post.title}</h3>
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="lg:col-span-2 overflow-y-auto">
                {currentPost && (
                    <article className="prose prose-stone font-merri max-w-none p-6">
                        <time className="text-lg text-gray-500">
                            {new Date(currentPost.pubDate).toLocaleDateString('de-DE', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                        <h1 className="prose-stone font-merri font-semibold text-2xl mb-6">
                            {currentPost.title}
                        </h1>

                        <div
                            className="mx-auto my-10 markdown-content
                                        prose prose-stone text-lg
                                        font-merri font-normal
                                        leading-loose tracking-normal
                                        dark:prose-invert
                                        prose-p:text-pretty
                                        prose-img:rounded-xl
                                "
                        >
                            <ReactMarkdown>
                                {markdown}
                            </ReactMarkdown>
                        </div>
                    </article>
                )}
            </main>
        </>
    )
}
