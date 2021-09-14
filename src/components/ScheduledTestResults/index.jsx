import { React, useState, useEffect } from "react";
import "../../config/firebase.js"; // initialize firebase
import {
  collection,
  query,
  orderBy,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";

import Menu from "./menu";

function ScheduledResults() {
  const [results, setResults] = useState([]);

  // Load realtime updates from firebase and put them in state
  // React useEffect so that it sets up this process only once on component load
  useEffect(() => {
    // Get database reference
    const db = getFirestore();

    // Query specific collection and order results
    const q = query(
      collection(db, "test-results"),
      orderBy("timestamp", "desc")
    );

    // Re-load collection when data changes, set in state
    onSnapshot(q, (docs) => {
      const items = [];

      docs.forEach((doc) => {
        items.push(doc.data());
      });
      setResults(items);
    });
  }, []);

  return (
    <div>
      <Menu results={results} />
    </div>
  );
}

export default ScheduledResults;
