export default function search(searchText, routes, isTiploc = false) {
  // If search text is empty, set searched routes to null
  // This will cause all of them to show
  if (searchText === "") return null;
  else {
    // Break the search text by :
    const searchedSplit = searchText.split(":");
    const searchedTerm = searchedSplit[0].trim().toLowerCase();
    const searchedValue =
      searchedSplit.length > 1 ? searchedSplit[1].trim() : null;
    // Array of allowed terms
    const allowedTerms = [
      "id",
      "toc",
      "headcode",
      "to",
      "totiploc",
      "from",
      "fromtiploc",
    ];
    const chosenTerm = {
      id: "trainId",
      toc: "toc_Name",
      headcode: "headCode",
      to: "destinationLocation",
      totiploc: "destinationTiploc",
      from: "originLocation",
      fromtiploc: "originTiploc",
    };
    // Check if the search term is allowed
    if (!allowedTerms.includes(searchedTerm)) return null;
    // Return if the search term is not valid
    else if (!searchedTerm || !searchedValue) return null;
    // Filter the routes by the search term
    else {
      if (isTiploc) {
        // The array also includes movment so filter to tiploc only
        const searchedRoutes = routes.filter((route) =>
          route.tiploc[chosenTerm[searchedTerm]]
            .toLowerCase()
            .includes(searchedValue.toLowerCase())
        );
        return searchedRoutes;
      } else {
        // The array only include routes so filter to routes only
        const searchedRoutes = routes.filter((route) =>
          route[chosenTerm[searchedTerm]]
            .toLowerCase()
            .includes(searchedValue.toLowerCase())
        );
        return searchedRoutes;
      }
    }
  }
}
