import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import Banner from "./components/Banner"
import Form from "./components/Form"
import Team from './components/Team';
import Footer from "./components/Footer";
import { fetchTeams, fetchEmployees, saveEmployee, onSaveEmployeeFailure, onSaveEmployeeSuccess, deleteEmployee, onDeleteEmployeeFailure, onDeleteEmployeeSuccess } from "./network/queries"
import './App.css'


function App() {

  const { data: teams, isPending: isTeamsPending } = useQuery({
    queryKey: ["teams"],
    queryFn: fetchTeams,
  })

  const { data: employees, isPending: isEmployeesPending } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  })

  const queryClient = useQueryClient()

  const saveEmployeeMutation = useMutation({
    mutationFn: saveEmployee,
    onSuccess: () => onSaveEmployeeSuccess(queryClient),
    onError: onSaveEmployeeFailure
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

  const deleteEmployeeMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => onDeleteEmployeeSuccess(queryClient),
    onError: onDeleteEmployeeFailure
  })

  function handleDeleteEmployee(id) {
    deleteEmployeeMutation.mutate(id)
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
        onDeleteEmployee={handleDeleteEmployee}
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
