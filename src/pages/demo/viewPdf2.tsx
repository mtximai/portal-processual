// Utilizando pspdfkit
// https://pspdfkit.com/blog/2021/how-to-build-a-reactjs-viewer-with-pdfjs/

// > npm install pspdfkit
// > cp -R ./node_modules/pspdfkit/dist/pspdfkit-lib public/pspdfkit-lib

import { useEffect, useRef } from 'react';

export default function PdfViewerComponent(props) {
	const containerRef = useRef(null);

	useEffect(() => {
		let PSPDFKit;

		(async function () {
			PSPDFKit = await import('pspdfkit');

			const instance = await PSPDFKit.load({
				container: containerRef.current,
				document: '/paf2020.pdf',
				baseUrl: `${window.location.protocol}//${window.location.host}/`,
			});

		})();

		//return () => PSPDFKit && PSPDFKit.unload(container);
	}, []);

	return (
		<div
			ref={containerRef}
			style={{ width: '100%', height: '100vh' }}
		/>
	);
}