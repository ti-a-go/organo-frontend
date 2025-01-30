export const fetchTeams = async () => {
    const results = await fetch(`http://localhost:8000/teams/`)
  
    return await results.json()
}
  
export const fetchEmployees = async () => {
    const results = await fetch(`http://localhost:8000/employees/`)
  
    return await results.json()
}

export const saveEmployee = (postData) => {
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
}

export const onSaveEmployeeSuccess = (queryClient) => queryClient.invalidateQueries(["employees"])

export const onSaveEmployeeFailure = () => console.error("Employee was not created due to request failure.")


export const deleteEmployee = (id) => {
  return fetch(`http://localhost:8000/employees/${id}`, {
      method: "DELETE" 
    }).then((response) => {
    
      if (!response.ok) {
        throw new Error("Failed request to delete employee.")
      }
  })
}

export const onDeleteEmployeeSuccess = (queryClient) => {
  console.log("Invalidating queries.............")
  queryClient.invalidateQueries(["employees"])
}

export const onDeleteEmployeeFailure = () => console.error("Employee was not deleted due to request failure.")