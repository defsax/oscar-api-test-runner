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
  const [devResults, setDevResults] = useState([]);
  const [stagingResults, setStagingResults] = useState([]);
  // Load realtime updates from firebase and put them in state
  // React useEffect so that it sets up this process only once on component load
  useEffect(() => {
    // Get database reference
    const db = getFirestore();

    // Query specific collection and order results
    const dev = query(
      collection(db, "dev-test-results"),
      orderBy("timestamp", "desc")
    );
    const staging = query(
      collection(db, "staging-test-results"),
      orderBy("timestamp", "desc")
    );

    // Re-load collection when data changes, set in state
    onSnapshot(dev, (docs) => {
      const items = [];

      docs.forEach((doc) => {
        items.push(doc.data());
      });
      setDevResults(items);
    });

    // Re-load collection when data changes, set in state
    onSnapshot(staging, (docs) => {
      const items = [];

      docs.forEach((doc) => {
        items.push(doc.data());
      });
      setStagingResults(items);
    });
  }, []);

  return (
    <div>
      <Menu devResults={devResults} stagingResults={stagingResults} />
    </div>
  );
}

export default ScheduledResults;
