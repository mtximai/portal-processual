// Utilizando PDF.js (Mauro -28/03/22)
// https://pspdfkit.com/blog/2021/how-to-build-a-reactjs-viewer-with-pdfjs/

// > npm install pdfjs-dist
// > copy ./node_modules/pdfjs-dist/build/pdf.worker.min.js ./public/

import React, { useEffect, useRef } from 'react';

export default function ViewPdf1() {

	const canvasRef = useRef(null);

	useEffect(() => {
		(async function () {
			// We import this here so that it's only loaded during client-side rendering.
			const pdfJS = await import('pdfjs-dist/build/pdf');

			pdfJS.GlobalWorkerOptions.workerSrc = window.location.origin + '/pdf.worker.min.js';

			const pdf = await pdfJS.getDocument('/paf2020.pdf').promise;

			const page = await pdf.getPage(2);
			
      const viewport = page.getViewport({ scale: 1.5 });

			// Prepare canvas using PDF page dimensions.
			const canvas = canvasRef.current;
			const canvasContext = canvas.getContext('2d');

			canvas.height = viewport.height;
			canvas.width = viewport.width;

			// Render PDF page into canvas context.
			const renderContext = { canvasContext, viewport };
			
			page.render(renderContext);
		})();

	}, []);

	return <canvas ref={canvasRef} style={{ height: '100vh' }} />;
}