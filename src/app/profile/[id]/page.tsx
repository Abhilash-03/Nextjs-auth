export default function UserProfile({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-5xl text-blue-500 font-bold font-serif my-3">Profile</h1>
            <hr />
            <p className="text-2xl my-4">Profile page 
            <span className="p-2 ml-2 rounded bg-orange-200 text-black">{params.id}</span>
            </p>

            </div>
    )
}