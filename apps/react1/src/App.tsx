import { Button } from "@repo/ui/button";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-5xl font-bold text-indigo-900 mb-4">React App 1</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Tailwind CSS Testing
          </h2>
          <p className="text-gray-600">
            This is a test to verify that Tailwind CSS v4 is working properly.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Blue Button
            </button>
            <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              Green Button
            </button>
            <button className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
              Purple Button
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-100 p-4 rounded-lg border-2 border-red-300">
            <h3 className="font-bold text-red-800">Card 1</h3>
            <p className="text-red-600">Testing responsive grid layout</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg border-2 border-yellow-300">
            <h3 className="font-bold text-yellow-800">Card 2</h3>
            <p className="text-yellow-600">Testing color utilities</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg border-2 border-green-300">
            <h3 className="font-bold text-green-800">Card 3</h3>
            <p className="text-green-600">Testing spacing utilities</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <Button appName="React App 1" className="btn-primary">
            Click Me - Shared UI Component
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
