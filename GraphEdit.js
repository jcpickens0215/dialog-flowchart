const addVertexBtn = document.getElementById("add-vertex");
const addArcBtn = document.getElementById("add-arc");
const field = document.getElementById("field");

// Set up a flag to keep track of whether the vertex is being dragged
let isDragging = false;

// Set up variables to keep track of the current position of the vertex
let currentX;
let currentY;

// Set up variables to store the initial position of the vertex
let initialX;
let initialY;

// Set up variables to store the x and y offset of the mouse
let xOffset = 0;
let yOffset = 0;

// Counter variables used for the id of vertices and arcs
let vertexID = 0;
let arcID = 0;

// Create a container object for all the vertices and arcs
const graph = {
    vertices: [],
    arcs: []
}
// Get the head vertex
const head = document.getElementById("vertex-head");

// Add the head vertex
graph.vertices.push(
    {
        id: -1,
        body: head.children[1].innerHTML,
        arcs: []
    }
);

addVertexBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const newVertex = document.createElement('div');
    newVertex.className = 'vertex';
    newVertex.dataset.id = `${vertexID}`;
    

    const newVertexHeader = document.createElement('h3');
    newVertexHeader.className = 'vertex-header';
    newVertexHeader.textContent = 'Empty';

    const newVertexBody = document.createElement('p');
    newVertexBody.className = 'vertex-body';
    newVertexBody.textContent = 'Empty';

    newVertex.appendChild(newVertexHeader);
    newVertex.appendChild(newVertexBody);

    newVertex.style.top = window.innerHeight / 2;
    newVertex.style.left = window.innerWidth / 2;

    field.appendChild(newVertex);

    graph.vertices.push(
        {
            id: vertexID,
            body: newVertexBody.innerHTML,
            arcs: []
        }
    );

    setupVertex(newVertex);

    vertexID++;
});

// Add event listeners to new vertices
const setupVertex = (vertex) => {
    vertex.addEventListener('mousedown', (event) => {
    if(isDragging) {
        return;
    }

    // Set the isDragging flag to true
    isDragging = true;

    // Set the initial position of the vertex
    initialX = vertex.offsetLeft;
    initialY = vertex.offsetTop;

    // Get the current position of the mouse
    currentX = event.clientX;
    currentY = event.clientY;

    // Calculate the offset of the mouse from the top-left corner of the vertex
    xOffset = currentX - initialX;
    yOffset = currentY - initialY;
  });

  vertex.addEventListener('mouseup', () => {
    // Set the isDragging flag to false
    isDragging = false;
    vertex.style.zIndex = '-1';
  });

  vertex.addEventListener('mousemove', (event) => {
    // Only move the vertex if the isDragging flag is true
    if (isDragging) {
      // Calculate the new position of the vertex based on the mouse position
      const newX = event.clientX - xOffset;
      const newY = event.clientY - yOffset;

      // Update the position of the vertex
      vertex.style.top = `${newY}px`;
      vertex.style.left = `${newX}px`;
      vertex.style.zIndex = '1';
    }
  });
};