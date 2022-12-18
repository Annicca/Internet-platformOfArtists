export const fetchMyGroups = async (url, setGroups) => {
    const data = await (
      await fetch(url)).json();
      console.log(data.results);
    setGroups(data.results);
};