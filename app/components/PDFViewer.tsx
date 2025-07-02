'use client';

import { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const pdfs = [
  '(1) Calvin & Hobbes - Bill Watterson.pdf',
  '(2) Something Under the Bed is Drooling - Bill Watterson.pdf',
  '(3) Yukon Ho! - Bill Watterson.pdf',
  '(4) Weirdos From Another Planet - Bill Watterson.pdf',
  '(5) Revenge of the Baby-Sat - Bill Watterson.pdf',
  '(6) Scientific Progress Goes Boink! - Bill Watterson.pdf',
  '(7) Attack of the Deranged Mutant Killer Monster Snow Goons - Bill Watterson.pdf',
  '(8) The Days are Just Packed - Bill Watterson.pdf',
  '(9) Homocidal Psycho Jungle Cat - Bill Watterson.pdf',
  '(10) Theres Treasure Everywhere - Bill Watterson.pdf',
  '(11) Its a Magical World - Bill Watterson.pdf',
  '(M) Calvin and Hobbes Miscellaneous - Bill Watterson.pdf',
  '(S) Calvin and Hobbes Sunday Pages - Bill Watterson.pdf',
];

export default function PDFViewer() {
  const [selectedPdf, setSelectedPdf] = useState(pdfs[0]);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const basePath = '/pdfs/CalvinAndHobbes/';

  return (
    <div style={{ height: '100vh', padding: '1rem' }}>
      <label htmlFor="pdf-select"></label>
      <select
        id="pdf-select"
        value={selectedPdf}
        onChange={(e) => setSelectedPdf(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem' }}
        className='border '
      >
        {pdfs.map((pdf) => (
          <option key={pdf} value={pdf}>
            {pdf}
          </option>
        ))}
      </select>

      <div style={{ height: '90%' }}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl={basePath + encodeURIComponent(selectedPdf)}
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
      </div>
    </div>
  );
}
