import { useCallback, useRef } from "react";
import ApiListItem from "./apilistitem";

export default function ApiList(props) {
  const { apis, server, expandCallback, testCallback } = props;

  // Create arrays of useRefs
  const testRefs = useRef([]);
  const expandRefs = useRef([]);

  // useCallback so that component doesn't reload on setCallback updating
  const setTestCallback = useCallback(
    (callback) => {
      console.log(testRefs.current.length);
      if (testRefs.current.length < apis.length)
        testRefs.current.push(callback);
    },
    [apis]
  );

  const setExpandCallback = useCallback((callback) => {
    expandRefs.current.push(callback);
  }, []);

  // Called when user presses expand button from index.jsx
  expandCallback((expanded) => {
    // Calls all registered expansion functions from apilistitem.jsx
    console.log("before expandrefs", expandRefs.current.length);

    expandRefs.current.forEach((expand) => {
      expand(expanded);
    });
  });

  // Called when user presses test all button from index.jsx
  testCallback((setResults) => {
    // Calls all registered test functions from apilistitem.jsx
    console.log("before testrefs", testRefs.current.length);
    testRefs.current.forEach(async (test) => {
      const result = await test();
      setResults((prevResults) => [...prevResults, result]);
    });
    // console.log("after testrefs", testRefs.current.length);
    // testRefs.current = [];
    // console.log("after testrefs reset", testRefs.current.length);
  });

  return (
    <div>
      {apis.map((api, i) => {
        return (
          <ApiListItem
            key={i}
            api={api}
            expandCallBack={setExpandCallback}
            testCallBack={setTestCallback}
            server={server}
          />
        );
      })}
    </div>
  );
}
