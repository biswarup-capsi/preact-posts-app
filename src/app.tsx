// import { useState } from 'preact/hooks'
import './app.css'
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { signal } from '@preact/signals';
import type { Comment } from './types/commentType';
import {usePagination} from './hooks/usePagination';

const id = signal(1);

function CommentCard({ comment }: { comment: Comment }) {
  return (
    <div style={{
      background: '#f9f9f9',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      marginBottom: '16px',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
      <h3 style={{ margin: '0 0 8px', color: '#333' }}>{comment.name}</h3>
      <p style={{ margin: '0 0 8px', color: '#666' }}>{comment.body}</p>
      <p style={{ fontSize: '0.9em', color: '#999' }}>From: {comment.email}</p>
    </div>
  );
}

export function App() {

  const {data, isPending} = useQuery({
    queryKey: ["posts", id.value],
    queryFn: () => getPosts(id.value),
    enabled: true,

  });
  const { changePage, currentPage, nextPage, pageData, prevPage, totalPages} = usePagination(data || [], 3);

  

  async function getPosts(id:number):Promise<Comment[]>{
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }

  return (
    <>
      {isPending ? <h1>Loading...</h1> : (pageData().map(comment =>
        <CommentCard comment={comment} />
      ))}
      {/* Pagination controls */}
      <div style={{ textAlign: 'center', marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
        <button onClick={prevPage} >
          Previous
        </button>
        <span style={{ margin: '0 12px' }}>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button onClick={nextPage} >
          Next
        </button>
      </div>
      <br />
      <button onClick={() => id.value++}>Prev post</button>
      <h3>My posts</h3>
      <button onClick={()=>id.value++}>Next post</button>
    </>
  )
}
