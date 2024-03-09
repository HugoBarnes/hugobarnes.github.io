document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#back-to-hugo').addEventListener('click', function(){
        window.history.back();
    });

    document.getElementById('volume-selector').addEventListener('change', function() {
        const selectedVolume = document.getElementById('volume-selector').value;
        if(selectedVolume === 'all') {
            resetUnseenPDFPaths();
            loadRandomComic();
        } else {
            loadVolumeFirstPage(selectedVolume);
        }
    });

    document.getElementById('random-cartoon').addEventListener('click', loadRandomComic);
    document.getElementById('next-cartoon').addEventListener('click', loadNextPage);
    document.getElementById('previous-cartoon').addEventListener('click', loadPreviousPage);

    resetUnseenPDFPaths(); // Initialize the unseenPDFPaths
    loadRandomComic(); // Load a random comic at startup
});

const pdfPaths = {
    all: [
        'pdfs/(1) Calvin & Hobbes - Bill Watterson.pdf',
        'pdfs/(2) Something Under the Bed is Drooling - Bill Watterson.pdf',
        'pdfs/(3) Yukon Ho! - Bill Watterson.pdf',
        'pdfs/(4) Weirdos From Another Planet - Bill Watterson.pdf',
        'pdfs/(5) Revenge of the Baby-Sat - Bill Watterson.pdf',
        'pdfs/(6) Scientific Progress Goes Boink! - Bill Watterson.pdf',
        'pdfs/(7) Attack of the Deranged Mutant Killer Monster Snow Goons - Bill Watterson.pdf',
        'pdfs/(8) The Days are Just Packed - Bill Watterson.pdf',
        'pdfs/(9) Homocidal Psycho Jungle Cat - Bill Watterson.pdf',
        'pdfs/(10) Theres Treasure Everywhere - Bill Watterson.pdf',
        'pdfs/(11) Its a Magical World - Bill Watterson.pdf',
        'pdfs/(M) Calvin and Hobbes Miscellaneous - Bill Watterson.pdf',
        'pdfs/(S) Calvin and Hobbes Sunday Pages - Bill Watterson.pdf'
    ],
    volumes: {
        volume1: 'pdfs/(1) Calvin & Hobbes - Bill Watterson.pdf',
        volume2: 'pdfs/(2) Something Under the Bed is Drooling - Bill Watterson.pdf',
        volume3: 'pdfs/(3) Yukon Ho! - Bill Watterson.pdf',
        volume4: 'pdfs/(4) Weirdos From Another Planet - Bill Watterson.pdf',
        volume5: 'pdfs/(5) Revenge of the Baby-Sat - Bill Watterson.pdf',
        volume6: 'pdfs/(6) Scientific Progress Goes Boink! - Bill Watterson.pdf',
        volume7: 'pdfs/(7) Attack of the Deranged Mutant Killer Monster Snow Goons - Bill Watterson.pdf',
        volume8: 'pdfs/(8) The Days are Just Packed - Bill Watterson.pdf',
        volume9: 'pdfs/(9) Homocidal Psycho Jungle Cat - Bill Watterson.pdf',
        volume10: 'pdfs/(10) Theres Treasure Everywhere - Bill Watterson.pdf',
        volume11: 'pdfs/(11) Its a Magical World - Bill Watterson.pdf',
        volumeM: 'pdfs/(M) Calvin and Hobbes Miscellaneous - Bill Watterson.pdf',
        volumeS: 'pdfs/(S) Calvin and Hobbes Sunday Pages - Bill Watterson.pdf'
    }
};

let unseenPDFPaths = [...pdfPaths.all]; // Duplicate the paths to manage unseen comics
let currentPdf = null;
let currentPageNumber = 1;

function resetUnseenPDFPaths() {
    unseenPDFPaths = [...pdfPaths.all]; // Resets to include all comics for random selection
}



function loadVolumeFirstPage(selectedVolume) {
    if (selectedVolume !== 'all') {
        const pdfPath = pdfPaths.volumes[selectedVolume]; // Access the path using the selected volume key
        loadPdf(pdfPath, 1); // Load the first page of the selected volume
    } else {
        resetUnseenPDFPaths();
        loadRandomComic();
    }
}


function loadNextPage() {
    if(currentPdf && currentPageNumber < currentPdf.numPages) {
        currentPageNumber++;
        loadPdfPage(currentPdf, currentPageNumber);
    } else {
        resetUnseenPDFPaths(); // Reset if at the end and trying to go next
        loadRandomComic();
    }
}

function loadPreviousPage() {
    if(currentPdf && currentPageNumber > 1) {
        currentPageNumber--;
        loadPdfPage(currentPdf, currentPageNumber);
    } else {
        loadRandomComic(); // Optionally, could reset or handle differently
    }
}

function loadRandomComic() {
    if(unseenPDFPaths.length === 0) resetUnseenPDFPaths(); // Reset if all have been seen

    const randomIndex = Math.floor(Math.random() * unseenPDFPaths.length);
    const randomPdfPath = unseenPDFPaths[randomIndex];
    unseenPDFPaths.splice(randomIndex, 1); // Remove the seen comic

    loadPdf(randomPdfPath, 1); // Always load the first page for simplicity here
}

function loadPdf(pdfPath, pageNumber) {
    pdfjsLib.getDocument(pdfPath).promise.then(function(pdfDoc) {
        currentPdf = pdfDoc;
        loadPdfPage(pdfDoc, pageNumber);
    }).catch(function (error) {
        console.error('Error loading PDF: ', error);
    });
}

function loadPdfPage(pdfDoc, pageNumber) {
    pdfDoc.getPage(pageNumber).then(function(page) {
        const canvas = document.getElementById('pdfCanvas');
        const context = canvas.getContext('2d');
        const scale = 2.5; // Example scale
        const viewport = page.getViewport({scale: scale});

        canvas.width = viewport.width/.9;
        canvas.height = viewport.height/.9;

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };

        page.render(renderContext).promise.then(function() {
            console.log('Page rendered');
            currentPageNumber = pageNumber; // Update the global current page number
        });
    });
}