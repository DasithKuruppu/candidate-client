export async function getCandidateInfo(
  dispatch,
  query = "",
  actionName = "setCandidateInfo"
) {
  dispatch({ type: "isLoading", payload: true });
  const fetchCandidateinfo = async () => {
    let response = await fetch(`http://localhost:3000/api/candidates${query}`);
    return await response.json();
  };
  const payload = await fetchCandidateinfo();
  dispatch({ type: actionName, payload });
  dispatch({ type: "isLoading", payload: false });
}

export async function getTechnologies(
  dispatch,
  actionName = "setAvailableTechnologies"
) {
  const fetchTechnologies = async () => {
    let response = await fetch(
      `http://localhost:3000/api/candidates/technologies`
    );
    return await response.json();
  };
  const payload = await fetchTechnologies();
  const mappedPayload = payload.map(technology => technology.name);
  console.log(payload)
  dispatch({ type: actionName, payload:mappedPayload });
}
