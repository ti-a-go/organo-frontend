import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import Banner from "./components/Banner"
import Form from "./components/Form"
import Team from './components/Team';
import Footer from "./components/Footer";
import './App.css'


const fetchTeams = async () => {
  const results = await fetch(`http://localhost:8000/teams/`)

  return await results.json()
}

const fetchEmployees = async () => {
  const results = await fetch(`http://localhost:8000/employees/`)

  return await results.json()
}

function App() {

  const { data: teams, isPending: isTeamsPending } = useQuery({
    queryKey: ["teams"],
    queryFn: () => {
      return fetchTeams()
    },
  })

  const { data: employees, isPending: isEmployeesPending } = useQuery({
    queryKey: ["employees"],
    queryFn: () => {
      return fetchEmployees()
    },
  })

  const queryClient = useQueryClient()

  const saveEmployeeMutation = useMutation({
    mutationFn: (postData) => {
      return fetch("http://localhost:8000/employees", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(postData)
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Failed request to create new employee.")
        }

        return response.json()
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"])
    },
    onError: () => {
      console.error("Employee was not created due to request failure.")
    }
  })
  
  const aoNovoColaboradorAdicionado = (colaborador) => {
    const foundTeams = teams.filter(team => team.name === colaborador.team)
    saveEmployeeMutation.mutate({
      name: colaborador.name,
      role: colaborador.role,
      image: colaborador.image,
      team_id: foundTeams[0].id,
    })
  }

  if (isTeamsPending) {
    return <h1>Loading...</h1>
  }

  let listaDeTimes = <h1>Loading...</h1>

  if (!isEmployeesPending) {
    listaDeTimes = teams?.map(team => (
      <Team
        key={team.name}
        name={team.name}
        primaryColer={team.primary_color}
        secondaryColor={team.secondary_color}
        employees={employees?.filter(employee => employee.team_id === team.id)}
      />
    ))
  }

  const nomesDosTimes = teams?.map(team => team.name)
  
  return (
    <div className='App'>
      <Banner />
      <Form 
        teams={nomesDosTimes} 
        onEmployeeAdded={employee => aoNovoColaboradorAdicionado(employee)} 
      />
      {listaDeTimes}
      <Footer />
    </div>
  )
}

export default App
