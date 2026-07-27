                       
const user = "Elder Brinkerhoff"
// Example Goal list ... Later to be imported from the Database based on the User
let goalsArray = [
  { id: 1, name: "Learn React", description: "Learn React to build a web app" },
  { id: 2, name: "Build a React app", description: "Build a React app from scratch" }
];


// Components for the "Goals" page

// Buttons
function AddGoal() { // This button goes in the bottom right corner of the page and opens a modal to add a new goal
  return <button className="add-goal-button">
    +
  </button> // This is where I'm going to put an actual JS function to open a modal to add a new goal
}

function EditGoal({ goal }) { // Edit, Delete, and Complete buttons go in the right side of each goal entry
  return <button className="edit-goal-button">
    Edit
  </button>
}
function DeleteGoal({ goal }) {
  return <button className="delete-goal-button">
    Delete
  </button>
}
function CompleteGoal({ goal }) {
  return <button className="complete-goal-button">
    Complete
  </button>
}


function GoalEntry({ goal }) {
  return <div className="goal-entry">{goal.name}
    <div id="goal-entry-buttons">
      <DeleteGoal goal={goal} />
      <CompleteGoal goal={goal} />
      <EditGoal goal={goal} /> 
    </div>
  </div>
  
} 

function GoalsContainer({ goals }) {
  return (
    <div className="goals-container">
      {goals.map((goal) => (
        <GoalEntry key={goal.id} goal={goal} />
      ))}
    </div>
  );
}


function App() {
  return (
    <div className="goals-menu-page">
      <GoalsContainer goals={goalsArray} />
      <AddGoal />
    </div>
  );
}

export default App          
