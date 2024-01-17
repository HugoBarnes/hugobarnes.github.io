document.querySelectorAll('.project-row').forEach(row => {
    const projectImage = row.querySelector('.project-image');
    const projectId = row.id; // Get the project ID from the row's ID attribute

    // Add a click event listener to each project row
    row.addEventListener('click', () => {
        // Navigate to a new page based on the project's ID
        window.location.href = `/pages/${projectId}.html`; // Replace with your actual URL structure
    });

    const rowRect = row.getBoundingClientRect();

    row.addEventListener('mouseover', () => {
        projectImage.style.display = 'block';
    });

    row.addEventListener('mousemove', (e) => {
        const offsetX = -450;
        const offsetY = -100;

        const relativeX = e.clientX - rowRect.left + offsetX;
        const relativeY = e.clientY - rowRect.top + offsetY;

        console.log("Mouse move:", e.clientX, e.clientY); // For debugging
        console.log("Adjusted position:", relativeX, relativeY); // For debugging

        projectImage.style.left = relativeX + 'px';
        projectImage.style.top = relativeY + 'px';
        projectImage.style.zIndex = '10';
    });

    row.addEventListener('mouseout', () => {
        projectImage.style.display = 'none';
    });
});
