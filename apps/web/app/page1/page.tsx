"use client";

//make a beautiful card using tailwind css
function Page1() {
  return <>
    <div className="text-center p-4 border rounded-lg shadow-lg bg-white max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-2">Beautiful Card</h2>
      <p className="text-gray-700 mb-4">This is a simple card component styled with Tailwind CSS.</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Click Me</button>  
    </div>
  </>
}

export default Page1;
