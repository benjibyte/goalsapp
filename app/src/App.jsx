import "./App.css"

function Header() {
  return ( // Or many... 
    <header>
      <h1>Goals App</h1> 
    </header>
  )
}

function CreateGoalButton(props) { // This has an ID so I only want one of these
  return (
    <div class="buttons" id="createGoalButton">
      <button type="">+</button>
    </div>
  )
}

function App() {
  return (
    <div>
      <Header />
      <CreateGoalButton />
    </div>
  );
}


// Sends the generated markup to the one html file ran/to-be-injected by the react compiler
export default App
