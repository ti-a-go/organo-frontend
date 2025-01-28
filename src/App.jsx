import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import Banner from "./components/Banner"
import Formulario from "./components/Formulario"
import Time from './components/Time';
import Rodape from "./components/Rodape";
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

  const { data: times, isPending: isTeamsPending } = useQuery({
    queryKey: ["teams"],
    queryFn: () => {
      return fetchTeams()
    },
  })

  const { data: colaboradores, isPending: isEmployeesPending } = useQuery({
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
    const teams = times.filter(time => time.name === colaborador.team)
    saveEmployeeMutation.mutate({
      name: colaborador.name,
      role: colaborador.role,
      image: colaborador.image,
      team_id: teams[0].id,
    })
  }

  if (isTeamsPending) {
    return <h1>Loading...</h1>
  }

  let listaDeTimes = <h1>Loading...</h1>

  if (!isEmployeesPending) {
    listaDeTimes = times?.map(time => (
      <Time
        key={time.name}
        nome={time.name}
        corPrimaria={time.primary_color}
        corSecundaria={time.secondary_color}
        colaboradores={colaboradores?.filter(colaborador => colaborador.team_id === time.id)}
      />
    ))
  }

  const nomesDosTimes = times?.map(time => time.name)
  
  return (
    <div className='App'>
      <Banner />
      <Formulario 
        times={nomesDosTimes} 
        aoColaboradorCadastrado={colaborador => aoNovoColaboradorAdicionado(colaborador)} 
      />
      {listaDeTimes}
      <Rodape />
    </div>
  )
}

export default App
