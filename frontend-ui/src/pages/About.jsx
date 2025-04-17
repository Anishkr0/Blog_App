import React from 'react';

export default function BlogAbout() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Courtside:</h1>
        <h2 className="text-4xl font-bold text-gray-900">The Dribbble Blog</h2>
      </div>

      {/* Featured Article */}
      <div className="mb-12 border-b pb-10">
        <div className="text-sm text-gray-500 mb-2">APR 8, 2025</div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Pushing the Boundaries of Logo Design Through Storytelling and Expression
        </h3>
        <div className="w-full mb-4 rounded overflow-hidden">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWFr2fbtpjIx_KXjeTae9fwNyXRKZahsJTeg&s"
            alt="Logo Design Sketches"
            className="rounded w-full h-64 object-cover"
          />
        </div>
        <p className="text-gray-700">
          We talked to Brazilian graphic designer Breno Bitencourt, who is known for his bold,
          expressive logo designs that push traditional design boundaries.
        </p>
      </div>

      {/* Blog Content + Sidebar */}
      <div className="flex flex-col-reverse lg:flex-row gap-12">
        {/* Blog List */}
        <div className="w-full lg:w-2/3 space-y-12">
          {/* Article 1 */}
          <div className="flex flex-col md:flex-row gap-6 pb-8 border-b">
            <div className="w-full md:w-1/3 h-40 md:h-48 bg-blue-100 rounded overflow-hidden">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC66SvSmhCeZWuTaaFciAdSTwt2jERdpPV9g&s"
                alt="Icon Set"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-2/3">
              <div className="text-sm text-gray-500 mb-1">MAR 24, 2025</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">What Makes a Great Icon Set?</h3>
              <p className="text-gray-700">
                Learn how to create a cohesive and unified icon set with these tips from Noun Project.
              </p>
            </div>
          </div>

          {/* Article 2 */}
          <div className="flex flex-col md:flex-row gap-6 pb-8 border-b">
            <div className="w-full md:w-1/3 h-40 md:h-48 bg-orange-100 rounded overflow-hidden">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRurzATYuqK_A3QQf6lK3EMn-vY0iEQokXBFA&s"
                alt="Work In Progress"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-2/3">
              <div className="text-sm text-gray-500 mb-1">MAR 17, 2025</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Work In Progress, Part 9 🚧</h3>
              <p className="text-gray-700">
                Dribbble's mission is to help professional designers earn a living doing work they take pride in...
              </p>
            </div>
          </div>

          {/* Article 3 */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 h-40 md:h-48 bg-blue-100 rounded overflow-hidden">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSlzG8Nx4ZDm746bgYhOH43wEb3BmCUEBpZw&s"
                alt="Work In Progress 8"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-2/3">
              <div className="text-sm text-gray-500 mb-1">MAR 4, 2025</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Work In Progress, Part 8 🚧</h3>
              <p className="text-gray-700">
                Dribbble released Service Search to help clients connect with the right designers.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Overtime</h3>
            <p className="text-gray-700">The Dribbble Podcast</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">The Power of Play</h3>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">All Categories</h3>
            <ul className="space-y-2">
              {['Interviews', 'Podcast', 'Inspiration', 'Process', 'Meetups', 'Updates', 'Hang Time', 'Community'].map((item) => (
                <li key={item} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
