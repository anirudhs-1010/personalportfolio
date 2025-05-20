'use client';

import { useEffect, useState } from 'react';

export default function ChessPage() {
  const [puzzleData, setPuzzleData] = useState({
    text: '',
    link: 'https://chesspuzzle.net/Daily',
    image: '',
    players: '',
    site: ''
  });

  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        const response = await fetch('https://chesspuzzle.net/Daily/Api');
        if (response.ok) {
          const result = await response.json();
          setPuzzleData({
            text: result.Text,
            link: result.Link,
            image: result.Image,
            players: result.Players,
            site: result.Site
          });
        }
      } catch (error) {
        console.error('Error fetching puzzle:', error);
      }
    };

    fetchPuzzle();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <p className="mb-4">
          <span>{puzzleData.players}</span><br />
          <span dangerouslySetInnerHTML={{ __html: puzzleData.site }} />
        </p>
        <a 
          href={puzzleData.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-4"
        >
          {puzzleData.image && (
            <img 
              src={puzzleData.image} 
              alt="Daily Chess Puzzle" 
              className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
            />
          )}
        </a>
        <h3 className="text-xl font-semibold text-blue-400">
          {puzzleData.text}
        </h3>
      </div>
    </div>
  );
} 