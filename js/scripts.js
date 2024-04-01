function filterImagesTEST(element) {
    // URL of the image to display
    var imageUrl = 'https://alchemancy.github.io/Coal Sprite.png?raw=true';

    // Get the image container element by ID
    var imageContainer = document.getElementById('image-container');

    // Check if the image container element exists
    if (imageContainer) {
        // Create and append 12 images to the image container
        for (var i = 0; i < 12; i++) {
            // Create a new img element
            var img = document.createElement('img');

            // Set the src attribute of the img element to the image URL
            img.src = imageUrl;

            // Append the img element to the image container div
            imageContainer.appendChild(img);
        }
    } else {
        console.error('Image container not found');
    }
}




function filterImages(element) {
            var imageGrid = document.getElementById('image-grid');
            imageGrid.innerHTML = ''; // Clear existing images

            // Fetch data from Google Spreadsheet Alchemancers tab
            fetch('https://docs.google.com/spreadsheets/d/1ZOAFcAZk7molsyaZJxQA1GmwTANVo8I9iFEiMU5aijE/gviz/tq?tqx=out:json&sheet=Alchemancers')
                .then(response => response.text())
                .then(data => {
                    // Parse JSON response
                    var json = JSON.parse(data.substr(47).slice(0, -2));
                    var rows = json.table.rows;

                    // Filter images based on selected element
                    rows.forEach(row => {
                        if (row.c[1].v === element) { // Assuming element is in the second column (column B)
                            var imageName; 
                            if (row.c[0].v === "Mother Margaret,<br>Masterful Mentor") { // Special case
                                imageName = "Mother Margaret, Masterful Mentor.png"; 
                            } else {
                                imageName = row.c[0].v + '.png'; // Append '.png' to the name
                            }
                            var img = document.createElement('img');
                            img.src = 'https://alchemancy.github.io/' + imageName;
                            var imageItem = document.createElement('div');
                            
                            imageItem.className = 'image-item';
                            imageItem.appendChild(img);
                            imageGrid.appendChild(imageItem);
                        }
                    });
                })
                .catch(error => console.error('Error fetching data for Alchemancers:', error));

            // Fetch data from Google Spreadsheet mono colour cards tab
            fetch('https://docs.google.com/spreadsheets/d/1ZOAFcAZk7molsyaZJxQA1GmwTANVo8I9iFEiMU5aijE/gviz/tq?tqx=out:json')
                .then(response => response.text())
                .then(data => {
                    // Parse JSON response
                    var json = JSON.parse(data.substr(47).slice(0, -2));
                    var rows = json.table.rows;

                    //sort by mana cost, but skip row 1
                    rows.sort((a, b) => { 
                        var manaA = (a.c[0].v) || 0; //default to 0 if null
                        var manaB = (b.c[0].v) || 0; //default to 0 if null
                        return manaA - manaB;
                    });

                    // Filter images based on selected element
                    rows.forEach(row => {
                        if (row.c[7].v === element) { // Assuming element is in the eighth column (column H)
                            var imageName = row.c[3].v + '.png'; // Append '.png' to the image name
                            var img = document.createElement('img');
                            img.src = 'https://alchemancy.github.io/' + imageName;
                            var imageItem = document.createElement('div');
                            imageItem.className = 'image-item';
                            imageItem.appendChild(img);
                            imageGrid.appendChild(imageItem);
                        }
                    });
                })
                .catch(error => console.error('Error fetching data for mono-colour elements:', error));

            // Fetch data from Google Spreadsheet for dual-color elements
            fetch('https://docs.google.com/spreadsheets/d/1ZOAFcAZk7molsyaZJxQA1GmwTANVo8I9iFEiMU5aijE/gviz/tq?tqx=out:json&sheet=DualColours') //Access dual colours sheet
                .then(response => response.text())
                .then(data => {
                    // Parse JSON response
                    var json = JSON.parse(data.substr(47).slice(0, -2));
                    var rows = json.table.rows;

                    //sort by mana cost, but skip row 1
                    rows.sort((a, b) => { 
                        var manaA = (a.c[0].v) || 0; //default to 0 if null
                        var manaB = (b.c[0].v) || 0; //default to 0 if null
                        return manaA - manaB;
                    });

                    // Filter images based on selected element for dual-color elements
                    rows.forEach(row => {
                        if (row.c[7].v === element) { // Assuming element is in the eighth column (column H)
                            var imageName = row.c[3].v + '.png'; // Append '.png' to the image name
                            var img = document.createElement('img');
                            img.src = 'https://alchemancy.github.io/' + imageName; // Replace with your GitHub repository URL
                            var imageItem = document.createElement('div');
                            imageItem.className = 'image-item';
                            imageItem.appendChild(img);
                            imageGrid.appendChild(imageItem);
                        }
                    });
                })
                .catch(error => console.error('Error fetching data for dual-color elements:', error));
        }
		
function displayMarkdownFile(filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(markdown => {
            // Convert Markdown to HTML
            var converter = new showdown.Converter();
            var html = converter.makeHtml(markdown);

            // Display HTML content in the specified container
            document.getElementById('markdown-content').innerHTML = html;
        })
        .catch(error => console.error('Error fetching Markdown file:', error));
}
// Call the function to display the Markdown file
displayMarkdownFile('Markdown Files/faq.md');