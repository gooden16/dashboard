import React from 'react';
import { useParams } from 'react-router-dom';
import CanvasReviewStatus from '../components/activation/CanvasReviewStatus';

function CanvasActivation() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-5 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">Canvas Activation</h1>
          </div>
          <div className="p-6">
            <CanvasReviewStatus canvasId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CanvasActivation;