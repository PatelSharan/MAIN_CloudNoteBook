import NoteItem from "@/components/NoteItem";

export default function Home() {
  return (
    <>
      <div className="text-right">
        <button className="border p-4 bg-slate-800 text-white rounded hover:bg-slate-700 m-3 relative right-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
          </svg>
        </button>
      </div>
      <div className="grid lg:grid-cols-4 m-auto">
        <NoteItem />
        <NoteItem />
        <NoteItem />
        <NoteItem />
      </div>
    </>
  )
}
