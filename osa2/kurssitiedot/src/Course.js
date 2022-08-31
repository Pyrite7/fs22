const Course = (props) => {
    return(
      <div>
        <Header course={props.course}/>
  
        <Content course={props.course}/>
  
        <Total course={props.course}/>
      </div>
    )
  }
  
  const Header = (props) => {
    return(
      <div>
        <h2>{props.course.name}</h2>
      </div>
    )
  }
  
  const Content = (props) => {
    return(
      <div>
        <ul>
          {props.course.parts.map(
            part =>
            <Part key={part.id} part={part}/>
          )}
        </ul>
      </div>
    )
  }
  
  const Part = (props) => {
    return(
      <div>
        <li>
          {props.part.name} {props.part.exercises}
        </li>
      </div>
    )
  }
  
  const Total = (props) => {
    const totalExercises = props.course.parts.reduce(
      (sum, part) =>{
        return(sum + part.exercises)
      },
      0
    )
  
    return(
      <div>
        <p>
          Number of exercises {totalExercises}
        </p>
      </div>
    )
  }

  export default Course